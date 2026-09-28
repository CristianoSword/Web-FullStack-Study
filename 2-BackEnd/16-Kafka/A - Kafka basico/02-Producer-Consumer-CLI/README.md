# Producer Consumer CLI

CLI de producer e consumer Kafka com `kafkajs`, serializacao JSON e scripts para bootstrap do topico e inspecao local.

## Estrutura

- `docker-compose.yml`: sobe um broker Kafka local em modo KRaft para o lab.
- `config/topic-config.json`: broker, topico, grupo de consumo e metadata do stream.
- `models/cli-event.schema.json`: contrato JSON do payload trafegado.
- `src/cli/producer.mjs`: envia mensagens JSON para o topico configurado.
- `src/cli/consumer.mjs`: consome mensagens, desserializa e imprime offsets/metadados.
- `src/lib/`: utilitarios de config, cliente Kafka e normalizacao do evento.
- `scripts/`: subir broker, bootstrap do topico, produzir sample, consumir stream e validar estrutura.
- `examples/`: evento JSON de exemplo e playbook operacional.

## Fluxo coberto

- broker local em `localhost:39092`
- criacao do topico `cli.events.v1`
- producer CLI com `kafkajs`
- consumer CLI com group `cli-events-consumers`
- serializacao e desserializacao JSON

## Executar

```powershell
npm install
.\scripts\run-broker.ps1
.\scripts\bootstrap-topic.ps1
.\scripts\consume-stream.ps1
.\scripts\produce-sample.ps1
```

## Validar estrutura

```powershell
node .\scripts\validate-cli.mjs
docker compose config
```
