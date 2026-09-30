# Kafka REST Bridge

API REST com Fastify integrada ao Kafka via `kafkajs` para publicar eventos em topico e consultar o estado atual do bridge.

## Estrutura

- `docker-compose.yml`: sobe um broker Kafka local em KRaft.
- `config/bridge-config.json`: broker, porta HTTP, topico e nome do bridge.
- `models/*.schema.json`: contratos do payload de publicacao e da resposta de status.
- `src/server.mjs`: inicializa Fastify, produtor Kafka e bootstrap do topico.
- `src/services/bridge-service.mjs`: cria topico, publica eventos e mantem status em memoria.
- `src/routes/bridge-routes.mjs`: endpoints `GET /health`, `GET /status` e `POST /events`.
- `scripts/*.ps1`: atalhos para broker, API, healthcheck, status e publish sample.
- `scripts/validate-bridge.mjs`: validacao estrutural do projeto.
- `examples/bridge-playbook.md`: fluxo guiado de uso.

## Recursos cobertos

- bridge REST -> Kafka com Fastify
- bootstrap automatico do topico na subida da API
- publicacao de evento com particao opcional
- retorno de status com total publicado e eventos recentes
- validacao de particao fora do range do topico
- shutdown limpo da API e do produtor Kafka

## Executar

```powershell
npm install
.\scripts\run-broker.ps1
.\scripts\start-api.ps1
.\scripts\check-health.ps1
.\scripts\publish-sample.ps1
.\scripts\check-status.ps1
```

## Validar estrutura

```powershell
node .\scripts\validate-bridge.mjs
docker compose config
```

## Observacao

Quando o Docker daemon local nao estiver ativo, `run-broker.ps1` falha explicitamente para diferenciar erro de infraestrutura local de problema no codigo do bridge.
