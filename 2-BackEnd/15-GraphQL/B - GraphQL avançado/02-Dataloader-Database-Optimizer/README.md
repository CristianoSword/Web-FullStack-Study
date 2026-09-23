# Dataloader Database Optimizer

Servidor GraphQL com Apollo Server, SQLite em memoria via `sql.js` e DataLoader agrupando leituras SQL para reduzir consultas repetidas.

## Estrutura

- `sql/schema.sql`: tabelas `authors`, `posts` e `post_metrics`.
- `sql/seed.sql`: massa inicial para consultas profundas.
- `src/database/create-database.js`: inicializa SQLite, executa schema/seed e rastreia statements SQL.
- `src/loaders/create-loaders.js`: batching de autores e metricas por `post_id`.
- `src/resolvers/index.js`: queries GraphQL e exposicao de `sqlStats`.
- `src/server.js`: Apollo Server com Express e contexto por request.
- `examples/`: queries prontas para inspecionar posts e estatisticas SQL.
- `scripts/`: consulta HTTP, health check e smoke automatizado.

## Recursos cobertos

- SQLite em memoria com SQL real
- DataLoader para batching SQL
- query tracker com `sqlStats`
- resolucao de `Post.author`
- resolucao de `Post.metric`

## Executar

```powershell
npm install
npm start
```

## Validar

```powershell
npm run validate
```
