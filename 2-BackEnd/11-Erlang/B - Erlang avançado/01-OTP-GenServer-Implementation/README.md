# OTP GenServer Implementation

Projeto OTP em Erlang para controle concorrente de transacoes usando `gen_server`.

## Objetivo

Construir um ledger transacional em memoria com semantica OTP:

- contas registradas por ID binario
- deposito, saque e transferencia entre contas
- processamento de lotes transacionais
- estado serializado dentro de um `gen_server`
- supervisor raiz para iniciar o worker principal

## Estrutura

- `rebar.config`: configuracao base do projeto
- `src/otp_genserver.app.src`: manifesto da aplicacao OTP
- `src/otp_genserver_app.erl`: callback da aplicacao
- `src/otp_genserver_sup.erl`: supervisor principal
- `src/otp_genserver_ledger.erl`: `gen_server` do ledger
- `src/otp_genserver.hrl`: records de conta, transacao e snapshot
- `scripts/run_demo.erl`: demonstracao `noshell`

## Regras implementadas

- IDs de conta devem ser binarios nao vazios
- saldo inicial nao pode ser negativo
- depositos, saques e transferencias exigem valor positivo
- transferencias para a mesma conta sao bloqueadas
- batches invalidos falham com motivo explicito

## Como executar

```powershell
erlc -o ebin src\otp_genserver_app.erl src\otp_genserver_sup.erl src\otp_genserver_ledger.erl src\otp_genserver_types.erl
erlc -I src -pa ebin -o ebin scripts\run_demo.erl
erl -pa ebin -noshell -s run_demo main
```

## Testes

```powershell
erl -pa ebin -noshell -eval "eunit:test(otp_genserver_ledger, [verbose]), init:stop()."
```

## Resultado da demo

A demonstracao cria tres contas, executa deposito, saque, transferencia e um batch, retornando o snapshot final do ledger com `processed = 5`.
