# Go Syntax CLI

Calculadora interativa em Go via CLI para praticar variaveis, condicionais, loops, slices e tratamento de erro.

## Features

- REPL interativa com leitura continua por `stdin`
- Operacoes `add`, `sub`, `mul`, `div`, `mod`, `pow` e `avg`
- Parser de comandos separado da engine matematica
- Historico de calculos e estatisticas da sessao
- Comandos utilitarios `history`, `stats`, `clear`, `help` e `exit`
- Testes automatizados do parser, da engine e da transcript da REPL

## Estrutura

```text
cmd/calculator/main.go
internal/
  domain/
    command.go
    operation.go
    session.go
  engine/
    calculator.go
    calculator_test.go
    session.go
  parser/
    parser.go
    parser_test.go
  ui/
    repl.go
    repl_test.go
examples/session.txt
go.mod
```

## Como executar

```bash
go run ./cmd/calculator
```

## Comandos

- `add 10 5 3`
- `sub 12 2`
- `mul 4 8`
- `div 20 5`
- `mod 20 3`
- `pow 2 8`
- `avg 5 10 15`
- `history`
- `stats`
- `clear`
- `help`
- `exit`

## Como testar

```bash
go test ./...
```

Validado localmente com `go1.26.0`, cobrindo parser, calculos e fluxo completo da interface de linha de comando.
