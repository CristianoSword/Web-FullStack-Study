# Performance Profiling Explain

Lab avancado de MongoDB para analise de gargalos e otimizacao de queries com `explain("executionStats")`.

## Estrutura

- `docker-compose.yml`: sobe o Mongo local em `localhost:27028`.
- `seed/01-init.js`: cria a collection `events`, indices compostos e um dataset com 1200 eventos.
- `models/`: schema da collection e catalogo dos cenarios de profiling.
- `queries/explain-without-index.mongodb.js`: remove o indice composto e exibe o plano degradado.
- `queries/explain-with-index.mongodb.js`: recria o indice e compara a melhora do plano.
- `queries/explain-sorted-range.mongodb.js`: avalia range query com sort alinhado ao indice.
- `queries/verification.mongodb.js`: confere dataset, indices e distribuicao de duracao.
- `compass/`: exemplo de documento e playbook de execucao.
- `scripts/`: automacoes para subir, inspecionar, parar e validar o lab.

## Collection

- `perf_lab.events`

## Recursos cobertos

- `explain("executionStats")`
- comparacao entre `COLLSCAN` e `IXSCAN`
- indices compostos
- range query com sort
- analise de seletividade

## Executar

```powershell
docker compose up -d
```

## Validar estrutura

```powershell
node .\scripts\validate-profiling.mjs
docker compose config
```

## Compass

1. Conecte em `mongodb://localhost:27028/perf_lab`.
2. Rode `queries/explain-without-index.mongodb.js`.
3. Rode `queries/explain-with-index.mongodb.js`.
4. Rode `queries/explain-sorted-range.mongodb.js`.
5. Confira o dataset com `queries/verification.mongodb.js`.
