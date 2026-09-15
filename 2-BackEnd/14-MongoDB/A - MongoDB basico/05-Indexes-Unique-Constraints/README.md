# Indexes Unique Constraints

Lab de MongoDB focado em criação de índices simples, compostos e restrições únicas para evitar duplicidade de documentos.

## Estrutura

- `docker-compose.yml`: sobe o Mongo local em `localhost:27021`.
- `seed/01-init.js`: cria collection, validator, índices e seed inicial.
- `models/`: schema da collection e catálogo dos índices planejados.
- `queries/indexes.mongodb.js`: inspeção de índices e `explain("executionStats")`.
- `queries/duplicate-check.mongodb.js`: prova prática das restrições únicas.
- `compass/`: documento exemplo e roteiro de execução no Compass.
- `scripts/`: automações para subir, inspecionar, parar e validar o projeto.

## Collection

- `inventory_catalog.suppliers`

## Índices criados

- `supplier_code_unique`
- `supplier_email_unique`
- `country_city_category_lookup`

## Executar

```powershell
docker compose up -d
```

## Validar estrutura

```powershell
node .\scripts\validate-indexes.mjs
docker compose config
```

## Rodar no Compass

1. Conecte em `mongodb://localhost:27021/inventory_catalog`.
2. Abra `suppliers`.
3. Revise a aba `Indexes`.
4. Rode `queries/indexes.mongodb.js`.
5. Rode `queries/duplicate-check.mongodb.js` para confirmar os bloqueios.
