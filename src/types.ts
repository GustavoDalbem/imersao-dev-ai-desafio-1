export interface CalculationItem {
  id: string;
  expression: string;
  pythonCode: string;
  result: string;
  timestamp: Date;
  isError?: boolean;
}

export interface TerminalEntry {
  id: string;
  input: string;
  output?: string;
  stdout?: string;
  error?: string;
  timestamp: Date;
  durationMs?: number;
}

export interface PythonVariable {
  name: string;
  value: string;
  type: string;
}

export interface CodeSnippet {
  id: string;
  title: string;
  badge: string;
  description: string;
  fileName: string;
  code: string;
  tags: string[];
  features: string[];
  howToRun: string[];
}

export interface PresetFormula {
  id: string;
  category: 'básico' | 'científico' | 'financeiro' | 'estatística' | 'truques_python';
  title: string;
  description: string;
  code: string;
  tags: string[];
}

export interface OperatorGuideItem {
  symbol: string;
  name: string;
  syntax: string;
  example: string;
  result: string;
  note: string;
  typeResult: string;
}
