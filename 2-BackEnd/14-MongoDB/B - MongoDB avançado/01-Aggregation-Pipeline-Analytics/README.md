# Aggregation Pipeline Analytics

Lab avançado de MongoDB para analytics com pipelines de agregação reais sobre uma collection de vendas.

## Estrutura

- `docker-compose.yml`: sobe o Mongo local em `localhost:27022`.
- `seed/01-init.js`: cria a collection `sales`, validator, índices e dataset analítico.
- `models/`: schema da venda e catálogo dos pipelines.
- `queries/revenue-by-region.mongodb.js`: receita e ticket médio por região.
- `queries/channel-category-breakdown.mongodb.js`: quebra por canal e categoria com `unwind`.
- `queries/seller-scoreboard.mongodb.js`: ranking de vendedores com `group`, `project`, `sort` e `limit`.
- `queries/verification.mongodb.js`: conferência final da collection.
- `compass/`: exemplo de documento e playbook de execução.
- `scripts/`: automações para subir, inspecionar, parar e validar o projeto.

## Collection

- `analytics_lab.sales`

## Estágios cobertos

- `$match`
- `$group`
- `$project`
- `$sort`
- `$unwind`
- `$limit`

## Executar

```powershell
docker compose up -d
```

## Validar estrutura

```powershell
node .\scripts\validate-analytics.mjs
docker compose config
```

## Rodar no Compass

1. Conecte em `mongodb://localhost:27022/analytics_lab`.
2. Abra `sales`.
3. Rode `queries/revenue-by-region.mongodb.js`.
4. Rode `queries/channel-category-breakdown.mongodb.js`.
5. Rode `queries/seller-scoreboard.mongodb.js`.
6. Confira o dataset com `queries/verification.mongodb.js`.
