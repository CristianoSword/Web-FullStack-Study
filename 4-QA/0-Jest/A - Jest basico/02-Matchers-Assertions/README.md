# 02-Matchers-Assertions

Laboratório de **matchers e asserções do Jest**, cobrindo todos os grupos principais de verificação disponíveis no framework.

## 📋 O que é

Matchers são os métodos que o Jest usa para verificar se um valor corresponde ao esperado. Neste projeto exploramos desde comparações básicas de primitivos até matchers assimétricos avançados como `expect.objectContaining` e `expect.arrayContaining`.

## 🏗️ Estrutura do Projeto

```
02-Matchers-Assertions/
├── src/
│   ├── models/
│   │   └── data-models.js    # Modelos de dados (User, Product, AppError)
│   └── utils/
│       └── helpers.js        # Funções utilitárias testadas
├── tests/
│   ├── matchers.test.js      # Suite principal de matchers
│   └── edge-cases.test.js    # Edge cases + matchers assimétricos
├── package.json
└── .gitignore
```

## 🧪 Grupos de Matchers Cobertos

| Grupo | Matchers |
|---|---|
| **Igualdade** | `toBe`, `toEqual`, `toStrictEqual` |
| **Veracidade** | `toBeTruthy`, `toBeFalsy`, `toBeNull`, `toBeUndefined`, `toBeDefined` |
| **Numérico** | `toBeGreaterThan`, `toBeLessThan`, `toBeCloseTo`, `toBeGreaterThanOrEqual` |
| **String** | `toContain`, `toMatch` |
| **Array** | `toContain`, `toHaveLength`, `toContainEqual` |
| **Objeto** | `toHaveProperty`, `toMatchObject` |
| **Erro** | `toThrow`, `toThrowError` |
| **Assimétrico** | `expect.any()`, `expect.anything()`, `expect.arrayContaining()`, `expect.objectContaining()`, `expect.stringContaining()`, `expect.stringMatching()` |

## 🚀 Como Executar

```bash
npm install
npm test            # Roda todos os testes + cobertura
npm run test:verbose  # Modo verbose com descrição de cada teste
npm run test:watch   # Modo watch para desenvolvimento
```

## 💡 Conceitos-chave

- **`toBe`** usa `Object.is` (igualdade estrita por valor, não por referência para objetos)
- **`toEqual`** faz comparação profunda (deep equality) de objetos e arrays
- **`toStrictEqual`** é mais rigoroso: detecta `undefined` em propriedades e distingue instâncias de classes
- **Matchers assimétricos** (`expect.any`, `expect.objectContaining`) permitem verificações parciais muito úteis para dados dinâmicos como timestamps e UUIDs
