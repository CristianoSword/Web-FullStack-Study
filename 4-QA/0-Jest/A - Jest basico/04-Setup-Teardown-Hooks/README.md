# 04-Setup-Teardown-Hooks

Laboratório de **hooks de ciclo de vida do Jest**: `beforeAll`, `afterAll`, `beforeEach` e `afterEach`.

## 📋 O que é

Hooks permitem preparar e limpar o estado do ambiente de testes de forma controlada. Sem eles, testes compartilham estado acidentalmente — criando dependências entre testes e resultados não-determinísticos.

## 🏗️ Estrutura

```
04-Setup-Teardown-Hooks/
├── src/
│   ├── db/user-repository.js     # Repositório em memória (simula banco de dados)
│   └── services/user-service.js  # Camada de negócio com regras de unicidade
└── tests/
    └── hooks.test.js             # Demonstração de todos os 4 hooks
```

## 🔄 Quando usar cada Hook

| Hook | Execução | Uso ideal |
|---|---|---|
| `beforeAll` | 1x antes do describe | Conectar ao banco, iniciar servidor, carregar fixtures |
| `afterAll` | 1x depois do describe | Desconectar, fechar conexões, limpar arquivos gerados |
| `beforeEach` | Antes de CADA test | Reset de estado, criar mocks, seeds isoladas |
| `afterEach` | Depois de CADA test | Limpar mocks (`jest.clearAllMocks()`), desfazer side effects |

## ⚠️ Regra de Ouro

Prefira **`beforeEach`** + **`afterEach`** para garantir **isolamento total** entre testes.  
`beforeAll` é eficiente mas exige que os testes **não compartilhem estado mutável**.

```
describe
  └── beforeAll (1x)
        └── beforeEach → test 1 → afterEach
        └── beforeEach → test 2 → afterEach
        └── beforeEach → test 3 → afterEach
  └── afterAll (1x)
```

## 🚀 Como Executar

```bash
npm install
npm test
```
