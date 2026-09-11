# Message Queue Consumer Kafka

Bridge de mensageria em Go com produtor e consumidor para `Kafka` e `RabbitMQ`, mais broker mock para smoke e testes locais.

## Estrutura

- `docker-compose.yml`: stack local com Kafka, Zookeeper e RabbitMQ.
- `internal/domain`: eventos, config, contratos e resultado de entrega.
- `internal/service`: carregamento de JSONL, publish batch e consumo com retry.
- `internal/transport/kafka`: producer e consumer com `segmentio/kafka-go`.
- `internal/transport/rabbitmq`: producer e consumer com `amqp091-go`.
- `internal/transport/mock`: broker em memoria para smoke e testes.
- `internal/ui`: CLI de publish e consume.
- `cmd/bridge`: entrypoint da ferramenta.

## Funcionalidades

- leitura de eventos via `jsonl`
- publicacao assincrona em Kafka
- publicacao assincrona em RabbitMQ
- consumo com handler e retry
- broker mock para desenvolvimento local
- compose com infraestrutura dos dois brokers

## Subir infraestrutura

```bash
docker compose up -d
```

## Executar

```bash
go run ./cmd/bridge -broker mock -mode publish -file examples/events.jsonl
go run ./cmd/bridge -broker mock -mode consume -file examples/events.jsonl
go run ./cmd/bridge -broker kafka -mode publish -address localhost:9092 -topic events
go run ./cmd/bridge -broker rabbitmq -mode publish -address amqp://guest:guest@localhost:5672/ -topic events
```

## Testes

```bash
go test ./...
```
