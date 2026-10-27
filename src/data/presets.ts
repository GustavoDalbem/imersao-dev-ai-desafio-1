import { PresetFormula } from '../types';

export const CALCULATION_PRESETS: PresetFormula[] = [
  {
    id: 'juros-compostos',
    category: 'financeiro',
    title: 'Juros Compostos (M = C * (1+i)^t)',
    description: 'Cálculo de rendimento com taxa e meses em Python',
    code: 'capital = 1000\ntaxa = 0.05 # 5% ao mês\nmeses = 12\nmontante = capital * (1 + taxa) ** meses\nround(montante, 2)',
    tags: ['Finanças', '**', 'round']
  },
  {
    id: 'pitagoras',
    category: 'científico',
    title: 'Teorema de Pitágoras (Hipotenusa)',
    description: 'Calcula a hipotenusa de um triângulo retângulo',
    code: 'a = 3\nb = 4\nhipotenusa = math.sqrt(a**2 + b**2)\nhipotenusa',
    tags: ['math.sqrt', 'Geometria', '**']
  },
  {
    id: 'bhaskara',
    category: 'científico',
    title: 'Fórmula de Bhaskara',
    description: 'Encontra as raízes x1 e x2 de x² - 5x + 6 = 0',
    code: 'a, b, c = 1, -5, 6\ndelta = b**2 - 4*a*c\nx1 = (-b + math.sqrt(delta)) / (2*a)\nx2 = (-b - math.sqrt(delta)) / (2*a)\n(x1, x2)',
    tags: ['Álgebra', 'Tupla', 'math.sqrt']
  },
  {
    id: 'estatistica-lista',
    category: 'estatística',
    title: 'Média e Desvio Padrão',
    description: 'Estatística descritiva em uma linha de código',
    code: 'dados = [12, 15, 18, 22, 25, 30, 31]\n(statistics.mean(dados), round(statistics.stdev(dados), 3))',
    tags: ['statistics', 'Lista', 'mean']
  },
  {
    id: 'divisao-inteira-resto',
    category: 'truques_python',
    title: 'Divisão Inteira & Resto (divmod)',
    description: 'Separa horas e minutos ou quociente e resto',
    code: 'total_minutos = 245\nhoras, minutos = divmod(total_minutos, 60)\nf"{horas}h e {minutos}min"',
    tags: ['divmod', '//', '%', 'f-string']
  },
  {
    id: 'fatorial-permutacao',
    category: 'científico',
    title: 'Fatorial e Permutação',
    description: 'Cálculo de fatorial com o módulo nativo math',
    code: 'math.factorial(8)',
    tags: ['math.factorial', 'Combinatória']
  },
  {
    id: 'conversor-temperatura',
    category: 'básico',
    title: 'Celsius para Fahrenheit',
    description: 'Conversão clássica usando fórmula de temperatura',
    code: 'celsius = 32.0\nfahrenheit = (celsius * 9/5) + 32\nfahrenheit',
    tags: ['Aritmética', 'float']
  },
  {
    id: 'list-comp-sum',
    category: 'truques_python',
    title: 'Soma dos Quadrados (List Comprehension)',
    description: 'Soma dos quadrados dos números pares de 1 a 20',
    code: 'sum([x**2 for x in range(1, 21) if x % 2 == 0])',
    tags: ['List Comp', 'range', 'sum']
  }
];
