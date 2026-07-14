# 05-Microservices-gRPC

Conjunto de microservicos em C# usando gRPC para comunicacao entre `InventoryService` e `OrderingService`, com proto compartilhado, cliente interno e `docker-compose`.

## O que o projeto cobre

- dois servicos `.NET` separados com gRPC
- arquivos `.proto` compartilhados para inventario e pedidos
- `OrderingService` chamando `InventoryService` por cliente gRPC
- repositorios em memoria para estoque e pedidos
- interceptors para mapear validacao em `RpcException`
- `docker-compose.yml` para subir os dois servicos em conjunto

## Estrutura

```text
05-Microservices-gRPC/
|-- InventoryService/
|-- OrderingService/
|-- Shared/
|   `-- Protos/
|-- docker-compose.yml
`-- .gitignore
```

## Como usar

Quando houver .NET SDK instalado:

```bash
docker compose up --build
```

Servicos expostos:

- `InventoryService`: gRPC de estoque e `GET /health`
- `OrderingService`: gRPC de pedidos e `GET /health`

## Observacao

O host atual nao possui .NET SDK instalado, entao a validacao desta entrega foi feita por revisao estatica da estrutura, dos `.proto`, das referencias gRPC e do fluxo de chamada entre microservicos.
