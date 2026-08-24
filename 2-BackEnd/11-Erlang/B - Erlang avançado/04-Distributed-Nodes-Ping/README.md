# Distributed Nodes Ping

Projeto OTP em Erlang para subir nós distribuídos locais e testar comunicação real entre eles.

## Objetivo

Demonstrar distribuicao Erlang real entre processos separados:

- inicializacao do no de origem com `net_kernel`
- subida de dois nós externos locais
- descoberta via `epmd`
- `rpc:call/4` remoto entre os nós filhos
- `net_adm:ping/1` bidirecional com resultado `pong`

## Estrutura

- `src/distributed_ping.app.src`: manifesto OTP
- `src/distributed_ping_app.erl`: callback da aplicacao
- `src/distributed_ping_sup.erl`: supervisor do servico
- `src/distributed_ping_service.erl`: orquestracao dos nós e validacao do report
- `scripts/run_demo.erl`: demo do cluster local

## Como funciona

- o servico garante `epmd` e distribuicao no nó de origem
- dois processos `erl.exe` externos sao abertos via `open_port`
- o no `alpha` executa ping para `beta`
- o no `beta` executa ping para `alpha`
- o report consolida peers e resultados

## Como executar

```powershell
erlc -o ebin src\distributed_ping_app.erl src\distributed_ping_sup.erl src\distributed_ping_service.erl src\distributed_ping_types.erl
erlc -I src -pa ebin -o ebin scripts\run_demo.erl
erl -pa ebin -noshell -s run_demo main
```

## Testes

```powershell
erl -pa ebin -noshell -eval 'eunit:test({module, distributed_ping_service}, [verbose]), init:stop().'
```

## Validacao local

No host atual, a demo foi validada com dois nós locais nomeados e ambos os pings retornaram `pong`.
