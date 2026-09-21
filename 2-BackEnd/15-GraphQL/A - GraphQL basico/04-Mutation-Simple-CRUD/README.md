# Mutation Simple CRUD

Servidor GraphQL com CRUD simples de `Task` em memoria, cobrindo queries e mutations de create, update e delete.

## Estrutura

- `src/schema/typeDefs.graphql`: tipo `Task`, inputs e mutations do CRUD.
- `src/models/`: store em memoria e factory de ids.
- `src/resolvers/index.js`: queries de listagem/busca e mutations de create/update/delete.
- `src/server.js`: bootstrap do GraphQL Yoga com `/graphql` e `/health`.
- `examples/`: mutations prontas para criar, atualizar e deletar tasks.
- `scripts/`: chamada HTTP e smoke automatizado do fluxo CRUD.

## Operacoes disponiveis

- `tasks`
- `task(id: ID!)`
- `createTask(input: CreateTaskInput!)`
- `updateTask(id: ID!, input: UpdateTaskInput!)`
- `deleteTask(id: ID!)`

## Executar

```powershell
npm install
npm start
```

## Validar

```powershell
npm run validate
```
