# Profiling Playbook

1. Conecte em `mongodb://localhost:27028/perf_lab`.
2. Rode `queries/explain-without-index.mongodb.js` e observe `COLLSCAN` em `executionStats`.
3. Rode `queries/explain-with-index.mongodb.js` e compare a troca para `IXSCAN`.
4. Rode `queries/explain-sorted-range.mongodb.js` para inspecionar consulta seletiva com sort alinhado ao indice.
5. Rode `queries/verification.mongodb.js` para conferir dataset e indices ativos.
