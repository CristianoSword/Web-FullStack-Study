# 03-Asynchronous-Code-Testing

Laboratório de **testes de código assíncrono com Jest**, cobrindo os cinco padrões principais usados em projetos Node.js reais.

## 📋 O que é

Em código real, boa parte das operações são assíncronas (chamadas de API, banco de dados, sistema de arquivos). Testar código assíncrono sem os padrões corretos gera **falsos positivos silenciosos** — o teste passa sem verificar absolutamente nada.

## 🏗️ Estrutura

```
03-Asynchronous-Code-Testing/
├── src/
│   ├── models/response-models.js   # Tipos de resposta (Task, AuthResponse)
│   └── services/api-service.js     # Serviço com Promises, async/await e callbacks
├── tests/
│   ├── async.test.js               # 5 padrões de teste assíncrono
│   └── async-pitfalls.test.js      # Armadilhas e expect.assertions
└── package.json
```

## 🧪 Padrões Cobertos

| # | Padrão | Quando usar |
|---|---|---|
| 1 | **Retorno de Promise** (`return fetchX().then(...)`) | Legado, compatibilidade |
| 2 | **`.resolves` / `.rejects` inline** | Asserção concisa em linha |
| 3 | **`async/await` com `try/catch`** | Padrão moderno recomendado |
| 4 | **`Promise.all` paralelo** | Múltiplas operações simultâneas |
| 5 | **Callback com `done()`** | APIs Node.js antigas |

## ⚠️ Armadilha Clássica

```js
// ❌ ERRADO — este teste SEMPRE passa, mesmo se a promise falhar
test('falso positivo', () => {
  fetchTaskById(1).then((task) => {
    expect(task.id).toBe(1); // nunca é avaliado!
  });
});

// ✅ CORRETO — retornar a promise ou usar async/await
test('correto', async () => {
  const task = await fetchTaskById(1);
  expect(task.id).toBe(1);
});
```

Use `expect.assertions(N)` para garantir que o número certo de asserções foi executado.

## 🚀 Como Executar

```bash
npm install
npm test
npm run test:verbose
```
