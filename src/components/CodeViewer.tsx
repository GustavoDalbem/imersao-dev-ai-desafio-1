import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  Play,
  FileCode,
  Terminal,
  HelpCircle,
  FolderDown,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { PYTHON_SNIPPETS } from '../data/pythonSnippets';
import { CodeSnippet } from '../types';

interface CodeViewerProps {
  onLoadInTerminal: (code: string) => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ onLoadInTerminal }) => {
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>(PYTHON_SNIPPETS[0].id);
  const [copied, setCopied] = useState<boolean>(false);

  const selectedSnippet =
    PYTHON_SNIPPETS.find(s => s.id === selectedSnippetId) || PYTHON_SNIPPETS[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = (snippet: CodeSnippet) => {
    const blob = new Blob([snippet.code], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = snippet.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    PYTHON_SNIPPETS.forEach(snippet => {
      setTimeout(() => {
        handleDownloadFile(snippet);
      }, 150);
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider font-semibold mb-2">
              <FileCode className="w-4 h-4" />
              <span>Códigos Fonte Prontos para Uso</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Scripts de Calculadora em Python
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              4 implementações completas com código limpo, documentação detalhada e boas práticas.
              Você pode copiar, baixar os arquivos <code className="text-amber-400 font-mono">.py</code> ou testar no terminal.
            </p>
          </div>

          <button
            onClick={handleDownloadAll}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-sky-600/25 transition-all active:scale-95 shrink-0"
          >
            <FolderDown className="w-4 h-4" />
            <span>Baixar Todos os 4 Arquivos .py</span>
          </button>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap gap-2.5 mt-6 pt-6 border-t border-slate-800">
          {PYTHON_SNIPPETS.map(snippet => {
            const isSelected = snippet.id === selectedSnippetId;
            return (
              <button
                key={snippet.id}
                onClick={() => setSelectedSnippetId(snippet.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all border ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 border-amber-400 font-semibold shadow-md shadow-amber-400/20'
                    : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border-slate-700/60'
                }`}
              >
                <FileCode className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{snippet.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Code View Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Code Content Area (Col 8) */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* File Toolbar */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-amber-400 font-bold">{selectedSnippet.fileName}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">{selectedSnippet.badge}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                title="Copiar código para a área de transferência"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Código</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleDownloadFile(selectedSnippet)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium shadow transition-colors"
                title="Baixar arquivo .py para seu computador"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar .py</span>
              </button>

              <button
                onClick={() => onLoadInTerminal(selectedSnippet.code)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-medium transition-colors"
                title="Carregar este script no terminal Python para testar no navegador"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Testar no REPL</span>
              </button>
            </div>
          </div>

          {/* Syntax Highlighted Code Viewer */}
          <div className="p-4 overflow-x-auto max-h-[600px] overflow-y-auto">
            <pre className="font-mono text-xs sm:text-sm leading-relaxed text-slate-200">
              <code>{selectedSnippet.code}</code>
            </pre>
          </div>
        </div>

        {/* Details & Tutorial (Col 4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Features of this script */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Recursos deste Código
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {selectedSnippet.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap gap-1.5">
              {selectedSnippet.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700/60"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* How to execute in your machine */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-sky-400" />
              Como rodar no seu computador
            </h3>
            <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside leading-relaxed">
              {selectedSnippet.howToRun.map((step, idx) => (
                <li key={idx} className="font-mono text-[11px] text-slate-300 bg-slate-950 p-2 rounded border border-slate-800/80">
                  {step}
                </li>
              ))}
            </ol>

            <div className="mt-4 p-3 rounded-xl bg-amber-950/20 border border-amber-900/30 text-[11px] text-amber-200 leading-relaxed">
              💡 <strong>Dica Pro:</strong> Você pode transformar o script em um executável (.exe) para Windows instalando o PyInstaller:
              <div className="font-mono text-[10px] bg-slate-950 text-slate-300 p-2 rounded mt-1 border border-amber-900/40">
                pip install pyinstaller<br />
                pyinstaller --onefile {selectedSnippet.fileName}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
