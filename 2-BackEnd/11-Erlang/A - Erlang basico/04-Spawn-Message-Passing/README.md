# Spawn Message Passing

Projeto em Erlang para demonstrar envio e recebimento de mensagens entre processos concorrentes com `spawn`, `receive` e acknowledgements.

## Objetivo

Implementar um mini fluxo de conversa entre peers concorrentes:

- cada peer roda em seu proprio processo
- mensagens possuem remetente, destinatario e corpo
- entregas geram ack explicito
- snapshots permitem inspecionar a inbox de cada peer
- erros de destinatario incorreto sao reportados sem perder o processo

## Estrutura

- `src/spawn_message.hrl`: records compartilhados
- `src/spawn_message_types.erl`: tipos exportados
- `src/spawn_message_passing.erl`: logica de peers, entrega, parada e testes
- `scripts/run_demo.erl`: demo para execucao em `noshell`
- `scripts/run_demo.bat`: helper de compilacao e execucao no Windows

## Fluxo implementado

- `start_peer/1` sobe um peer com inbox local
- `new_message/3` valida e monta o payload
- `send_message/2` entrega a mensagem e aguarda ack ou erro
- `peer_inbox/1` consulta o estado do processo remoto
- `stop_peer/1` encerra o peer com confirmacao
- `conversation_demo/0` executa uma troca completa entre Alice e Bob

## Como executar

```powershell
erlc -o ebin src\spawn_message_passing.erl src\spawn_message_types.erl
erlc -I src -pa ebin -o ebin scripts\run_demo.erl
erl -pa ebin -noshell -s run_demo main
```

Ou no Windows:

```powershell
scripts\run_demo.bat
```

## Testes

```powershell
erl -pa ebin -noshell -eval "eunit:test(spawn_message_passing, [verbose]), init:stop()."
```

Os testes cobrem:

- conversa completa entre dois peers
- erro de destinatario incorreto
- validacao de mensagem e de envio
