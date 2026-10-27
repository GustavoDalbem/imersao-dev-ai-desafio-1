import React, { useState } from 'react';
import { BookOpen, Sparkles, Check, Copy, ArrowRight, Lightbulb } from 'lucide-react';
import { OPERATOR_GUIDE } from '../data/operatorGuide';

interface PythonCheatSheetProps {
  onTestOperator: (example: string) => void;
}

export const PythonCheatSheet: React.FC<PythonCheatSheetProps> = ({ onTestOperator }) => {
  const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);

  const handleCopy = (example: string, sym: string) => {
    navigator.clipboard.writeText(example);
    setCopiedSymbol(sym);
    setTimeout(() => setCopiedSymbol(null), 1500);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-purple-950/60 text-purple-300 border border-purple-800/60 mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          Guia de Referência & Sintaxe
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Operadores Matemáticos em Python
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Entenda a diferença crucial entre a divisão <code className="text-amber-400 font-mono">/</code> e{' '}
          <code className="text-amber-400 font-mono">//</code>, por que a potência é{' '}
          <code className="text-amber-400 font-mono">**</code> e não <code className="text-amber-400 font-mono">^</code>, e os recursos nativos.
        </p>
      </div>

      {/* Operator Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {OPERATOR_GUIDE.map(item => (
          <div
            key={item.symbol}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-lg bg-sky-950 text-sky-300 font-mono font-bold text-sm border border-sky-800/60">
                    {item.symbol}
                  </span>
                  <span className="font-semibold text-sm text-slate-200">{item.name}</span>
                </div>
                <span className="text-[11px] font-mono text-purple-400 bg-purple-950/50 px-2 py-0.5 rounded border border-purple-800/40">
                  {item.typeResult}
                </span>
              </div>

              {/* Example block */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-xs mb-3 flex items-center justify-between">
                <div>
                  <span className="text-slate-500">&gt;&gt;&gt; </span>
                  <span className="text-amber-300">{item.example}</span>
                  <span className="text-slate-400">  # Retorna: </span>
                  <span className="text-emerald-400 font-bold">{item.result}</span>
                </div>
                <button
                  onClick={() => handleCopy(item.example, item.symbol)}
                  className="text-slate-500 hover:text-slate-300 p-1"
                  title="Copiar exemplo"
                >
                  {copiedSymbol === item.symbol ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">{item.note}</p>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">Sintaxe: {item.syntax}</span>
              <button
                onClick={() => onTestOperator(item.example)}
                className="text-xs font-mono font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
              >
                Testar agora <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Crucial Tips Box */}
      <div className="bg-gradient-to-r from-amber-950/30 via-slate-900 to-sky-950/30 border border-amber-900/40 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-base mb-4">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <span>Curiosidades e Armadilhas Comuns no Python para quem vem de outras linguagens:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300 leading-relaxed">
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
            <h4 className="font-semibold text-white mb-1.5 flex items-center gap-1.5">
              <span className="text-rose-400 font-bold">1.</span> O operador ^ NÃO é potência!
            </h4>
            <p className="text-slate-400">
              Em C, Java ou Excel, muitas pessoas usam <code>2 ^ 3</code> esperando <code>8</code>.
              No Python, <code>^</code> é o operador bit a bit <strong>XOR</strong> (<code>2 ^ 3 == 1</code>).
              Para potência, use sempre <code className="text-amber-400 font-mono">2 ** 3</code>.
            </p>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
            <h4 className="font-semibold text-white mb-1.5 flex items-center gap-1.5">
              <span className="text-sky-400 font-bold">2.</span> A divisão / sempre gera float
            </h4>
            <p className="text-slate-400">
              No Python 2, <code>5 / 2</code> dava <code>2</code>. No Python 3, <code>5 / 2</code> dá exatamente{' '}
              <code className="text-emerald-400 font-mono">2.5</code>. Se quiser descartar o decimal, use a divisão inteira{' '}
              <code className="text-amber-400 font-mono">5 // 2 == 2</code>.
            </p>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
            <h4 className="font-semibold text-white mb-1.5 flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">3.</span> Números com precisão infinita
            </h4>
            <p className="text-slate-400">
              Python gerencia automaticamente o tamanho dos inteiros em memória. Você pode calcular{' '}
              <code className="text-amber-400 font-mono">10 ** 50</code> sem se preocupar com estouro de bits (integer overflow).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
