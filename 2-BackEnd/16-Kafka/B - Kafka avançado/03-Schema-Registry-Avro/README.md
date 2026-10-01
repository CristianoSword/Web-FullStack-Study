# Schema Registry Avro

Servico de contratos Avro com `Fastify`, `kafkajs`, `avsc` e Schema Registry para registrar schemas, validar compatibilidade e publicar eventos no wire format da Confluent.

## Estrutura

- `docker-compose.yml`: sobe um broker Kafka local e um Schema Registry.
- `config/registry-config.json`: broker, URL do Registry, subject, topico e modo de compatibilidade.
- `schemas/*.avsc`: versoes do contrato Avro para evolucao do subject.
- `src/services/schema-registry-client.mjs`: cliente REST do Schema Registry.
- `src/services/avro-codec-service.mjs`: encode/decode com magic byte + schema id.
- `src/services/registry-avro-service.mjs`: registro de schema, checagem de compatibilidade e publish Avro.
- `src/routes/registry-routes.mjs`: endpoints para registrar schema, validar compatibilidade, publicar e decodificar.
- `scripts/*.ps1`: atalhos para subir infra, registrar versoes, publicar evento e verificar status.
- `scripts/validate-registry.mjs`: validacao estrutural do projeto.
- `examples/registry-playbook.md`: roteiro para observar a evolucao do contrato.

## Recursos cobertos

- subject versionado no Schema Registry
- compatibilidade `BACKWARD`
- registro de schema v1 e v2
- teste de compatibilidade antes do registro
- serializacao Avro no wire format da Confluent
- decode do payload usando o schema resolvido por id

## Executar

```powershell
npm install
.\scripts\run-infra.ps1
.\scripts\start-api.ps1
.\scripts\check-health.ps1
.\scripts\register-v1-schema.ps1
.\scripts\check-v2-compatibility.ps1
.\scripts\register-v2-schema.ps1
.\scripts\publish-sample.ps1
.\scripts\decode-latest.ps1
.\scripts\check-status.ps1
```

## Validar estrutura

```powershell
node .\scripts\validate-registry.mjs
docker compose config
```

## Observacao

Quando o Docker daemon local nao estiver ativo, `run-infra.ps1` falha explicitamente para separar bloqueio de infraestrutura local de problema no codigo do Registry/Avro.
