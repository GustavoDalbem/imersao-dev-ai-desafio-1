import { CodeSnippet } from '../types';

export const PYTHON_SNIPPETS: CodeSnippet[] = [
  {
    id: 'cli-interativo',
    title: '1. Calculadora Interativa de Terminal (CLI)',
    badge: 'Iniciante ao Intermediário',
    description: 'Interface de linha de comando completa com loop contínuo, menu amigável, validação de entradas, tratamento de erros e histórico de cálculos.',
    fileName: 'calculadora_terminal.py',
    tags: ['Terminal', 'while loop', 'try/except', 'Funções'],
    features: [
      'Menu numérico e interativo',
      'Operações básicas: +, -, *, /, //, %, ** e raiz',
      'Tratamento de divisão por zero (ZeroDivisionError)',
      'Validação de dados do usuário (ValueError)',
      'Histórico de cálculos durante a sessão'
    ],
    howToRun: [
      'Abra seu terminal ou prompt de comando',
      'Execute: python calculadora_terminal.py',
      'Escolha a operação digitando o número correspondente'
    ],
    code: `"""
Calculadora Interativa em Python (Linha de Comando)
Autor: PythonCalc
Compatibilidade: Python 3.8+
"""
import math
import sys

def somar(a: float, b: float) -> float:
    """Retorna a soma de a e b."""
    return a + b

def subtrair(a: float, b: float) -> float:
    """Retorna a diferença entre a e b."""
    return a - b

def multiplicar(a: float, b: float) -> float:
    """Retorna o produto de a e b."""
    return a * b

def dividir(a: float, b: float) -> float:
    """Retorna o quociente de a por b. Trata divisão por zero."""
    if b == 0:
        raise ZeroDivisionError("Erro: Não é possível dividir por zero!")
    return a / b

def divisao_inteira(a: float, b: float) -> int:
    """Retorna apenas a parte inteira da divisão (operador //)."""
    if b == 0:
        raise ZeroDivisionError("Erro: Não é possível dividir por zero!")
    return int(a // b)

def resto_divisao(a: float, b: float) -> float:
    """Retorna o resto da divisão (operador %)."""
    if b == 0:
        raise ZeroDivisionError("Erro: Não é possível calcular o resto com divisor zero!")
    return a % b

def potenciacao(base: float, expoente: float) -> float:
    """Eleva a base ao expoente (operador **)."""
    return base ** expoente

def raiz_quadrada(numero: float) -> float:
    """Calcula a raiz quadrada de um número não negativo."""
    if numero < 0:
        raise ValueError("Erro: Não existe raiz real de número negativo!")
    return math.sqrt(numero)

def exibir_menu():
    """Imprime o menu formatado de opções."""
    print("=" * 45)
    print("        🐍 CALCULADORA EM PYTHON 🐍")
    print("=" * 45)
    print(" [1]  Soma (+)")
    print(" [2]  Subtração (-)")
    print(" [3]  Multiplicação (*)")
    print(" [4]  Divisão Real (/)")
    print(" [5]  Divisão Inteira (//)")
    print(" [6]  Resto da Divisão (%)")
    print(" [7]  Potenciação (**)")
    print(" [8]  Raiz Quadrada (√)")
    print(" [9]  Ver Histórico de Cálculos")
    print(" [0]  Sair")
    print("=" * 45)

def obter_numero(mensagem: str) -> float:
    """Lê um número do usuário garantindo que é um float válido."""
    while True:
        try:
            entrada = input(mensagem).strip().replace(',', '.')
            return float(entrada)
        except ValueError:
            print("⚠️  Entrada inválida! Digite apenas números.")

def main():
    historico = []
    print("\\nBem-vindo à Calculadora em Python!")

    while True:
        exibir_menu()
        opcao = input("Escolha uma opção (0-9): ").strip()

        if opcao == '0':
            print("\\nObrigado por usar a Calculadora Python! Até logo! 🐍✨")
            break

        if opcao == '9':
            print("\\n📜 --- HISTÓRICO DE CÁLCULOS ---")
            if not historico:
                print("Nenhum cálculo registrado até agora.")
            else:
                for idx, calc in enumerate(historico, 1):
                    print(f" {idx}. {calc}")
            print("-" * 35)
            input("\\nPressione ENTER para voltar ao menu...")
            continue

        try:
            if opcao in ('1', '2', '3', '4', '5', '6', '7'):
                num1 = obter_numero("Digite o 1º número: ")
                num2 = obter_numero("Digite o 2º número: ")

                if opcao == '1':
                    resultado = somar(num1, num2)
                    expressao = f"{num1} + {num2} = {resultado}"
                elif opcao == '2':
                    resultado = subtrair(num1, num2)
                    expressao = f"{num1} - {num2} = {resultado}"
                elif opcao == '3':
                    resultado = multiplicar(num1, num2)
                    expressao = f"{num1} * {num2} = {resultado}"
                elif opcao == '4':
                    resultado = dividir(num1, num2)
                    expressao = f"{num1} / {num2} = {resultado:.4f}"
                elif opcao == '5':
                    resultado = divisao_inteira(num1, num2)
                    expressao = f"{num1} // {num2} = {resultado}"
                elif opcao == '6':
                    resultado = resto_divisao(num1, num2)
                    expressao = f"{num1} % {num2} = {resultado}"
                elif opcao == '7':
                    resultado = potenciacao(num1, num2)
                    expressao = f"{num1} ** {num2} = {resultado}"

            elif opcao == '8':
                num = obter_numero("Digite o número para raiz quadrada: ")
                resultado = raiz_quadrada(num)
                expressao = f"√{num} = {resultado:.4f}"

            else:
                print("⚠️  Opção inválida! Escolha um número de 0 a 9.")
                continue

            # Exibe resultado e adiciona ao histórico
            print("\\n" + "—" * 35)
            print(f"👉 RESULTADO: {expressao}")
            print("—" * 35)
            historico.append(expressao)

        except ZeroDivisionError as erro:
            print(f"\\n❌ {erro}")
        except ValueError as erro:
            print(f"\\n❌ {erro}")
        except Exception as erro:
            print(f"\\n❌ Erro inesperado: {erro}")

        input("\\nPressione ENTER para continuar...")

if __name__ == '__main__':
    main()
`
  },
  {
    id: 'gui-tkinter',
    title: '2. Calculadora Gráfica Desktop (Tkinter)',
    badge: 'Desktop GUI Nativa',
    description: 'Interface gráfica moderna usando Tkinter (incluso nativamente no Python). Não precisa instalar nenhuma biblioteca externa!',
    fileName: 'calculadora_gui.py',
    tags: ['Tkinter', 'Desktop', 'Interface Gráfica', 'Eventos'],
    features: [
      'Funciona direto: 100% biblioteca padrão do Python',
      'Display digital responsivo com visual escuro elegante',
      'Suporte a clique com mouse e teclado numérico físico',
      'Botões de apagar, limpar tudo (C), inversão de sinal (±) e porcentagem',
      'Design em grade com cores estilizadas'
    ],
    howToRun: [
      'Certifique-se de ter o Python instalado',
      'Execute no terminal: python calculadora_gui.py',
      'Uma janela gráfica desktop abrirá instantaneamente'
    ],
    code: `"""
Calculadora Gráfica Moderna em Python usando Tkinter
Não requer instalação de pacotes externos (pip). Funciona nativamente!
"""
import tkinter as tk
from tkinter import messagebox
import math

class CalculadoraGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Python Calculator")
        self.root.geometry("360x520")
        self.root.resizable(False, False)
        self.root.configure(bg="#1e1e2e")

        # Expressão atual
        self.expressao = ""

        # Variável para o visor
        self.texto_visor = tk.StringVar(value="0")

        self.criar_visor()
        self.criar_botoes()
        self.vincular_teclado()

    def criar_visor(self):
        """Cria o display numérico da calculadora."""
        container = tk.Frame(self.root, bg="#181825", padx=15, pady=20)
        container.pack(fill="x", padx=15, pady=(15, 10))

        # Rótulo de expressão secundária
        self.lbl_expressao = tk.Label(
            container,
            text="",
            font=("Segoe UI", 11),
            fg="#a6adc8",
            bg="#181825",
            anchor="e"
        )
        self.lbl_expressao.pack(fill="x")

        # Visor principal
        visor = tk.Label(
            container,
            textvariable=self.texto_visor,
            font=("Segoe UI", 28, "bold"),
            fg="#cdd6f4",
            bg="#181825",
            anchor="e"
        )
        visor.pack(fill="x", pady=(5, 0))

    def criar_botoes(self):
        """Cria o teclado de botões em formato de grade (grid)."""
        frame_botoes = tk.Frame(self.root, bg="#1e1e2e")
        frame_botoes.pack(fill="both", expand=True, padx=15, pady=(0, 15))

        botoes = [
            ('C', 0, 0, '#f38ba8', '#11111b', self.limpar),
            ('⌫', 0, 1, '#fab387', '#11111b', self.apagar_ultimo),
            ('%', 0, 2, '#45475a', '#cdd6f4', lambda: self.adicionar_caractere('%')),
            ('/', 0, 3, '#89b4fa', '#11111b', lambda: self.adicionar_operador('/')),

            ('7', 1, 0, '#313244', '#cdd6f4', lambda: self.adicionar_caractere('7')),
            ('8', 1, 1, '#313244', '#cdd6f4', lambda: self.adicionar_caractere('8')),
            ('9', 1, 2, '#313244', '#cdd6f4', lambda: self.adicionar_caractere('9')),
            ('*', 1, 3, '#89b4fa', '#11111b', lambda: self.adicionar_operador('*')),

            ('4', 2, 0, '#313244', '#cdd6f4', lambda: self.adicionar_caractere('4')),
            ('5', 2, 1, '#313244', '#cdd6f4', lambda: self.adicionar_caractere('5')),
            ('6', 2, 2, '#313244', '#cdd6f4', lambda: self.adicionar_caractere('6')),
            ('-', 2, 3, '#89b4fa', '#11111b', lambda: self.adicionar_operador('-')),

            ('1', 3, 0, '#313244', '#cdd6f4', lambda: self.adicionar_caractere('1')),
            ('2', 3, 1, '#313244', '#cdd6f4', lambda: self.adicionar_caractere('2')),
            ('3', 3, 2, '#313244', '#cdd6f4', lambda: self.adicionar_caractere('3')),
            ('+', 3, 3, '#89b4fa', '#11111b', lambda: self.adicionar_operador('+')),

            ('±', 4, 0, '#45475a', '#cdd6f4', self.inverter_sinal),
            ('0', 4, 1, '#313244', '#cdd6f4', lambda: self.adicionar_caractere('0')),
            ('.', 4, 2, '#45475a', '#cdd6f4', lambda: self.adicionar_caractere('.')),
            ('=', 4, 3, '#a6e3a1', '#11111b', self.calcular),
        ]

        # Configura proporção de 4 colunas e 5 linhas
        for i in range(4):
            frame_botoes.columnconfigure(i, weight=1, uniform="col")
        for i in range(5):
            frame_botoes.rowconfigure(i, weight=1, uniform="row")

        for (texto, linha, col, cor_fundo, cor_texto, comando) in botoes:
            btn = tk.Button(
                frame_botoes,
                text=texto,
                bg=cor_fundo,
                fg=cor_texto,
                font=("Segoe UI", 14, "bold"),
                relief="flat",
                activebackground="#585b70",
                activeforeground="#ffffff",
                command=comando,
                cursor="hand2"
            )
            btn.grid(row=linha, column=col, padx=4, pady=4, sticky="nsew")

    def vincular_teclado(self):
        """Permite usar o teclado físico do computador."""
        self.root.bind("<Return>", lambda e: self.calcular())
        self.root.bind("<KP_Enter>", lambda e: self.calcular())
        self.root.bind("<BackSpace>", lambda e: self.apagar_ultimo())
        self.root.bind("<Escape>", lambda e: self.limpar())
        for c in "0123456789+-*/.%":
            self.root.bind(c, lambda e, char=c: self.adicionar_caractere(char))

    def adicionar_caractere(self, char):
        if self.expressao == "0" and char not in ".":
            self.expressao = char
        else:
            self.expressao += char
        self.texto_visor.set(self.expressao)

    def adicionar_operador(self, op):
        if not self.expressao:
            if op == '-':
                self.expressao += op
                self.texto_visor.set(self.expressao)
            return
        if self.expressao[-1] in "+-*/%":
            self.expressao = self.expressao[:-1] + op
        else:
            self.expressao += op
        self.texto_visor.set(self.expressao)

    def inverter_sinal(self):
        if not self.expressao:
            return
        try:
            val = eval(self.expressao)
            val = -val
            self.expressao = str(val)
            self.texto_visor.set(self.expressao)
        except Exception:
            pass

    def apagar_ultimo(self):
        self.expressao = self.expressao[:-1]
        self.texto_visor.set(self.expressao if self.expressao else "0")

    def limpar(self):
        self.expressao = ""
        self.texto_visor.set("0")
        self.lbl_expressao.config(text="")

    def calcular(self):
        if not self.expressao:
            return
        try:
            self.lbl_expressao.config(text=self.expressao + " =")
            # Avalia a expressão com segurança
            resultado = eval(self.expressao)
            
            # Formata número para remover .0 desnecessário
            if isinstance(resultado, float) and resultado.is_integer():
                resultado = int(resultado)
            elif isinstance(resultado, float):
                resultado = round(resultado, 8)

            self.texto_visor.set(str(resultado))
            self.expressao = str(resultado)
        except ZeroDivisionError:
            self.texto_visor.set("Erro: Divisão por 0")
            self.expressao = ""
        except Exception:
            self.texto_visor.set("Erro de Sintaxe")
            self.expressao = ""

if __name__ == '__main__':
    janela = tk.Tk()
    app = CalculadoraGUI(janela)
    janela.mainloop()
`
  },
  {
    id: 'poo-classes',
    title: '3. Calculadora Orientada a Objetos (POO + Testes)',
    badge: 'Avançado / Arquitetura',
    description: 'Implementação com boas práticas de engenharia de software, classes bem encapsuladas, métodos encadeáveis, sistema de memória (M+, M-, MR, MC) e testes unitários com unittest.',
    fileName: 'calculadora_poo.py',
    tags: ['POO', 'Classes', 'Design Patterns', 'Testes Unitários', 'Memória'],
    features: [
      'Classes Calculadora, Historico e Memoria',
      'Métodos encadeáveis (Fluent Interface: calc.somar(5).multiplicar(2))',
      'Controle de estado limpo e imutabilidade opcional',
      'Conjunto de testes automatizados com unittest nativo'
    ],
    howToRun: [
      'Execute para ver a demonstração e os testes:',
      'python calculadora_poo.py'
    ],
    code: `"""
Calculadora Orientada a Objetos (POO) em Python
Com Encapsulamento, Fluent Interface (encadeamento) e Testes Automatizados.
"""
from typing import List, Optional
import unittest

class MemoriaCalculadora:
    """Gerencia a memória acumuladora da calculadora (M+, M-, MR, MC)."""
    def __init__(self):
        self._valor: float = 0.0

    def adicionar(self, valor: float) -> None:
        self._valor += valor

    def subtrair(self, valor: float) -> None:
        self._valor -= valor

    def ler(self) -> float:
        return self._valor

    def limpar(self) -> None:
        self._valor = 0.0


class RegistroHistorico:
    """Representa um registro único de operação matemática."""
    def __init__(self, operacao: str, operando1: float, operando2: Optional[float], resultado: float):
        self.operacao = operacao
        self.operando1 = operando1
        self.operando2 = operando2
        self.resultado = resultado

    def __repr__(self) -> str:
        if self.operando2 is not None:
            return f"{self.operando1} {self.operacao} {self.operando2} = {self.resultado}"
        return f"{self.operacao}({self.operando1}) = {self.resultado}"


class Calculadora:
    """Classe principal de cálculo com suporte a encadeamento de métodos."""
    def __init__(self, valor_inicial: float = 0.0):
        self._resultado: float = float(valor_inicial)
        self.memoria = MemoriaCalculadora()
        self.historico: List[RegistroHistorico] = []

    @property
    def resultado(self) -> float:
        """Obtém o valor atual acumulado."""
        return self._resultado

    def zerar(self) -> "Calculadora":
        """Reseta o valor atual para zero."""
        self._resultado = 0.0
        return self

    def somar(self, valor: float) -> "Calculadora":
        anterior = self._resultado
        self._resultado += valor
        self.historico.append(RegistroHistorico("+", anterior, valor, self._resultado))
        return self

    def subtrair(self, valor: float) -> "Calculadora":
        anterior = self._resultado
        self._resultado -= valor
        self.historico.append(RegistroHistorico("-", anterior, valor, self._resultado))
        return self

    def multiplicar(self, valor: float) -> "Calculadora":
        anterior = self._resultado
        self._resultado *= valor
        self.historico.append(RegistroHistorico("*", anterior, valor, self._resultado))
        return self

    def dividir(self, valor: float) -> "Calculadora":
        if valor == 0:
            raise ZeroDivisionError("Não é permitido dividir por zero!")
        anterior = self._resultado
        self._resultado /= valor
        self.historico.append(RegistroHistorico("/", anterior, valor, self._resultado))
        return self

    def potencia(self, expoente: float) -> "Calculadora":
        anterior = self._resultado
        self._resultado **= expoente
        self.historico.append(RegistroHistorico("**", anterior, expoente, self._resultado))
        return self

    def porcentagem(self, taxa: float) -> "Calculadora":
        """Calcula taxa% sobre o valor atual."""
        anterior = self._resultado
        self._resultado = (anterior * taxa) / 100.0
        self.historico.append(RegistroHistorico("%", anterior, taxa, self._resultado))
        return self


# ==============================================================================
# TESTES UNITÁRIOS AUTOMATIZADOS (unittest)
# ==============================================================================
class TestCalculadora(unittest.TestCase):
    def setUp(self):
        self.calc = Calculadora()

    def test_operacoes_basicas(self):
        self.calc.somar(10).subtrair(3).multiplicar(2)
        self.assertEqual(self.calc.resultado, 14.0)

    def test_divisao_por_zero(self):
        self.calc.somar(50)
        with self.assertRaises(ZeroDivisionError):
            self.calc.dividir(0)

    def test_potencia(self):
        self.calc.somar(3).potencia(3)
        self.assertEqual(self.calc.resultado, 27.0)

    def test_memoria(self):
        self.calc.somar(100)
        self.calc.memoria.adicionar(self.calc.resultado)
        self.calc.zerar().somar(50)
        self.calc.memoria.subtrair(self.calc.resultado)
        self.assertEqual(self.calc.memoria.ler(), 50.0)


if __name__ == '__main__':
    print("=== DEMONSTRAÇÃO DA CALCULADORA POO ===")
    calc = Calculadora(10)
    print(f"Valor inicial: {calc.resultado}")

    # Encadeamento fluente (Fluent Interface)
    calc.somar(5).multiplicar(2).subtrair(6).dividir(3)
    print(f"Resultado final de ((10 + 5) * 2 - 6) / 3: {calc.resultado}")

    print("\\nHistórico de operações:")
    for item in calc.historico:
        print(f"  -> {item}")

    print("\\n=== EXECUTANDO TESTES UNITÁRIOS ===")
    suite = unittest.TestLoader().loadTestsFromTestCase(TestCalculadora)
    unittest.TextTestRunner(verbosity=2).run(suite)
`
  },
  {
    id: 'cientifica-avancada',
    title: '4. Calculadora Científica e Financeira Avançada',
    badge: 'Científica & Financeira',
    description: 'Cálculos trigonométricos, logaritmos, estatística descritiva (média, desvio padrão), juros compostos e conversões binárias/hexadecimais.',
    fileName: 'calculadora_cientifica.py',
    tags: ['math', 'statistics', 'Trigonometria', 'Juros Compostos', 'Finanças'],
    features: [
      'Trigonometria em radianos e graus (sin, cos, tan)',
      'Logaritmos naturais e base 10',
      'Módulo de Estatística (média, mediana, desvio padrão)',
      'Cálculo de Juros Compostos e Parcelamento de Empréstimos (Amortização Price)',
      'Conversor de bases numéricas (Decimal -> Binário, Octal, Hexadecimal)'
    ],
    howToRun: [
      'Execute no terminal:',
      'python calculadora_cientifica.py'
    ],
    code: `"""
Calculadora Científica e Financeira em Python
Usa bibliotecas padrão: math e statistics
"""
import math
import statistics
from typing import List, Tuple

class CalculadoraCientifica:
    @staticmethod
    def seno(graus: float) -> float:
        """Calcula o seno recebendo o ângulo em graus."""
        radianos = math.radians(graus)
        return math.sin(radianos)

    @staticmethod
    def cosseno(graus: float) -> float:
        """Calcula o cosseno recebendo o ângulo em graus."""
        radianos = math.radians(graus)
        return math.cos(radianos)

    @staticmethod
    def tangente(graus: float) -> float:
        """Calcula a tangente recebendo o ângulo em graus."""
        if graus % 180 == 90:
            raise ValueError("Tangente indefinida para 90°, 270°, etc.")
        radianos = math.radians(graus)
        return math.tan(radianos)

    @staticmethod
    def logaritmo(numero: float, base: float = 10.0) -> float:
        """Calcula o logaritmo em qualquer base positiva."""
        if numero <= 0:
            raise ValueError("Logaritmando deve ser estritamente positivo.")
        if base <= 0 or base == 1:
            raise ValueError("Base deve ser positiva e diferente de 1.")
        return math.log(numero, base)

    @staticmethod
    def fatorial(n: int) -> int:
        """Calcula o fatorial de um número inteiro não-negativo."""
        if n < 0:
            raise ValueError("Fatorial não é definido para inteiros negativos.")
        return math.factorial(n)

    @staticmethod
    def bhaskara(a: float, b: float, c: float) -> Tuple[Optional[float], Optional[float]]:
        """Resolve a equação de segundo grau: ax² + bx + c = 0."""
        if a == 0:
            raise ValueError("O coeficiente 'a' não pode ser 0 em equação de 2º grau.")
        delta = (b ** 2) - (4 * a * c)
        if delta < 0:
            return (None, None) # Sem raízes reais
        x1 = (-b + math.sqrt(delta)) / (2 * a)
        x2 = (-b - math.sqrt(delta)) / (2 * a)
        return (x1, x2)


class CalculadoraFinanceira:
    @staticmethod
    def juros_compostos(capital: float, taxa_mensal_pct: float, meses: int) -> dict:
        """
        Calcula o montante final sob juros compostos: M = C * (1 + i)^t
        """
        taxa_decimal = taxa_mensal_pct / 100.0
        montante = capital * ((1 + taxa_decimal) ** meses)
        total_juros = montante - capital
        return {
            "capital_investido": capital,
            "taxa_mensal": f"{taxa_mensal_pct}%",
            "periodo_meses": meses,
            "montante_final": round(montante, 2),
            "juros_acumulados": round(total_juros, 2)
        }

    @staticmethod
    def parcelamento_price(valor_financiado: float, taxa_mensal_pct: float, parcelas: int) -> float:
        """Calcula a parcela fixa de um financiamento pela Tabela Price."""
        i = taxa_mensal_pct / 100.0
        fator = (1 + i) ** parcelas
        prestacao = valor_financiado * ((i * fator) / (fator - 1))
        return round(prestacao, 2)


class Estatistica:
    @staticmethod
    def analisar_dados(valores: List[float]) -> dict:
        """Calcula média, mediana, variância e desvio padrão de uma lista."""
        if len(valores) < 2:
            raise ValueError("É necessário pelo menos 2 números para análise estatística.")
        return {
            "total_elementos": len(valores),
            "media": round(statistics.mean(valores), 4),
            "mediana": round(statistics.median(valores), 4),
            "desvio_padrao": round(statistics.stdev(valores), 4),
            "variancia": round(statistics.variance(valores), 4),
            "maximo": max(valores),
            "minimo": min(valores)
        }


if __name__ == '__main__':
    print("=" * 50)
    print("  CIENTÍFICA & FINANCEIRA EM PYTHON")
    print("=" * 50)

    # Exemplo Trigonometria
    graus = 30
    print(f"sen({graus}°) = {CalculadoraCientifica.seno(graus):.4f}")
    print(f"cos({graus}°) = {CalculadoraCientifica.cosseno(graus):.4f}")

    # Exemplo Bhaskara: x² - 5x + 6 = 0  -> raízes 3 e 2
    x1, x2 = CalculadoraCientifica.bhaskara(1, -5, 6)
    print(f"Raízes de x² - 5x + 6 = 0: x1={x1}, x2={x2}")

    # Exemplo Financeiro: Investir R$ 5.000 a 1% ao mês por 24 meses
    fin = CalculadoraFinanceira.juros_compostos(5000, 1.0, 24)
    print(f"Investimento R$ 5000 a 1%/mês por 24 meses -> Montante: R$ {fin['montante_final']}")

    # Exemplo Estatístico
    notas = [7.5, 8.0, 9.2, 6.0, 8.5, 10.0]
    stats = Estatistica.analisar_dados(notas)
    print(f"Média das notas {notas}: {stats['media']}, Desvio padrão: {stats['desvio_padrao']}")
`
  }
];
