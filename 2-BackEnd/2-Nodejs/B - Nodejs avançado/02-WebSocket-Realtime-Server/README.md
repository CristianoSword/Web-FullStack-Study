# 02-WebSocket-Realtime-Server

Servidor de estudo para salas em tempo real com fluxo de entrada, broadcast e validacao.

## Partes principais

- `src/server.js`: servidor HTTP base.
- `src/handlers/socket-handler.js`: ciclo de vida da conexao.
- `src/services/realtime-hub.js`: gestao das salas e broadcast.
- `src/validators/message-validator.js`: saneamento das mensagens recebidas.

## Fluxo

- cliente entra em `general` por padrao;
- cada mensagem pode redefinir a sala atual;
- mensagens invalidas sao rejeitadas antes do broadcast.
