# Laravel Websockets Chat

Projeto didatico de chat em tempo real com salas privadas, presenca de participantes e transcript local, pensado como base para evoluir com Laravel Echo e broadcasting.

## Objetivo

Modelar os blocos principais de um chat privado:

- catalogo de salas
- participantes e presenca
- historico de mensagens
- composer de mensagem validado
- persistencia local de transcript

## Funcionalidades

- Dashboard com salas privadas e presence channels
- Lista de participantes por sala
- Timeline de mensagens por canal
- Formulario para publicar nova mensagem
- Persistencia local em JSON

## Estrutura

```text
03-Laravel-Websockets-Chat/
├── app/
│   ├── Contracts/
│   │   └── ChatCatalog.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── ChatController.php
│   │   └── Requests/
│   │       └── SendChatMessageRequest.php
│   ├── Models/
│   │   ├── ChatMessage.php
│   │   ├── ChatParticipant.php
│   │   └── ChatRoom.php
│   └── Support/
│       ├── ChatTranscriptStore.php
│       ├── ChatWorkspace.php
│       └── ConfigChatCatalog.php
├── config/chat.php
├── public/css/site.css
├── resources/views/
│   ├── layouts/app.blade.php
│   └── pages/chat.blade.php
└── routes/web.php
```

## Como evoluir para realtime real

1. Trocar `ChatTranscriptStore` por eventos broadcast.
2. Integrar canais privados e presence com autenticao real.
3. Publicar eventos via Pusher ou WebSockets local.
4. Sincronizar leitura, typing e receipts.
5. Persistir mensagens em banco.

## Fases concluidas

- `[01/06] setup`
- `[02/06] types/models`
- `[03/06] core-logic`
- `[04/06] ui/routes`
- `[05/06] validation/fixes`
- `[06/06] docs`
