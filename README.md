<div align="center">

# 🐍 PythonCalc
### Calculadora Interativa com Motor Python 3.12 & Gerador de Scripts Prontos

[![Python 3.12](https://img.shields.io/badge/Python-3.12%20WASM-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge)](https://opensource.org/licenses/Apache-2.0)

<br />

<p align="center">
  <img src="public/assets/aistudio/image_cf400586.png" alt="PythonCalc Preview" width="850" style="border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);" />
</p>

*Uma aplicação moderna desenvolvida para executar expressões matemáticas em Python diretamente no navegador via WebAssembly (Pyodide), além de fornecer scripts completos e prontos para uso em CLI, Interface Gráfica Desktop (Tkinter) e Programação Orientada a Objetos (POO).*

</div>

---

## 📋 Sumário

- [Visão Geral](#-visão-geral)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Scripts Python Inclusos](#-scripts-python-inclusos)
- [Como Executar Localmente](#-como-executar-localmente)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação e Execução da Aplicação Web](#instalação-e-execução-da-aplicação-web)
  - [Como Rodar os Scripts Python Nativamente](#como-rodar-os-scripts-python-nativamente)
- [Diferenciais Matemáticos do Python](#-diferenciais-matemáticos-do-python)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Licença](#-licença)

---

## 🌟 Visão Geral

O **PythonCalc** resolve uma dúvida muito comum: *"Como criar uma calculadora em Python e como suas operações funcionam de verdade?"*.

A aplicação conta com um **motor CPython 3.12 WebAssembly (Pyodide)** integrado no próprio frontend, permitindo avaliar expressões matemáticas genuínas com total fidelidade sem depender de servidores externos, além de um conjunto com 4 implementações profissionais escritas em Python nativo.

---

## 🚀 Funcionalidades Principais

### 1. 🧮 Calculadora Visual ("Pythonic UI")
- **Display OLED Digital**: exibe a expressão aritmética, a tradução do código em tempo real (`>>> resultado = ...`) e a tipagem estrita do retorno (`int`, `float`, `tuple`, `complex`).
- **Teclado Completo**:
  - Operadores básicos: `+`, `-`, `*`, `/`, `( )`, `.`, `±`.
  - Operadores especiais do Python: Potência (`**`), Divisão Inteira (`//`), Resto da Divisão (`%`).
  - Funções nativas do módulo `math`: `math.sqrt`, `math.sin`, `math.cos`, `math.tan`, `math.pi`, `math.e`, `math.log`, `math.log10`, `math.factorial`, `round()`.
- **Histórico Persistente**: armazena cálculos com data/hora e clique rápido para reutilização.
- **Suporte a Teclado Físico**: use o teclado do computador (`Enter` calcula, `Backspace` apaga, `Esc` limpa).

### 2. 💻 Terminal Python Interativo (REPL)
- Terminal autêntico com prompt `>>>`.
- Suporte a variáveis em tempo de execução: atribua valores (ex: `preco = 150`, `desconto = 0.15`) e utilize-as em cálculos subsequentes (`preco * (1 - desconto)`).
- Captura de saída de texto padrão `print()` (`sys.stdout`).
- Inspetor lateral de variáveis com nome, valor e tipo (`int`, `float`, `list`, etc.).
- Presets prontos para carregar em 1 clique: Juros Compostos, Bhaskara, Teorema de Pitágoras e Estatística Descritiva.

### 3. 📄 Gerador de Códigos Python (.py)
- Visualizador com destaque de sintaxe para 4 scripts completos prontos para uso em ambiente de produção ou estudo.
- Botão de **Download Direto (.py)** para sua máquina.
- Botão de **Copiar Código**.
- Botão de **Testar no REPL** (carrega e executa no terminal do navegador).

### 4. 📚 Guia & Cheat-Sheet de Operadores
- Explicação aprofundada dos operadores matemáticos do Python.
- Destaque para armadilhas frequentes (por que `^` é XOR bit a bit e não potência, comportamento da divisão `/` vs `//` e inteiros sem estouro de limite de bits).

---

## 📦 Scripts Python Inclusos

| Arquivo | Paradigma / Tipo | Destaques |
| :--- | :--- | :--- |
| **`calculadora_terminal.py`** | Linha de comando (CLI) | Menu em loop `while True`, validação de entradas, `try/except` para `ZeroDivisionError` e histórico em lista. |
| **`calculadora_gui.py`** | Desktop Gráfica (Tkinter) | Interface visual nativa moderna sem dependências externas (100% biblioteca padrão), layout em grade e suporte a teclado. |
| **`calculadora_poo.py`** | Orientação a Objetos (POO) | Classes `Calculadora`, `MemoriaCalculadora` (M+, M-, MR, MC), métodos encadeáveis (Fluent Interface) e testes unitários com `unittest`. |
| **`calculadora_cientifica.py`** | Científica & Financeira | Módulos `math` e `statistics`, resolução de Bhaskara, Juros Compostos e cálculo de parcelamento pela Tabela Price. |

---

## 💻 Como Executar Localmente

### Pré-requisitos
- **Node.js** (versão 18+ recomendada)
- **Python** (versão 3.8+ recomendada para rodar os scripts `.py` localmente)

### Instalação e Execução da Aplicação Web

1. **Clone o repositório ou baixe os arquivos**:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd python-calc
   ```

2. **Instale as dependências do projeto**:
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   Acesse no navegador: `http://localhost:3000` (ou na porta informada no terminal).

4. **Gerar build de produção**:
   ```bash
   npm run build
   ```

---

### Como Rodar os Scripts Python Nativamente

Você pode baixar qualquer um dos scripts disponíveis na aba **Códigos .py** da aplicação ou criá-los em seu editor favorito:

#### 1. Executando a Calculadora CLI:
```bash
python calculadora_terminal.py
```

#### 2. Executando a Calculadora Gráfica Desktop (Tkinter):
```bash
python calculadora_gui.py
```
*(Não requer nenhuma instalação adicional via pip, pois o Tkinter já vem instalado com a maioria das distribuições do Python).*

#### 3. Executando a Calculadora POO com Testes Automatizados:
```bash
python calculadora_poo.py
```

#### 4. Gerando um executável `.exe` independente (opcional com PyInstaller):
```bash
pip install pyinstaller
pyinstaller --onefile calculadora_gui.py
```
O arquivo `.exe` será gerado automaticamente na pasta `dist/`.

---

## 🧠 Diferenciais Matemáticos do Python

| Operador / Recurso | Sintaxe Python | Exemplo | Retorno | Particularidade |
| :---: | :---: | :---: | :---: | :--- |
| **Potência** | `**` | `2 ** 8` | `256` | Em Python o operador `^` é XOR binário, utilize sempre `**` para exponenciação. |
| **Divisão Real** | `/` | `7 / 2` | `3.5` | Sempre retorna `float`, mesmo quando a divisão é exata (`4 / 2` retorna `2.0`). |
| **Divisão Inteira** | `//` | `7 // 2` | `3` | Realiza o arredondamento para baixo (piso/floor division), descartando decimais. |
| **Módulo** | `%` | `7 % 2` | `1` | Retorna o resto da divisão euclidiana. |
| **Quociente e Resto** | `divmod(a, b)` | `divmod(17, 5)` | `(3, 2)` | Retorna uma tupla contendo `(a // b, a % b)` de forma ultra-otimizada. |
| **Precisão Infinita** | Inteiros (`int`) | `2 ** 1000` | `1.07e+301...` | Python gerencia a memória dinamicamente, evitando *Integer Overflow*. |

---

## 📁 Estrutura do Projeto

```
├── public/
│   └── assets/aistudio/image_cf400586.png  # Preview oficial da interface
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                      # Barra de navegação e status do motor WASM
│   │   ├── VisualCalculator.tsx            # Calculadora gráfica OLED com suporte CPython
│   │   ├── PythonTerminal.tsx              # Console REPL interativo com captura de stdout
│   │   ├── CodeViewer.tsx                  # Navegador e exportador dos 4 scripts .py
│   │   └── PythonCheatSheet.tsx            # Guia ilustrado de sintaxe matemática
│   ├── data/
│   │   ├── pythonSnippets.ts               # Códigos fonte completos dos 4 scripts
│   │   ├── presets.ts                      # Fórmulas prontas para o REPL
│   │   └── operatorGuide.ts                # Dados e explicações do guia de operadores
│   ├── services/
│   │   └── pythonRunner.ts                 # Motor WebAssembly Pyodide + Fallback local
│   ├── types.ts                            # Interfaces TypeScript do projeto
│   ├── App.tsx                             # Componente raiz da aplicação
│   ├── index.css                           # Configurações de estilo e Tailwind v4
│   └── main.tsx                            # Ponto de entrada React
├── index.html                              # Metadados e fontes (Fira Code, Plus Jakarta)
├── metadata.json                           # Configurações da aplicação no AI Studio
├── package.json                            # Dependências e scripts npm
├── README.md                               # Documentação oficial do projeto
└── vite.config.ts                          # Configuração do Vite e Tailwind
```

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Animações e Ícones**: [Motion](https://motion.dev/), [Lucide React](https://lucide.dev/)
- **Execução Python em Navegador**: [Pyodide](https://pyodide.org/) (CPython 3.12 WebAssembly)
- **Empacotamento e Build**: [Vite](https://vitejs.dev/)

---

## 📄 Licença

Este projeto é disponibilizado sob a licença **Apache 2.0**. Sinta-se livre para utilizar, modificar e distribuir conforme suas necessidades.
