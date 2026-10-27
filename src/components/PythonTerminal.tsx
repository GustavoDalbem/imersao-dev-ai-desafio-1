import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal as TerminalIcon,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  Clock,
  Trash2,
  Copy,
  Check,
  Code,
  HelpCircle,
  FileText
} from 'lucide-react';
import { TerminalEntry, PythonVariable } from '../types';
import { pythonRunner } from '../services/pythonRunner';
import { CALCULATION_PRESETS } from '../data/presets';

interface PythonTerminalProps {
  initialCode?: string;
  onCodeExecuted?: (code: string, result: string) => void;
}

export const PythonTerminal: React.FC<PythonTerminalProps> = ({
  initialCode,
  onCodeExecuted
}) => {
  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      id: 'init-1',
      input: '# Python 3.12 Interactive REPL - Digite expressões matemáticas ou código',
      output: 'Dica: Tente "2 ** 10", "math.sqrt(100)" ou "preco = 150; preco * 0.9"',
      timestamp: new Date()
    }
  ]);
  const [currentInput, setCurrentInput] = useState<string>(initialCode || '');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [variables, setVariables] = useState<PythonVariable[]>([]);
  const [isMultiLineMode, setIsMultiLineMode] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync initialCode if passed from outside
  useEffect(() => {
    if (initialCode) {
      setCurrentInput(initialCode);
      if (initialCode.includes('\n')) {
        setIsMultiLineMode(true);
      }
    }
  }, [initialCode]);

  // Scroll to bottom on new output
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [entries]);

  // Refresh variables
  const updateVariablesList = async () => {
    const vars = await pythonRunner.getDefinedVariables();
    setVariables(vars);
  };

  useEffect(() => {
    updateVariablesList();
  }, []);

  const handleRunCode = async (codeToRun?: string) => {
    const code = (codeToRun !== undefined ? codeToRun : currentInput).trim();
    if (!code) return;

    setIsRunning(true);
    setInputHistory(prev => [code, ...prev.filter(c => c !== code).slice(0, 49)]);
    setHistoryIndex(-1);

    try {
      const execResult = await pythonRunner.execute(code);

      const newEntry: TerminalEntry = {
        id: Date.now().toString(),
        input: code,
        output: execResult.result,
        stdout: execResult.stdout,
        error: execResult.error,
        durationMs: execResult.durationMs,
        timestamp: new Date()
      };

      setEntries(prev => [...prev, newEntry]);
      if (codeToRun === undefined) {
        setCurrentInput('');
      }

      await updateVariablesList();

      if (onCodeExecuted && (execResult.result || execResult.stdout)) {
        onCodeExecuted(code, execResult.result || execResult.stdout || '');
      }
    } catch (err: any) {
      setEntries(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          input: code,
          error: err.message || 'Erro de execução Python',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsRunning(false);
      setTimeout(() => {
        if (!isMultiLineMode) {
          inputRef.current?.focus();
        }
      }, 50);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRunCode();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (inputHistory.length > 0) {
        const nextIdx = Math.min(historyIndex + 1, inputHistory.length - 1);
        setHistoryIndex(nextIdx);
        setCurrentInput(inputHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setCurrentInput(inputHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  const handleClear = () => {
    setEntries([]);
  };

  const handleResetVariables = () => {
    pythonRunner.clearVariables();
    updateVariablesList();
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Terminal Screen (Col 8) */}
        <div className="lg:col-span-8 flex flex-col h-[700px] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Terminal Window Header */}
          <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-medium">
                <TerminalIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>python_repl.py — CPython 3.12</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMultiLineMode(!isMultiLineMode)}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                  isMultiLineMode
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                }`}
              >
                {isMultiLineMode ? 'Modo Script: Multilinha' : 'Modo Linha Única'}
              </button>

              <button
                onClick={handleClear}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                title="Limpar tela do terminal"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal Output Area */}
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs sm:text-sm space-y-3">
            {entries.map(entry => (
              <div key={entry.id} className="space-y-1.5 group">
                {/* Input Line */}
                <div className="flex items-start gap-2 text-slate-300">
                  <span className="text-amber-400 select-none font-bold">&gt;&gt;&gt;</span>
                  <div className="flex-1 whitespace-pre-wrap break-all text-sky-300">
                    {entry.input}
                  </div>
                  {entry.durationMs !== undefined && (
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Clock className="w-3 h-3" />
                      {entry.durationMs}ms
                    </span>
                  )}
                  <button
                    onClick={() => copyToClipboard(entry.input, `in-${entry.id}`)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-slate-300 p-0.5"
                    title="Copiar comando"
                  >
                    {copiedId === `in-${entry.id}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Captured stdout if any */}
                {entry.stdout && (
                  <div className="pl-6 text-slate-200 whitespace-pre-wrap bg-slate-900/50 p-2 rounded border border-slate-800/80">
                    {entry.stdout}
                  </div>
                )}

                {/* Return Output */}
                {entry.output && (
                  <div className="pl-6 text-emerald-400 font-semibold whitespace-pre-wrap break-all">
                    {entry.output}
                  </div>
                )}

                {/* Error */}
                {entry.error && (
                  <div className="pl-6 text-rose-400 font-medium whitespace-pre-wrap bg-rose-950/20 border border-rose-900/40 p-2 rounded">
                    {entry.error}
                  </div>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Interactive Input Form */}
          <div className="p-3 bg-slate-900/95 border-t border-slate-800">
            {isMultiLineMode ? (
              <div className="space-y-2">
                <textarea
                  ref={textareaRef}
                  value={currentInput}
                  onChange={e => setCurrentInput(e.target.value)}
                  placeholder="Escreva seu código Python aqui (funções, loops, importações)..."
                  rows={4}
                  className="w-full bg-slate-950 text-slate-100 font-mono text-sm p-3 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-400 resize-none"
                />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Ctrl + Enter para executar
                  </span>
                  <button
                    onClick={() => handleRunCode()}
                    disabled={isRunning || !currentInput.trim()}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-semibold font-mono text-xs rounded-lg transition-all disabled:opacity-50"
                  >
                    {isRunning ? (
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current" />
                    )}
                    <span>Executar Código</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-mono font-bold select-none">&gt;&gt;&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={e => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ex: 50 * (1 + 0.15)**3 ou math.sqrt(256) ou a = 42"
                  className="flex-1 bg-transparent text-slate-100 font-mono text-sm focus:outline-none placeholder-slate-600"
                  autoFocus
                />
                <button
                  onClick={() => handleRunCode()}
                  disabled={isRunning || !currentInput.trim()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono font-bold text-xs rounded-lg transition-all disabled:opacity-40"
                >
                  {isRunning ? (
                    <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Play className="w-3 h-3 fill-current" />
                  )}
                  <span>Run</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Presets and Variables (Col 4) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Active Python Variables Inspector */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-slate-200">
                  Variáveis em Memória ({variables.length})
                </h3>
              </div>
              {variables.length > 0 && (
                <button
                  onClick={handleResetVariables}
                  className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
                  title="Limpar variáveis da sessão"
                >
                  Zerar
                </button>
              )}
            </div>

            {variables.length === 0 ? (
              <div className="py-4 text-center text-slate-500 text-xs font-mono">
                Nenhuma variável criada. Tente atribuir: <br />
                <code className="text-amber-400">preco = 99.90</code>
              </div>
            ) : (
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {variables.map(v => (
                  <div
                    key={v.name}
                    onClick={() => setCurrentInput(v.name)}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-amber-400 font-semibold">{v.name}</span>
                      <span className="text-slate-600">:</span>
                      <span className="text-slate-300 truncate max-w-[140px]">{v.value}</span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-sky-400">
                      {v.type}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Presets / Formulas to Test */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-3 text-sky-400">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-slate-200">Cálculos Prontos (Presets)</h3>
            </div>

            <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
              {CALCULATION_PRESETS.map(preset => (
                <div
                  key={preset.id}
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-sky-500/50 transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-200">{preset.title}</span>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {preset.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2 leading-tight">
                    {preset.description}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex gap-1">
                      {preset.tags.map(t => (
                        <span
                          key={t}
                          className="text-[9px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        setCurrentInput(preset.code);
                        if (preset.code.includes('\n')) setIsMultiLineMode(true);
                      }}
                      className="text-xs font-mono font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      Carregar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
