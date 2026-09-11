# Database Setup Compass

Lab de MongoDB para setup local com Docker, inicializacao automatica de colecoes e inspeção via MongoDB Compass.

## Estrutura

- `docker-compose.yml`: sobe o MongoDB localmente.
- `.env.example`: credenciais e nome do banco.
- `init/`: cria usuario, colecoes, validators, indices e seed inicial.
- `schemas/`: validadores JSON usados como referencia do modelo.
- `models/collections.json`: manifesto das colecoes do lab.
- `queries/overview.mongodb.js`: consultas iniciais para inspeção.
- `compass/`: perfil de conexao e filtros salvos para Compass.
- `scripts/`: automacoes para subir, inspecionar, parar e validar o ambiente.

## Colecoes criadas

- `products`
- `warehouses`

## Funcionalidades

- ambiente local com `mongo:8.0`
- criação automatica do banco `study_inventory`
- usuario de aplicacao com permissao `readWrite`
- validadores `$jsonSchema`
- indices unicos e indice auxiliar para consulta
- seed inicial para visualizacao imediata no Compass

## Executar

```powershell
Copy-Item .env.example .env
docker compose up -d
```

## Inspecionar

```powershell
.\scripts\inspect-lab.ps1
```

## Validacao

```powershell
node .\scripts\validate-config.mjs
docker compose config
```

## Observacao

O smoke com `docker compose up` depende do Docker Desktop estar ativo. Nesta maquina, durante a validacao, o compose foi validado com sucesso, mas o daemon do Docker nao estava em execucao para subir o container.
