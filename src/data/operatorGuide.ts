import { OperatorGuideItem } from '../types';

export const OPERATOR_GUIDE: OperatorGuideItem[] = [
  {
    symbol: '+',
    name: 'Adição',
    syntax: 'a + b',
    example: '15 + 27',
    result: '42',
    note: 'Em Python também serve para concatenar strings e mesclar listas.',
    typeResult: 'int ou float'
  },
  {
    symbol: '-',
    name: 'Subtração e Negação',
    syntax: 'a - b ou -a',
    example: '100 - 35.5',
    result: '64.5',
    note: 'Inverte sinal ou subtrai dois valores numéricos.',
    typeResult: 'int ou float'
  },
  {
    symbol: '*',
    name: 'Multiplicação',
    syntax: 'a * b',
    example: '6 * 7',
    result: '42',
    note: 'Para strings, repete o texto: "Py" * 3 vira "PyPyPy".',
    typeResult: 'int ou float'
  },
  {
    symbol: '/',
    name: 'Divisão Real (Float)',
    syntax: 'a / b',
    example: '10 / 4',
    result: '2.5',
    note: 'No Python 3, a barra única SEMPRE retorna float, mesmo se a divisão for exata (ex: 4 / 2 = 2.0).',
    typeResult: 'float'
  },
  {
    symbol: '//',
    name: 'Divisão Inteira (Floor Division)',
    syntax: 'a // b',
    example: '10 // 4',
    result: '2',
    note: 'Descarta a parte decimal e arredonda para baixo (piso). Muito usado para contagem de páginas e grupos.',
    typeResult: 'int ou float'
  },
  {
    symbol: '%',
    name: 'Módulo (Resto da Divisão)',
    syntax: 'a % b',
    example: '10 % 3',
    result: '1',
    note: 'Retorna o resto da divisão. Essencial para verificar se um número é par (n % 2 == 0) ou ímpar.',
    typeResult: 'int ou float'
  },
  {
    symbol: '**',
    name: 'Potenciação (Exponencial)',
    syntax: 'base ** expoente',
    example: '2 ** 8',
    result: '256',
    note: '⚠️ ATENÇÃO: Em Python o operador de potência é ** e NÃO ^ (o circunflexo ^ em Python é XOR bit a bit).',
    typeResult: 'int ou float'
  },
  {
    symbol: 'math.sqrt()',
    name: 'Raiz Quadrada',
    syntax: 'math.sqrt(x) ou x ** 0.5',
    example: 'math.sqrt(144)',
    result: '12.0',
    note: 'Disponível no módulo padrão `import math`. Alternativamente pode-se usar x ** 0.5 sem importar nada.',
    typeResult: 'float'
  },
  {
    symbol: 'divmod()',
    name: 'Quociente e Resto Juntos',
    syntax: 'divmod(a, b)',
    example: 'divmod(17, 5)',
    result: '(3, 2)',
    note: 'Função built-in do Python que retorna uma tupla com (a // b, a % b) em uma única operação ultra-rápida.',
    typeResult: 'tuple (int, int)'
  },
  {
    symbol: 'abs()',
    name: 'Valor Absoluto (Módulo)',
    syntax: 'abs(x)',
    example: 'abs(-42.7)',
    result: '42.7',
    note: 'Retorna a magnitude do número sem o sinal negativo.',
    typeResult: 'mesmo tipo de x'
  },
  {
    symbol: 'round()',
    name: 'Arredondamento',
    syntax: 'round(valor, casas)',
    example: 'round(3.14159, 2)',
    result: '3.14',
    note: 'Python utiliza "Bankers Rounding" (arredondamento para o número par mais próximo quando no meio .5).',
    typeResult: 'float ou int'
  }
];
