# Update Operators Array

Lab de MongoDB focado em updates com operadores em documentos e arrays, incluindo arrays aninhados em `tasks.checkpoints`.

## Estrutura

- `docker-compose.yml`: sobe o Mongo local em `localhost:27020`.
- `seed/01-init.js`: cria a collection `projects`, validator, indice e seed inicial.
- `models/`: schema da collection e catalogo dos operadores cobertos.
- `queries/update-operators.mongodb.js`: updates com `$set`, `$push`, `$pull`, `$addToSet` e `$each`.
- `queries/verification.mongodb.js`: conferência final do estado dos documentos.
- `compass/`: documento exemplo e roteiro de execução no Compass.
- `scripts/`: automações para subir, inspecionar, parar e validar o projeto.

## Collection

- `project_tracker.projects`

## Operadores cobertos

- `$set`
- `$push`
- `$pull`
- `$addToSet`
- `$each`

## Executar

```powershell
docker compose up -d
```

## Validar estrutura

```powershell
node .\scripts\validate-updates.mjs
docker compose config
```

## Rodar no Compass

1. Conecte em `mongodb://localhost:27020/project_tracker`.
2. Abra `projects`.
3. Rode `queries/update-operators.mongodb.js`.
4. Compare `labels`, `members` e `tasks.checkpoints`.
5. Valide o estado final com `queries/verification.mongodb.js`.
