# Express Basic API

API Express didatica para estudo de CRUD REST com armazenamento em memoria.

## Recursos

- `GET /health`
- `GET /tasks`
- `GET /tasks/:id`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

## Payload de exemplo

```json
{
  "title": "Write smoke tests",
  "status": "doing",
  "owner": "Marina"
}
```

## Scripts

- `npm start`
- `npm run dev`

## Estrutura

```text
02-Express-Basic-API/
├── src/
│   ├── data/task-store.js
│   ├── middleware/task-validation.js
│   ├── models/task-model.js
│   ├── services/task-service.js
│   ├── types/api-types.js
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
