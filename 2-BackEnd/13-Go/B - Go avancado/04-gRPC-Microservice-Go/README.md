# gRPC Microservice Go

Microservico de autenticacao em Go usando `gRPC` e `Protobuf`, com servidor, cliente CLI e testes de integracao via `bufconn`.

## Estrutura

- `api/proto/auth.proto`: contrato Protobuf do servico.
- `internal/pb`: bindings Go para mensagens e servico gRPC.
- `internal/domain`: modelos de usuario e sessao.
- `internal/service`: autenticacao, emissao e validacao de token.
- `internal/ui`: implementacao do servidor gRPC.
- `cmd/server`: servidor gRPC.
- `cmd/client`: cliente CLI para testar login e validacao.

## RPCs

- `Login`
- `ValidateToken`

## Executar servidor

```bash
go run ./cmd/server
```

## Executar cliente

```bash
go run ./cmd/client -mode login -username admin -password admin123
go run ./cmd/client -mode validate -token <token>
```

## Testes

```bash
go test ./...
```

## Detalhes

- contrato `.proto` real
- bindings protobuf compilaveis sem `protoc` instalado localmente
- expiracao de token em memoria
- testes de servico e integracao gRPC usando `bufconn`
