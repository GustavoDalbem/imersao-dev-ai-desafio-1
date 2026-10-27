import React from 'react';
import { Calculator, Terminal, Code2, BookOpen, Cpu, Sparkles, Download, FileText } from 'lucide-react';
import { PythonEngineStatus } from '../services/pythonRunner';

interface NavbarProps {
  activeTab: 'calculator' | 'terminal' | 'code' | 'guide' | 'readme';
  setActiveTab: (tab: 'calculator' | 'terminal' | 'code' | 'guide' | 'readme') => void;
  engineStatus: PythonEngineStatus;
  onQuickDownloadAll?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  engineStatus,
  onQuickDownloadAll
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-sky-600 to-amber-400 p-0.5 shadow-lg shadow-sky-900/30">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                {/* Python Snake Motif */}
                <svg className="w-6 h-6" viewBox="0 0 128 128" fill="none">
                  <path
                    d="M63.5 13c-27.5 0-25.8 11.9-25.8 11.9l.03 12.3h26.2v3.7H27.2S11.4 39 11.4 66.8c0 27.7 13.8 26.8 13.8 26.8h8.2v-11.6s-.5-13.8 13.6-13.8h26.5s13.1-.2 13.1-12.8V26.2S88.6 13 63.5 13zm-14.7 8.2a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8z"
                    fill="#387EB8"
                  />
                  <path
                    d="M64.5 115c27.5 0 25.8-11.9 25.8-11.9l-.03-12.3H64.1v-3.7h36.7s15.8 1.9 15.8-25.9c0-27.7-13.8-26.8-13.8-26.8h-8.2v11.6s.5 13.8-13.6 13.8H54.5s-13.1.2-13.1 12.8v29.2S39.4 115 64.5 115zm14.7-8.2a4.4 4.4 0 1 1 0-8.8 4.4 4.4 0 0 1 0 8.8z"
                    fill="#FFE052"
                  />
                </svg>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white flex items-center">
                  Python<span className="text-amber-400">Calc</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider bg-sky-950/80 text-sky-400 border border-sky-800/60 rounded">
                  v3.12 Engine
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-slate-400 font-medium">
                Calculadora Interativa & Gerador de Código Python
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === 'calculator'
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <Calculator className="w-4 h-4 text-sky-400" />
              <span className="hidden xs:inline">Calculadora</span>
            </button>

            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === 'terminal'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <Terminal className="w-4 h-4 text-amber-400" />
              <span className="hidden xs:inline">Terminal REPL</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === 'code'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span className="hidden xs:inline">Códigos .py</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === 'guide'
                  ? 'bg-purple-500/15 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">Guia & Operadores</span>
            </button>

            <button
              onClick={() => setActiveTab('readme')}
              className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === 'readme'
                  ? 'bg-sky-500/15 text-sky-300 border border-sky-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <FileText className="w-4 h-4 text-sky-400" />
              <span>README</span>
            </button>
          </nav>

          {/* Python Engine Status Badge */}
          <div className="hidden lg:flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-2.5 py-1 rounded-full text-xs border ${
                engineStatus === 'ready'
                  ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-300'
                  : engineStatus === 'loading'
                  ? 'bg-amber-950/60 border-amber-800/60 text-amber-300'
                  : 'bg-sky-950/60 border-sky-800/60 text-sky-300'
              }`}
              title={
                engineStatus === 'ready'
                  ? 'Motor Pyodide (Python 3.12 WebAssembly) ativo e pronto para computações completas'
                  : engineStatus === 'loading'
                  ? 'Baixando runtime Python WebAssembly...'
                  : 'Motor matemático Python nativo de alta velocidade'
              }
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    engineStatus === 'ready'
                      ? 'bg-emerald-400'
                      : engineStatus === 'loading'
                      ? 'bg-amber-400'
                      : 'bg-sky-400'
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    engineStatus === 'ready'
                      ? 'bg-emerald-500'
                      : engineStatus === 'loading'
                      ? 'bg-amber-500'
                      : 'bg-sky-500'
                  }`}
                />
              </span>
              <Cpu className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px]">
                {engineStatus === 'ready'
                  ? 'Python WASM Ativo'
                  : engineStatus === 'loading'
                  ? 'Carregando CPython...'
                  : 'Python Runner'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
