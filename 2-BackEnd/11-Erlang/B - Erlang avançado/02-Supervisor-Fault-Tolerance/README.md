# Supervisor Fault Tolerance

Projeto OTP em Erlang para demonstrar supervisao e reinicio automatico de workers com falha.

## Objetivo

Simular uma arquitetura OTP que resiste a falhas de processo:

- worker supervisionado por `supervisor`
- crash intencional disparado por chamada controlada
- reinicio automatico com novo PID
- contador persistente de crashes
- observacao do estado antes e depois da falha

## Estrutura

- `src/fault_tolerance.app.src`: manifesto OTP
- `src/fault_tolerance_app.erl`: callback da aplicacao
- `src/fault_tolerance_sup.erl`: supervisor `one_for_one`
- `src/fault_tolerance_worker.erl`: worker `gen_server`
- `src/fault_tolerance_control.erl`: modulo de controle, observacao e testes
- `scripts/run_demo.erl`: demonstracao de crash e restart

## Fluxo implementado

- `ping/0` incrementa heartbeat do worker
- `status/0` retorna o estado atual
- `crash/0` derruba o worker com erro simulado
- `crash_and_wait_restart/0` observa o restart e gera um `restart_report`
- `reset_metrics/0` limpa o contador persistente para testes

## Como executar

```powershell
erlc -o ebin src\fault_tolerance_app.erl src\fault_tolerance_sup.erl src\fault_tolerance_worker.erl src\fault_tolerance_control.erl src\fault_tolerance_types.erl
erlc -I src -pa ebin -o ebin scripts\run_demo.erl
erl -pa ebin -noshell -s run_demo main
```

## Testes

```powershell
erl -pa ebin -noshell -eval "eunit:test(fault_tolerance_control, [verbose]), init:stop()."
```

## Observacao importante

Os `ERROR REPORT` e `SUPERVISOR REPORT` exibidos durante a demo e os testes sao esperados neste projeto. Eles fazem parte da prova de que o worker caiu de verdade e foi reiniciado automaticamente pelo supervisor.
