# HTTP Server Native

Servidor HTTP criado apenas com módulos nativos do Node.

## Rotas

- `GET /`
- `GET /health`
- `GET /about`

## Estrutura

```text
04-HTTP-Server-Native/
├── src/
│   ├── config/routes.js
│   ├── middleware/request-guard.js
│   ├── models/response-shape.js
│   ├── services/router-service.js
│   └── server.js
├── package.json
└── README.md
```

## Fases concluidas

- `[01/06] setup`
- `[02/06] types/models`
- `[03/06] core-logic`
- `[04/06] ui/routes`
- `[05/06] validation/fixes`
- `[06/06] docs`
