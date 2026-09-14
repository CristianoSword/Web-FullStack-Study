# CRUD Documents

Lab de CRUD basico em MongoDB com uma collection `customers`, seed inicial e scripts prontos para testar insercao, leitura, atualizacao e exclusao.

## Estrutura

- `docker-compose.yml`: sobe o MongoDB local em `localhost:27018`.
- `seed/01-init.js`: cria collection, validator, indice unico e documentos iniciais.
- `models/`: schema e mapa da collection.
- `queries/`: scripts `mongosh` para CRUD e verificacao final.
- `compass/`: documento exemplo e roteiro de execucao no Compass.
- `scripts/`: automacoes para subir, inspecionar, parar e validar o projeto.

## Collection

- `customer_crm.customers`

## Operacoes cobertas

- `insertOne`
- `find`
- `updateOne`
- `deleteOne`

## Executar

```powershell
docker compose up -d
```

## Rodar validacao estrutural

```powershell
node .\scripts\validate-crud.mjs
docker compose config
```

## Rodar no Compass

1. Conecte em `mongodb://localhost:27018/customer_crm`.
2. Abra a collection `customers`.
3. Rode `queries/crud.mongodb.js`.
4. Confirme o estado final com `queries/verification.mongodb.js`.
