import React, { useState } from 'react';
import { FileText, Copy, Check, Download, ExternalLink, Sparkles, Terminal, Code2 } from 'lucide-react';

interface ReadmeViewerProps {
  onGoToTab: (tab: 'calculator' | 'terminal' | 'code' | 'guide') => void;
}

export const ReadmeViewer: React.FC<ReadmeViewerProps> = ({ onGoToTab }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyReadme = async () => {
    try {
      const response = await fetch('/README.md');
      const text = await response.text();
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadReadme = async () => {
    try {
      const response = await fetch('/README.md');
      const text = await response.text();
      const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'README.md';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-950/80 text-sky-300 border border-sky-800/60 mb-2">
            <FileText className="w-3.5 h-3.5" />
            Documentação do Projeto
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            README.md
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Documentação técnica, guia de instalação e visão geral da aplicação.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyReadme}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar README</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadReadme}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium shadow-md shadow-sky-600/20 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Baixar README.md</span>
          </button>
        </div>
      </div>

      {/* Rendered Preview Card */}
      <article className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 leading-relaxed text-slate-300 text-sm sm:text-base">
        {/* Banner with Badges */}
        <div className="text-center space-y-4">
          <div className="inline-block p-2 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              🐍 Python<span className="text-amber-400">Calc</span>
            </span>
          </div>
          <p className="text-base text-slate-300 max-w-xl mx-auto font-medium">
            Calculadora Interativa com Motor Python 3.12 & Gerador de Scripts Prontos
          </p>

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-[#3776AB]/20 text-[#387EB8] border border-[#3776AB]/40">
              Python 3.12 WASM
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-[#61DAFB]/20 text-[#61DAFB] border border-[#61DAFB]/40">
              React 19
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-[#646CFF]/20 text-[#8e94ff] border border-[#646CFF]/40">
              Vite 8.3
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-[#38B2AC]/20 text-[#38B2AC] border border-[#38B2AC]/40">
              Tailwind CSS v4
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              Apache 2.0
            </span>
          </div>
        </div>

        {/* Embedded Preview Image */}
        <div className="relative group overflow-hidden rounded-2xl border border-slate-800 shadow-2xl bg-slate-950">
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-[11px] font-mono text-slate-300 flex items-center gap-1.5 z-10">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Preview Oficial da Interface</span>
          </div>
          <img
            src="/assets/aistudio/image_cf400586.png"
            alt="PythonCalc Preview"
            className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-300"
          />
        </div>

        {/* Section 1: Visão Geral */}
        <section className="space-y-3 pt-4 border-t border-slate-800/80">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>🌟 Visão Geral</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            O <strong>PythonCalc</strong> foi projetado para quem quer aprender, usar ou exportar calculadoras em Python. A aplicação possui um motor <strong>CPython 3.12 WebAssembly (Pyodide)</strong> incorporado, permitindo que qualquer expressão aritmética ou script execute diretamente no navegador com a mesma fidelidade de uma instalação local do Python.
          </p>
        </section>

        {/* Section 2: Funcionalidades */}
        <section className="space-y-4 pt-4 border-t border-slate-800/80">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>🚀 Principais Funcionalidades</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <h3 className="font-semibold text-sky-400 mb-1 flex items-center gap-2">
                <span>🧮 Calculadora Visual OLED</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Display digital duplo, pré-visualização ao vivo da linha Python, botões para operadores especiais (<code className="text-amber-400">**</code>, <code className="text-amber-400">//</code>, <code className="text-amber-400">%</code>), funções do módulo <code className="text-sky-300">math</code> e histórico clicável.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <h3 className="font-semibold text-amber-400 mb-1 flex items-center gap-2">
                <span>💻 Terminal Python (REPL)</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ambiente interativo completo com prompt <code className="text-amber-400">&gt;&gt;&gt;</code>, suporte a variáveis em tempo de execução, captura de prints (<code className="text-slate-300">sys.stdout</code>) e biblioteca de fórmulas prontas.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <h3 className="font-semibold text-emerald-400 mb-1 flex items-center gap-2">
                <span>📄 4 Códigos Prontos (.py)</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scripts profissionais para CLI, Desktop Gráfica (Tkinter), Orientada a Objetos (POO) e Científica/Financeira, com download imediato e instruções de execução.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <h3 className="font-semibold text-purple-400 mb-1 flex items-center gap-2">
                <span>📚 Guia de Sintaxe & Operadores</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Detalhamento dos operadores aritméticos do Python, dicas sobre a divisão <code className="text-amber-400">/</code> vs <code className="text-amber-400">//</code> e a armadilha comum do operador <code className="text-rose-400">^</code> (que é XOR e não potência).
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Scripts Inclusos */}
        <section className="space-y-3 pt-4 border-t border-slate-800/80">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>📦 Scripts Python Inclusos na Aba Códigos</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                  <th className="p-3">Script</th>
                  <th className="p-3">Tipo</th>
                  <th className="p-3">Descrição Resumida</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="p-3 text-amber-400 font-bold">calculadora_terminal.py</td>
                  <td className="p-3">CLI Interativa</td>
                  <td className="p-3">Menu formatado, loop contínuo e tratamento de ZeroDivisionError.</td>
                </tr>
                <tr>
                  <td className="p-3 text-sky-400 font-bold">calculadora_gui.py</td>
                  <td className="p-3">Tkinter Desktop</td>
                  <td className="p-3">Interface gráfica nativa elegante sem pacotes externos.</td>
                </tr>
                <tr>
                  <td className="p-3 text-emerald-400 font-bold">calculadora_poo.py</td>
                  <td className="p-3">POO + Testes</td>
                  <td className="p-3">Classes, memória (M+/MR), métodos encadeáveis e unittest.</td>
                </tr>
                <tr>
                  <td className="p-3 text-purple-400 font-bold">calculadora_cientifica.py</td>
                  <td className="p-3">Científica & Finanças</td>
                  <td className="p-3">Módulo math, statistics, Bhaskara e Juros Compostos.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Como Executar */}
        <section className="space-y-4 pt-4 border-t border-slate-800/80">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>💻 Como Executar Nativamente no Computador</span>
          </h2>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
            <p className="text-slate-400"># 1. Executar a versão desktop visual com Tkinter:</p>
            <div className="bg-slate-900 p-2.5 rounded-lg text-emerald-400">
              python calculadora_gui.py
            </div>

            <p className="text-slate-400"># 2. Executar a versão no terminal:</p>
            <div className="bg-slate-900 p-2.5 rounded-lg text-emerald-400">
              python calculadora_terminal.py
            </div>

            <p className="text-slate-400"># 3. Gerar executável independente (.exe para Windows):</p>
            <div className="bg-slate-900 p-2.5 rounded-lg text-amber-300">
              pip install pyinstaller<br />
              pyinstaller --onefile calculadora_gui.py
            </div>
          </div>
        </section>

        {/* Quick jump to tools */}
        <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-slate-400">
            Deseja testar as ferramentas agora mesmo?
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onGoToTab('calculator')}
              className="px-3.5 py-1.5 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/40 text-xs font-medium transition-colors"
            >
              Abrir Calculadora
            </button>
            <button
              onClick={() => onGoToTab('terminal')}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-medium transition-colors"
            >
              Abrir Terminal REPL
            </button>
            <button
              onClick={() => onGoToTab('code')}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-medium transition-colors"
            >
              Ver Códigos .py
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};
