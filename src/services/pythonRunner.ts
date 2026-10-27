/**
 * Python execution service using Pyodide (WebAssembly Python 3.12)
 * with a high-fidelity local fallback for instant offline/initial responsiveness.
 */

import { PythonVariable } from '../types';

declare global {
  interface Window {
    loadPyodide?: (config: { indexURL?: string; stdout?: (text: string) => void; stderr?: (text: string) => void }) => Promise<any>;
    pyodideInstance?: any;
  }
}

export type PythonEngineStatus = 'uninitialized' | 'loading' | 'ready' | 'fallback';

class PythonRunner {
  private pyodide: any = null;
  private status: PythonEngineStatus = 'uninitialized';
  private statusListeners: ((status: PythonEngineStatus) => void)[] = [];
  private stdoutBuffer: string[] = [];
  private fallbackVars: Record<string, any> = {};

  constructor() {
    this.init();
  }

  public getStatus(): PythonEngineStatus {
    return this.status;
  }

  public onStatusChange(callback: (status: PythonEngineStatus) => void): () => void {
    this.statusListeners.push(callback);
    callback(this.status);
    return () => {
      this.statusListeners = this.statusListeners.filter(cb => cb !== callback);
    };
  }

  private setStatus(newStatus: PythonEngineStatus) {
    this.status = newStatus;
    this.statusListeners.forEach(cb => cb(newStatus));
  }

