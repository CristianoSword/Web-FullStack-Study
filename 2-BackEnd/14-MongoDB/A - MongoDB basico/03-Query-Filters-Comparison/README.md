# Query Filters Comparison

Lab de MongoDB focado em filtros refinados com operadores logicos e comparativos sobre uma collection `orders`.

## Estrutura

- `docker-compose.yml`: sobe o Mongo local em `localhost:27019`.
- `seed/01-init.js`: cria a collection, validator, indices e dataset inicial.
- `models/`: schema e catalogo de operadores cobertos.
- `queries/comparison.mongodb.js`: consultas com `$and`, `$or`, `$gt`, `$gte`, `$lt`, `$lte` e `$in`.
- `queries/verification.mongodb.js`: conferência final da collection.
- `compass/`: documento exemplo e playbook de uso.
- `scripts/`: automações para subir, inspecionar, parar e validar o projeto.

## Collection

- `sales_analytics.orders`

## Operadores cobertos

- `$and`
- `$or`
- `$gt`
- `$gte`
- `$lt`
- `$lte`
- `$in`

## Executar

```powershell
docker compose up -d
```

## Validar estrutura

```powershell
node .\scripts\validate-filters.mjs
docker compose config
```

## Rodar no Compass

1. Conecte em `mongodb://localhost:27019/sales_analytics`.
2. Abra `orders`.
3. Rode `queries/comparison.mongodb.js`.
4. Revise o estado final com `queries/verification.mongodb.js`.
