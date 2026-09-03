# Structs Interfaces OOP

Sistema de biblioteca em Go modelado com structs, interfaces, serviços e repositório em memória.

## Features

- Entidades `Book`, `Member` e `Loan` com comportamento orientado a métodos
- Interfaces para `Borrowable`, `NotificationSender` e `LibraryRepository`
- Serviço de biblioteca com regras de empréstimo, devolução e limite por membro
- Repositório em memória com catálogo inicial e busca textual
- Notificações simples por writer para recibos de empréstimo e devolução
- CLI com comandos de listagem, busca, empréstimo e devolução
- Testes automatizados da lógica de negócio e da transcript da interface

## Estrutura

```text
cmd/library/main.go
internal/
  domain/
    book.go
    interfaces.go
    loan.go
    member.go
  repository/
    memory.go
  service/
    library.go
    library_test.go
    notifier.go
  ui/
    app.go
    app_test.go
examples/commands.txt
go.mod
```

## Como executar

```bash
go run ./cmd/library
```

## Comandos

- `list-books`
- `list-members`
- `list-loans`
- `search clean code`
- `borrow bk-100 mb-001`
- `return loan-001`
- `help`
- `exit`

## Como testar

```bash
go test ./...
```

Validado localmente com `go1.26.0`, incluindo regras de empréstimo, devolução e fluxo completo da CLI da biblioteca.