  private async init() {
    if (typeof window === 'undefined') return;
    this.setStatus('loading');

    // Load Pyodide script dynamically if not present
    try {
      if (!window.loadPyodide) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Falha ao carregar CDN Pyodide'));
          document.head.appendChild(script);
        });
      }

      if (window.loadPyodide) {
        this.pyodide = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
          stdout: (text: string) => {
            this.stdoutBuffer.push(text);
          },
          stderr: (text: string) => {
            this.stdoutBuffer.push(`[stderr] ${text}`);
          }
        });

        // Initialize standard packages and environment
        await this.pyodide.runPythonAsync(`
import math
import statistics
import random
import sys

# Setup stdout capture helper
class OutputCatch:
    def __init__(self):
        self.data = []
    def write(self, s):
        if s:
            self.data.append(str(s))
    def flush(self):
        pass
    def get_output(self):
        res = "".join(self.data)
        self.data.clear()
        return res
`);

        this.setStatus('ready');
      } else {
        this.setStatus('fallback');
      }
    } catch (err) {
      console.warn('Pyodide CDN indisponível ou bloqueado, utilizando motor Python nativo simulado:', err);
      this.setStatus('fallback');
    }
  }

  /**
   * Executes Python code and returns result and standard output
   */
  public async execute(code: string): Promise<{
    result?: string;
    stdout?: string;
    error?: string;
    durationMs: number;
    engine: 'pyodide' | 'fallback';
  }> {
    const startTime = performance.now();
    this.stdoutBuffer = [];

    const trimmed = code.trim();
    if (!trimmed) {
      return { result: '', durationMs: 0, engine: this.pyodide ? 'pyodide' : 'fallback' };
    }

    // If Pyodide is ready, run genuine CPython
    if (this.pyodide && this.status === 'ready') {
      try {
        // Prepare execution with stdout capture
        const wrappedCode = `
__calc_runner_stdout__ = []
import sys

class __StdoutInterceptor:
    def write(self, s):
        if s:
            __calc_runner_stdout__.append(s)
    def flush(self):
        pass

__old_stdout__ = sys.stdout
sys.stdout = __StdoutInterceptor()

try:
    # Try eval first if it's a single expression
    try:
        __calc_runner_result__ = eval("""${trimmed.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}""")
    except SyntaxError:
        # If it's statements/code block
        __calc_runner_exec_globals__ = {}
        exec("""${trimmed.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}""")
        __calc_runner_result__ = None
finally:
    sys.stdout = __old_stdout__

(__calc_runner_result__, "".join(__calc_runner_stdout__))
`;

        const resTuple = await this.pyodide.runPythonAsync(wrappedCode);
        const [rawResult, capturedStdout] = resTuple.toJs();
        
        let formattedResult = '';
        if (rawResult !== undefined && rawResult !== null) {
          formattedResult = String(rawResult);
        }

        const combinedStdout = [...this.stdoutBuffer, capturedStdout].filter(Boolean).join('\n').trim();

        return {
          result: formattedResult || (combinedStdout ? undefined : 'Concluído'),
          stdout: combinedStdout || undefined,
          durationMs: Math.round(performance.now() - startTime),
          engine: 'pyodide'
        };
      } catch (err: any) {
        return {
          error: this.formatPythonError(err.message || String(err)),
          stdout: this.stdoutBuffer.join('\n').trim() || undefined,
          durationMs: Math.round(performance.now() - startTime),
          engine: 'pyodide'
        };
      }
    }

    // Fallback engine
    return this.executeFallback(trimmed, startTime);
  }

  private formatPythonError(errStr: string): string {
    // Clean Python traceback to show the relevant exception message
    if (errStr.includes('Traceback (most recent call last)')) {
      const lines = errStr.trim().split('\n');
      return lines[lines.length - 1];
    }
    return errStr;
  }

  /**
   * Safe JavaScript-based Python arithmetic evaluator fallback
   */
  private executeFallback(code: string, startTime: number): {
    result?: string;
    stdout?: string;
    error?: string;
    durationMs: number;
    engine: 'fallback';
  } {
    try {
      // Check variable assignment: a = 5
      const assignMatch = code.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
      if (assignMatch) {
        const varName = assignMatch[1];
        const expr = assignMatch[2];
        const val = this.evalFallbackExpression(expr);
        this.fallbackVars[varName] = val;
        return {
          result: `${varName} = ${val}`,
          durationMs: Math.round(performance.now() - startTime),
          engine: 'fallback'
        };
      }

      // Check print(...)
      const printMatch = code.match(/^print\((.*)\)$/s);
      if (printMatch) {
        const inner = printMatch[1];
        const evaluated = this.evalFallbackExpression(inner);
        return {
          stdout: String(evaluated),
          durationMs: Math.round(performance.now() - startTime),
          engine: 'fallback'
        };
      }

      const val = this.evalFallbackExpression(code);
      return {
        result: String(val),
        durationMs: Math.round(performance.now() - startTime),
        engine: 'fallback'
      };
    } catch (err: any) {
      return {
        error: err.message || 'Erro de sintaxe Python',
        durationMs: Math.round(performance.now() - startTime),
        engine: 'fallback'
      };
    }
  }

  private evalFallbackExpression(expr: string): any {
    // Replace variable names from memory
    let transformed = expr;
    for (const [key, val] of Object.entries(this.fallbackVars)) {
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      transformed = transformed.replace(regex, JSON.stringify(val));
    }

    // Python math functions and constants mapping
    const mathDict: Record<string, string> = {
      'math.pi': 'Math.PI',
      'math.e': 'Math.E',
      'math.tau': '(Math.PI * 2)',
      'math.sqrt': 'Math.sqrt',
      'math.sin': 'Math.sin',
      'math.cos': 'Math.cos',
      'math.tan': 'Math.tan',
      'math.asin': 'Math.asin',
      'math.acos': 'Math.acos',
      'math.atan': 'Math.atan',
      'math.log10': 'Math.log10',
      'math.log2': 'Math.log2',
      'math.log': 'Math.log',
      'math.exp': 'Math.exp',
      'math.floor': 'Math.floor',
      'math.ceil': 'Math.ceil',
      'abs': 'Math.abs',
      'round': 'Math.round',
      'pow': 'Math.pow',
      'True': 'true',
      'False': 'false',
      'None': 'null'
    };

    // Replace math functions
    for (const [pyFunc, jsFunc] of Object.entries(mathDict)) {
      const regex = new RegExp(pyFunc.replace('.', '\\.'), 'g');
      transformed = transformed.replace(regex, jsFunc);
    }

    // Python factorial: math.factorial(n)
    transformed = transformed.replace(/math\.factorial\((\d+)\)/g, (_, n) => {
      let num = parseInt(n, 10);
      if (num < 0) return 'NaN';
      let r = 1;
      for (let i = 2; i <= num; i++) r *= i;
      return String(r);
    });

    // Python power operator: **
    // Handle ** by replacing a ** b with Math.pow(a, b) or JS **
    // Note: JS supports ** operator identically to Python!
    
    // Python integer division: //
    // In Python: 7 // 2 is 3, -7 // 2 is -4 (Math.floor(a / b))
    // Replace `a // b` with `Math.floor(a / b)`
    transformed = transformed.replace(/(\b\d+(?:\.\d+)?|\([^)]+\))\s*\/\/\s*(\b\d+(?:\.\d+)?|\([^)]+\))/g, 'Math.floor(($1) / ($2))');

    // Safe evaluation using Function
    // Only allow mathematical symbols, numbers, identifiers
    const sanitized = transformed.replace(/[^0-9a-zA-Z_+\-*/%()., <>=!&|]/g, '');
    
    // Check for division by zero
    if (/\/\s*0(?!\d|\.)/.test(sanitized)) {
      throw new Error('ZeroDivisionError: division by zero');
    }

    // Run evaluation
    // eslint-disable-next-line no-new-func
    const fn = new Function(`return (${sanitized});`);
    const res = fn();

    if (res === Infinity || res === -Infinity) {
      throw new Error('ZeroDivisionError: float division by zero');
    }
    if (typeof res === 'number' && isNaN(res)) {
      throw new Error('ValueError: math domain error');
    }

    return res;
  }

  public async getDefinedVariables(): Promise<PythonVariable[]> {
    if (this.pyodide && this.status === 'ready') {
      try {
        const pyCode = `
import json
__vars__ = []
__builtins_names__ = dir(__builtins__)
for k, v in list(globals().items()):
    if not k.startswith('_') and k not in ['math', 'statistics', 'random', 'sys', 'OutputCatch']:
        try:
            val_str = str(v)
            if len(val_str) > 60:
                val_str = val_str[:57] + '...'
            __vars__.append({
                "name": k,
                "value": val_str,
                "type": type(v).__name__
            })
        except Exception:
            pass
json.dumps(__vars__)
`;
        const res = await this.pyodide.runPythonAsync(pyCode);
        return JSON.parse(res);
      } catch {
        return [];
      }
    }

    return Object.entries(this.fallbackVars).map(([name, val]) => ({
      name,
      value: String(val),
      type: typeof val === 'number' ? (Number.isInteger(val) ? 'int' : 'float') : typeof val
    }));
  }

  public clearVariables() {
    this.fallbackVars = {};
    if (this.pyodide && this.status === 'ready') {
      this.pyodide.runPython(`
for k in list(globals().keys()):
    if not k.startswith('_') and k not in ['math', 'statistics', 'random', 'sys', 'OutputCatch']:
        del globals()[k]
`);
    }
  }
}

export const pythonRunner = new PythonRunner();
