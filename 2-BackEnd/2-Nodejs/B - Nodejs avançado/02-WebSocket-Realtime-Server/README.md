# 02-WebSocket-Realtime-Server

Servidor WebSocket real com `ws`, salas, broadcast e validacao de payload.

## Partes principais

- `src/server.js`: servidor HTTP com rota `GET /health` e bootstrap do socket server.
- `src/handlers/socket-handler.js`: ciclo de vida da conexao e troca de sala.
- `src/services/realtime-hub.js`: gestao das salas, historico curto e broadcast.
- `src/validators/message-validator.js`: saneamento das mensagens recebidas.

## Fluxo

- cliente entra em `general` por padrao;
- cada mensagem pode mover o cliente para outra sala;
- mensagens invalidas retornam erro para o socket sem derrubar a conexao.
