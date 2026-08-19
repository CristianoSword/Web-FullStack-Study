# Erlang Rebar3 Setup

Projeto OTP source-complete com estrutura real de `rebar3`, pronto para bootstrap e compilacao quando a ferramenta estiver instalada.

## Objetivo

Montar um app Erlang com estrutura real de projeto `rebar3`:

- `rebar.config` com configuracao de build
- `app.src` declarando a aplicacao OTP
- supervision tree minima
- `gen_server` de exemplo para bootstrap report
- script de demo e testes EUnit

## Estrutura

- `rebar.config`: configuracao do projeto `rebar3`
- `src/rebar3_setup.app.src`: manifesto OTP
- `src/rebar3_setup_app.erl`: callback da aplicacao
- `src/rebar3_setup_sup.erl`: supervisor raiz
- `src/rebar3_setup_service.erl`: servico `gen_server` com report de bootstrap
- `src/rebar3_setup.hrl`: records compartilhados
- `scripts/run_demo.erl`: execucao sem shell interativo

## O que foi implementado

- targets de bootstrap tipados via records
- report consolidado do app com modulos e notas
- validacao estatica de modulos duplicados
- supervisor com worker real apontando para o servico
- demo que sobe o servico, imprime o report e encerra

## Como validar sem `rebar3`

Como `rebar3` nao esta instalado neste host, a validacao local foi feita por compilacao direta dos modulos OTP:

```powershell
erlc -o ebin src\rebar3_setup_app.erl src\rebar3_setup_sup.erl src\rebar3_setup_service.erl src\rebar3_setup_types.erl
erlc -I src -pa ebin -o ebin scripts\run_demo.erl
erl -pa ebin -noshell -s run_demo main
```

## Quando houver `rebar3`

```powershell
rebar3 compile
rebar3 eunit
```

## Testes

```powershell
erl -pa ebin -noshell -eval "eunit:test(rebar3_setup_service, [verbose]), init:stop()."
```
