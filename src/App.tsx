import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { VisualCalculator } from './components/VisualCalculator';
import { PythonTerminal } from './components/PythonTerminal';
import { CodeViewer } from './components/CodeViewer';
import { PythonCheatSheet } from './components/PythonCheatSheet';
import { ReadmeViewer } from './components/ReadmeViewer';
import { pythonRunner, PythonEngineStatus } from './services/pythonRunner';
import { CalculationItem } from './types';
import { Code2, Heart, Github, Terminal, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'terminal' | 'code' | 'guide' | 'readme'>('calculator');
  const [engineStatus, setEngineStatus] = useState<PythonEngineStatus>(pythonRunner.getStatus());
  const [history, setHistory] = useState<CalculationItem[]>([]);
  const [terminalCode, setTerminalCode] = useState<string>('');

  useEffect(() => {
    const unsubscribe = pythonRunner.onStatusChange(status => {
      setEngineStatus(status);
    });
    return () => unsubscribe();
  }, []);

  const handleSendToTerminal = (code: string) => {
    setTerminalCode(code);
    setActiveTab('terminal');
  };

  const handleTestOperator = (example: string) => {
    setTerminalCode(example);
    setActiveTab('terminal');
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        engineStatus={engineStatus}
      />

      {/* Main Body */}
      <main className="flex-1">
        {activeTab === 'calculator' && (
          <VisualCalculator
            onSendToTerminal={handleSendToTerminal}
            history={history}
            setHistory={setHistory}
          />
        )}

        {activeTab === 'terminal' && (
          <PythonTerminal
            initialCode={terminalCode}
            onCodeExecuted={(code, res) => {
              // Optionally add to history
            }}
          />
        )}

        {activeTab === 'code' && (
          <CodeViewer onLoadInTerminal={handleSendToTerminal} />
        )}

        {activeTab === 'guide' && (
          <PythonCheatSheet onTestOperator={handleTestOperator} />
        )}

        {activeTab === 'readme' && (
          <ReadmeViewer onGoToTab={setActiveTab} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">PythonCalc</span>
            <span>—</span>
            <span>Calculadora Interativa em Python para Navegador & Desktop</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500 font-mono">CPython 3.12 WebAssembly Engine</span>
            <span>•</span>
            <span className="text-amber-400 font-mono">math • statistics • sys</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
