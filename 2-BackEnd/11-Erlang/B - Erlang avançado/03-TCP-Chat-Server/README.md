# TCP Chat Server

Projeto em Erlang para chat concorrente sobre `gen_tcp` com multiplos clientes.

## Objetivo

Implementar um chat TCP simples, mas real, com:

- listener baseado em `gen_tcp`
- sessao independente por conexao
- sala central para broadcast
- historico recente de mensagens
- entrada e saida de usuarios com notificacoes

## Estrutura

- `src/tcp_chat.app.src`: manifesto OTP
- `src/tcp_chat_app.erl`: callback da aplicacao
- `src/tcp_chat_sup.erl`: supervisor da sala de chat
- `src/tcp_chat_room.erl`: gerencia clientes e historico
- `src/tcp_chat_listener.erl`: aceita conexoes TCP
- `src/tcp_chat_session.erl`: loop por cliente conectado
- `test/tcp_chat_room_tests.erl`: testes EUnit da sala
- `scripts/run_demo.erl`: demo automatizada com dois clientes locais

## Fluxo implementado

- cliente conecta e informa nickname
- sala registra o usuario se o nickname for valido e unico
- mensagens sao difundidas para todos os clientes conectados
- `/quit` encerra a sessao
- historico mantem as ultimas 50 mensagens

## Como executar

```powershell
erlc -o ebin src\tcp_chat_app.erl src\tcp_chat_sup.erl src\tcp_chat_room.erl src\tcp_chat_listener.erl src\tcp_chat_session.erl src\tcp_chat_types.erl
erlc -I src -pa ebin -o ebin scripts\run_demo.erl
erl -pa ebin -noshell -s run_demo main
```

## Testes

```powershell
erlc -I src -pa ebin -o ebin test\tcp_chat_room_tests.erl
erl -pa ebin -noshell -eval 'eunit:test({module, tcp_chat_room_tests}, [verbose]), init:stop().'
```

## Resultado da demo

A demonstracao conecta `alice` e `bob` localmente, confirma o aviso de entrada e verifica o broadcast de `hello from alice` para o segundo cliente.
