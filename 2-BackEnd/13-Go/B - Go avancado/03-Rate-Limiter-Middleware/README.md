# Rate Limiter Middleware

Servidor HTTP em Go com middleware customizado de rate limit por IP usando token bucket em memoria.

## Estrutura

- `cmd/server/main.go`: inicializa o servidor.
- `internal/domain`: config, estado de cliente, decisão e métricas.
- `internal/service`: implementação do token bucket, refill e cleanup.
- `internal/ui`: middleware HTTP, extração de IP e rotas.

## Funcionalidades

- limite por IP com token bucket
- suporte a `X-Forwarded-For` e `X-Real-IP`
- headers `X-RateLimit-Remaining`, `X-RateLimit-Reset` e `Retry-After`
- resposta `429 Too Many Requests` em JSON
- limpeza periódica de clientes expirados
- endpoint de métricas agregadas

## Rotas

- `GET /health`
- `GET /api/ping`
- `GET /api/time`
- `GET /metrics`

## Executar

```bash
go run ./cmd/server
```

## Testes

```bash
go test ./...
```

## Exemplo

```text
GET /api/ping
X-RateLimit-Remaining: 4

GET /api/ping
...

HTTP/1.1 429 Too Many Requests
Retry-After: 5
```
