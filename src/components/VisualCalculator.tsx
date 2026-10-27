import React, { useState, useEffect, useRef } from 'react';
import {
  Copy,
  Check,
  Delete,
  RotateCcw,
  History,
  Terminal,
  ArrowRight,
  Code2,
  Sparkles,
  Equal,
  ChevronDown,
  ChevronUp,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CalculationItem } from '../types';
import { pythonRunner } from '../services/pythonRunner';

interface VisualCalculatorProps {
  onSendToTerminal: (code: string) => void;
  history: CalculationItem[];
  setHistory: React.Dispatch<React.SetStateAction<CalculationItem[]>>;
}

export const VisualCalculator: React.FC<VisualCalculatorProps> = ({
  onSendToTerminal,
  history,
  setHistory
}) => {
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('0');
  const [resultType, setResultType] = useState<string>('int');
  const [isError, setIsError] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [showScientific, setShowScientific] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Focus tracking for physical keyboard
  const calcContainerRef = useRef<HTMLDivElement>(null);

  // Evaluate expression
  const handleCalculate = async () => {
    if (!expression.trim()) return;

    setIsCalculating(true);
    setIsError(false);

    try {
      // Format Python code to run
      const pyCode = expression.trim();
      const res = await pythonRunner.execute(pyCode);

      if (res.error) {
        setResult(res.error);
        setIsError(true);
        setResultType('Exception');

        const newCalc: CalculationItem = {
          id: Date.now().toString(),
          expression,
          pythonCode: pyCode,
          result: res.error,
          timestamp: new Date(),
          isError: true
        };
        setHistory(prev => [newCalc, ...prev.slice(0, 49)]);
      } else {
        const outputVal = res.result || res.stdout || '0';
        setResult(outputVal);
        setIsError(false);

        // Infer type
        let detectedType = 'float';
        if (/^-?\d+$/.test(outputVal)) {
          detectedType = 'int';
        } else if (outputVal === 'True' || outputVal === 'False') {
          detectedType = 'bool';
        } else if (outputVal.startsWith('(') && outputVal.endsWith(')')) {
          detectedType = 'tuple';
        } else if (outputVal.startsWith('[') && outputVal.endsWith(']')) {
          detectedType = 'list';
        }
        setResultType(detectedType);

        const newCalc: CalculationItem = {
          id: Date.now().toString(),
          expression,
          pythonCode: pyCode,
          result: outputVal,
          timestamp: new Date()
        };
        setHistory(prev => [newCalc, ...prev.slice(0, 49)]);
      }
    } catch (err: any) {
      setResult(err.message || 'Erro de execução');
      setIsError(true);
      setResultType('Error');
    } finally {
      setIsCalculating(false);
    }
  };

  const handleClear = () => {
    setExpression('');
    setResult('0');
    setIsError(false);
    setResultType('int');
  };

  const handleBackspace = () => {
    setExpression(prev => prev.slice(0, -1));
  };

  const handleAppend = (val: string) => {
    setIsError(false);
    setExpression(prev => prev + val);
  };

  const handleInvertSign = () => {
    if (!expression) return;
    if (expression.startsWith('-(') && expression.endsWith(')')) {
      setExpression(expression.slice(2, -1));
    } else {
      setExpression(`-(${expression})`);
    }
  };

  const copyToClipboard = (text: string, isCode = false) => {
    navigator.clipboard.writeText(text);
    if (isCode) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only process when not typing in an input/textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        handleCalculate();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        handleClear();
      } else if ('0123456789+-*/.()%'.includes(e.key)) {
        e.preventDefault();
        handleAppend(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expression]);

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Calculator Body */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <div
            ref={calcContainerRef}
            className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-sky-950/20 backdrop-blur-xl relative overflow-hidden"
          >
            {/* Top Bar inside Calculator */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-medium text-slate-400">
                  CPython Interativo
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowScientific(!showScientific)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors border ${
                    showScientific
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-700'
                  }`}
                  title="Ativar funções científicas: math.sqrt, sin, cos, **, //, %, etc."
                >
                  {showScientific ? 'Modo Científico: Ligado' : 'Científica / Python'}
                </button>

                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className={`p-1.5 rounded-lg text-slate-400 hover:text-slate-200 border transition-colors ${
                    showHistory ? 'bg-sky-500/20 border-sky-500/40 text-sky-300' : 'bg-slate-800 border-slate-700'
                  }`}
                  title="Ver histórico de cálculos"
                >
                  <History className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* High-tech OLED Display Screen */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 sm:p-5 mb-5 shadow-inner flex flex-col justify-between min-h-[140px] relative group">
              {/* Python Code Live Line */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-1 overflow-x-auto whitespace-nowrap pb-1">
                <div className="flex items-center gap-1.5 text-sky-400/90 font-medium">
                  <span className="text-amber-400 select-none">&gt;&gt;&gt;</span>
                  <span>{expression || '# digite sua expressão matemática'}</span>
                </div>
                {expression && (
                  <button
                    onClick={() => copyToClipboard(expression, true)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-sky-300"
                    title="Copiar código Python"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code2 className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>

              {/* Expression input display */}
              <div className="text-right text-base sm:text-lg text-slate-300 font-mono overflow-x-auto whitespace-nowrap py-1">
                {expression || '0'}
              </div>

              {/* Result display */}
              <div className="flex items-end justify-between pt-2 border-t border-slate-900/60 mt-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                      isError
                        ? 'bg-rose-950 text-rose-400 border border-rose-800/60'
                        : 'bg-slate-800 text-sky-400 border border-slate-700'
                    }`}
                  >
                    {resultType}
                  </span>
                  {!isError && result !== '0' && (
                    <button
                      onClick={() => onSendToTerminal(`resultado = ${result}`)}
                      className="text-[11px] text-slate-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                      title="Enviar variável para o console REPL"
                    >
                      <Terminal className="w-3 h-3 text-amber-400" />
                      <span className="hidden sm:inline">Salvar no REPL</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 max-w-[70%] justify-end">
                  <span
                    className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight truncate ${
                      isError ? 'text-rose-400 text-base sm:text-lg font-normal' : 'text-emerald-400'
                    }`}
                  >
                    {result}
                  </span>
                  <button
                    onClick={() => copyToClipboard(result)}
                    className="p-1.5 text-slate-400 hover:text-emerald-300 rounded hover:bg-slate-800/80 transition-colors"
                    title="Copiar resultado"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Scientific and Python Operators Panel (Foldable) */}
            <AnimatePresence>
              {showScientific && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden mb-4"
                >
                  <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400/90 font-semibold mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Operadores & Módulo math do Python
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        onClick={() => handleAppend('**')}
                        className="py-2 px-1 text-xs font-mono font-medium rounded-lg bg-slate-800/80 hover:bg-amber-500/20 hover:text-amber-300 border border-slate-700/80 text-slate-200 transition-colors"
                        title="Potenciação: x ** y"
                      >
                        x ** y
                      </button>
                      <button
                        onClick={() => handleAppend('//')}
                        className="py-2 px-1 text-xs font-mono font-medium rounded-lg bg-slate-800/80 hover:bg-amber-500/20 hover:text-amber-300 border border-slate-700/80 text-slate-200 transition-colors"
                        title="Divisão inteira: descarta casas decimais (ex: 7 // 2 = 3)"
                      >
                        x // y
                      </button>
                      <button
                        onClick={() => handleAppend('math.sqrt(')}
                        className="py-2 px-1 text-xs font-mono font-medium rounded-lg bg-slate-800/80 hover:bg-sky-500/20 hover:text-sky-300 border border-slate-700/80 text-slate-200 transition-colors"
                        title="Raiz Quadrada math.sqrt(x)"
                      >
                        √ sqrt()
                      </button>
                      <button
                        onClick={() => handleAppend('math.pi')}
                        className="py-2 px-1 text-xs font-mono font-medium rounded-lg bg-slate-800/80 hover:bg-sky-500/20 hover:text-sky-300 border border-slate-700/80 text-slate-200 transition-colors"
                        title="Constante Pi: 3.14159265..."
                      >
                        π pi
                      </button>

                      <button
                        onClick={() => handleAppend('math.sin(')}
                        className="py-2 px-1 text-xs font-mono font-medium rounded-lg bg-slate-800/80 hover:bg-sky-500/20 hover:text-sky-300 border border-slate-700/80 text-slate-200 transition-colors"
                        title="Seno em radianos: math.sin(x)"
                      >
                        sin()
                      </button>
                      <button
                        onClick={() => handleAppend('math.cos(')}
                        className="py-2 px-1 text-xs font-mono font-medium rounded-lg bg-slate-800/80 hover:bg-sky-500/20 hover:text-sky-300 border border-slate-700/80 text-slate-200 transition-colors"
                        title="Cosseno em radianos: math.cos(x)"
                      >
                        cos()
                      </button>
                      <button
                        onClick={() => handleAppend('math.tan(')}
                        className="py-2 px-1 text-xs font-mono font-medium rounded-lg bg-slate-800/80 hover:bg-sky-500/20 hover:text-sky-300 border border-slate-700/80 text-slate-200 transition-colors"
                        title="Tangente: math.tan(x)"
                      >
                        tan()
                      </button>
                      <button
                        onClick={() => handleAppend('math.e')}
                        className="py-2 px-1 text-xs font-mono font-medium rounded-lg bg-slate-800/80 hover:bg-sky-500/20 hover:text-sky-300 border border-slate-700/80 text-slate-200 transition-colors"
                        title="Número de Euler: 2.71828..."
                      >
                        e
                      </button>

                      <button
                        onClick={() => handleAppend('math.log(')}
                        className="py-2 px-1 text-xs font-mono font-medium rounded-lg bg-slate-800/80 hover:bg-sky-500/20 hover:text-sky-300 border border-slate-700/80 text-slate-200 transition-colors"
                        title="Logaritmo Natural: math.log(x)"
                      >
                        ln()
                      </button>
                      <button
                        onClick={() => handleAppend('math.log10(')}
                        className="py-2 px-1 text-xs font-mono font-medium rounded-lg bg-slate-800/80 hover:bg-sky-500/20 hover:text-sky-300 border border-slate-700/80 text-slate-200 transition-colors"
                        title="Logaritmo base 10: math.log10(x)"
                      >
                        log10()
                      </button>
                      <button
                        onClick={() => handleAppend('math.factorial(')}
                        className="py-2 px-1 text-xs font-mono font-medium rounded-lg bg-slate-800/80 hover:bg-sky-500/20 hover:text-sky-300 border border-slate-700/80 text-slate-200 transition-colors"
                        title="Fatorial: math.factorial(n)"
                      >
                        n!
                      </button>
                      <button
                        onClick={() => handleAppend('round(')}
                        className="py-2 px-1 text-xs font-mono font-medium rounded-lg bg-slate-800/80 hover:bg-amber-500/20 hover:text-amber-300 border border-slate-700/80 text-slate-200 transition-colors"
                        title="Arredondar: round(x, casas)"
                      >
                        round()
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Standard Keypad Grid */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {/* Row 1 */}
              <button
                onClick={handleClear}
                className="py-3.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-mono font-bold text-sm sm:text-base active:scale-95 transition-all"
                title="Limpar tudo (Esc)"
              >
                C
              </button>
              <button
                onClick={handleBackspace}
                className="py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-amber-300 border border-slate-700 font-mono font-semibold text-sm active:scale-95 transition-all flex items-center justify-center"
                title="Apagar caractere (Backspace)"
              >
                <Delete className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleAppend('%')}
                className="py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-sky-400 border border-slate-700 font-mono font-bold text-sm sm:text-base active:scale-95 transition-all"
                title="Módulo / Resto da divisão (operador %)"
              >
                %
              </button>
              <button
                onClick={() => handleAppend('/')}
                className="py-3.5 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/40 font-mono font-bold text-lg active:scale-95 transition-all"
                title="Divisão real (operador /)"
              >
                ÷
              </button>

              {/* Row 2 */}
              <button
                onClick={() => handleAppend('7')}
                className="py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 border border-slate-700/70 font-mono font-bold text-lg active:scale-95 transition-all shadow-sm"
              >
                7
              </button>
              <button
                onClick={() => handleAppend('8')}
                className="py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 border border-slate-700/70 font-mono font-bold text-lg active:scale-95 transition-all shadow-sm"
              >
                8
              </button>
              <button
                onClick={() => handleAppend('9')}
                className="py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 border border-slate-700/70 font-mono font-bold text-lg active:scale-95 transition-all shadow-sm"
              >
                9
              </button>
              <button
                onClick={() => handleAppend('*')}
                className="py-3.5 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/40 font-mono font-bold text-lg active:scale-95 transition-all"
                title="Multiplicação (operador *)"
              >
                ×
              </button>

              {/* Row 3 */}
              <button
                onClick={() => handleAppend('4')}
                className="py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 border border-slate-700/70 font-mono font-bold text-lg active:scale-95 transition-all shadow-sm"
              >
                4
              </button>
              <button
                onClick={() => handleAppend('5')}
                className="py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 border border-slate-700/70 font-mono font-bold text-lg active:scale-95 transition-all shadow-sm"
              >
                5
              </button>
              <button
                onClick={() => handleAppend('6')}
                className="py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 border border-slate-700/70 font-mono font-bold text-lg active:scale-95 transition-all shadow-sm"
              >
                6
              </button>
              <button
                onClick={() => handleAppend('-')}
                className="py-3.5 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/40 font-mono font-bold text-lg active:scale-95 transition-all"
                title="Subtração (operador -)"
              >
                −
              </button>

              {/* Row 4 */}
              <button
                onClick={() => handleAppend('1')}
                className="py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 border border-slate-700/70 font-mono font-bold text-lg active:scale-95 transition-all shadow-sm"
              >
                1
              </button>
              <button
                onClick={() => handleAppend('2')}
                className="py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 border border-slate-700/70 font-mono font-bold text-lg active:scale-95 transition-all shadow-sm"
              >
                2
              </button>
              <button
                onClick={() => handleAppend('3')}
                className="py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 border border-slate-700/70 font-mono font-bold text-lg active:scale-95 transition-all shadow-sm"
              >
                3
              </button>
              <button
                onClick={() => handleAppend('+')}
                className="py-3.5 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/40 font-mono font-bold text-lg active:scale-95 transition-all"
                title="Adição (operador +)"
              >
                +
              </button>

              {/* Row 5 */}
              <button
                onClick={handleInvertSign}
                className="py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-mono font-semibold text-sm active:scale-95 transition-all"
                title="Inverter sinal (±)"
              >
                ±
              </button>
              <button
                onClick={() => handleAppend('0')}
                className="py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 border border-slate-700/70 font-mono font-bold text-lg active:scale-95 transition-all shadow-sm"
              >
                0
              </button>
              <button
                onClick={() => handleAppend('.')}
                className="py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono font-bold text-lg active:scale-95 transition-all"
                title="Ponto decimal (.)"
              >
                .
              </button>
              <button
                onClick={handleCalculate}
                disabled={isCalculating}
                className="py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-mono font-extrabold text-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center"
                title="Executar código em Python (Enter)"
              >
                {isCalculating ? (
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Equal className="w-6 h-6 stroke-[3]" />
                )}
              </button>
            </div>

            {/* Quick helper footer */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono">
                  Enter
                </kbd>{' '}
                executa
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono">
                  **
                </kbd>{' '}
                para potência
              </span>
              <button
                onClick={() => onSendToTerminal(expression || result)}
                className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 transition-colors"
              >
                Abrir no Terminal <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* History & Python Shortcuts Side Panel */}
        <div className="lg:col-span-4 space-y-5">
          {/* Recent Calculations Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-semibold text-slate-200">Histórico de Cálculos</h3>
              </div>
              {history.length > 0 && (
                <button
                  onClick={() => setHistory([])}
                  className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
                >
                  Limpar
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs">
                Nenhum cálculo efetuado ainda. Use o teclado para calcular!
              </div>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {history.map(item => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setExpression(item.expression);
                      setResult(item.result);
                    }}
                    className="p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/70 cursor-pointer transition-all group"
                  >
                    <div className="text-xs font-mono text-slate-400 truncate group-hover:text-sky-300">
                      {item.expression}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span
                        className={`text-sm font-mono font-bold ${
                          item.isError ? 'text-rose-400 text-xs' : 'text-emerald-400'
                        }`}
                      >
                        = {item.result}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Python Math Info Box */}
          <div className="bg-gradient-to-br from-sky-950/40 via-slate-900 to-amber-950/20 border border-sky-900/40 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Por que Python é incrível para contas?</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>
                  <strong>Precisão Arbitrária:</strong> Inteiros em Python não estouram com 32/64 bits. Você pode calcular <code>2 ** 1000</code> sem overflow!
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>
                  <strong>Divisão Clara:</strong> <code>/</code> retorna float exato e <code>//</code> descarta casas decimais.
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>
                  <strong>Módulo math nativo:</strong> Mais de 60 funções matemáticas sem precisar instalar nada.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
