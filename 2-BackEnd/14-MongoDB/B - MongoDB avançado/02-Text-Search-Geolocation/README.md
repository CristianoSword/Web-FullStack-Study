# Text Search Geolocation

Lab avancado de MongoDB para buscas textuais com relevancia e consultas geoespaciais reais usando `$near`.

## Estrutura

- `docker-compose.yml`: sobe o Mongo local em `localhost:27023`.
- `seed/01-init.js`: cria a collection `venues`, validator, indices e dataset de lugares.
- `models/`: schema da venue e catalogo das estrategias de busca.
- `queries/text-search.mongodb.js`: busca textual com `$text` e ordenacao por `textScore`.
- `queries/geolocation.mongodb.js`: consulta venues proximos de Sao Paulo com `$near`.
- `queries/verification.mongodb.js`: conferencia final dos documentos e indices.
- `compass/`: exemplo de documento e playbook de execucao.
- `scripts/`: automacoes para subir, inspecionar, parar e validar o projeto.

## Collection

- `places_directory.venues`

## Recursos cobertos

- text index
- `2dsphere`
- `$text`
- `textScore`
- `$near`
- `$maxDistance`

## Executar

```powershell
docker compose up -d
```

## Validar estrutura

```powershell
node .\scripts\validate-search.mjs
docker compose config
```

## Rodar no Compass

1. Conecte em `mongodb://localhost:27023/places_directory`.
2. Abra a collection `venues`.
3. Rode `queries/text-search.mongodb.js`.
4. Rode `queries/geolocation.mongodb.js`.
5. Confira dataset e indices com `queries/verification.mongodb.js`.
