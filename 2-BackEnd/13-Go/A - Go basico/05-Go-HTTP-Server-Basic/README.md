# Go HTTP Server Basic

Servidor HTTP JSON em Go usando apenas `net/http`, com rotas de healthcheck e catalogo de livros.

## Estrutura

- `cmd/server/main.go`: inicializa o servidor e carrega dados seed.
- `internal/domain`: modelos e payloads JSON.
- `internal/service`: catalogo em memoria com validacao.
- `internal/ui`: handlers e serializacao HTTP.

## Rotas

- `GET /health`
- `GET /books`
- `POST /books`
- `GET /books/{id}`

## Executar

```bash
go run ./cmd/server
```

## Testes

```bash
go test ./...
```

## Exemplo de request

```bash
curl -X POST http://localhost:8080/books \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Go Patterns\",\"author\":\"Cristiano\",\"category\":\"backend\",\"description\":\"Study project\"}"
```
