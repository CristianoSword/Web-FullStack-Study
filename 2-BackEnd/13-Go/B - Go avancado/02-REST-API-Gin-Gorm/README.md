# REST API Gin Gorm

API REST de tarefas usando `Gin`, `GORM` e `SQLite`, com CRUD completo e filtros por query string.

## Estrutura

- `cmd/api/main.go`: inicializacao do servidor.
- `internal/domain`: entidades, payloads e respostas.
- `internal/service`: persistencia e regras de negocio via GORM.
- `internal/ui`: rotas HTTP com Gin.
- `data/tasks.db`: banco SQLite criado em runtime.

## Rotas

- `GET /health`
- `GET /tasks`
- `POST /tasks`
- `GET /tasks/:id`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

## Filtros

- `status`
- `priority`
- `owner`

## Executar

```bash
go run ./cmd/api
```

## Testes

```bash
go test ./...
```

## Exemplo

```bash
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Ship backend\",\"description\":\"Finish Gin API\",\"status\":\"todo\",\"priority\":\"high\",\"owner\":\"Cristiano\"}"
```
