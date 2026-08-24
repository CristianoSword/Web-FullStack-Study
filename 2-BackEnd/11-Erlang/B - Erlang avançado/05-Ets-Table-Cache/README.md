# ETS Table Cache

Projeto OTP em Erlang para cache em memória de alta velocidade usando ETS com TTL e métricas.

## Objetivo

Implementar um cache real em memória com:

- tabela ETS nomeada e concorrente
- escrita de entradas com TTL
- leitura com hit/miss tracking
- remoção manual e eviction de expirados
- métricas simples de uso

## Estrutura

- `src/ets_cache.app.src`: manifesto OTP
- `src/ets_cache_app.erl`: callback da aplicação
- `src/ets_cache_sup.erl`: supervisor do serviço
- `src/ets_cache_service.erl`: operações de cache sobre ETS
- `test/ets_cache_service_tests.erl`: testes EUnit
- `scripts/run_demo.erl`: demo do cache com expiração real

## Funcionalidades

- `put/3`: grava item com TTL em segundos
- `get/1`: busca item e contabiliza hit ou miss
- `delete/1`: remove item por chave
- `list_keys/0`: lista as chaves atuais
- `metrics/0`: retorna hits, misses, writes e deletes
- `evict_expired/0`: limpa entradas expiradas da ETS

## Como executar

```powershell
erlc -o ebin src\ets_cache_app.erl src\ets_cache_sup.erl src\ets_cache_service.erl src\ets_cache_types.erl
erlc -I src -pa ebin -o ebin scripts\run_demo.erl
erl -pa ebin -noshell -s run_demo main
```

## Testes

```powershell
erlc -I src -pa ebin -o ebin test\ets_cache_service_tests.erl
erl -pa ebin -noshell -eval "eunit:test(ets_cache_service_tests, [verbose]), init:stop()."
```

## Validação local

A demo grava duas entradas, confirma um hit, espera a expiração do token e mostra as métricas do cache em seguida. Os testes cobrem TTL, eviction e validação de entrada.
