# File System Logger

Logger local assíncrono com `fs/promises` para escrever, listar e resumir entradas de log.

## Comandos

- `node src/index.js summary`
- `node src/index.js list`
- `node src/index.js write info api "Server booted"`

## Estrutura

```text
03-File-System-Logger/
├── src/
│   ├── config.js
│   ├── index.js
│   ├── models/log-schema.js
│   ├── services/logger-service.js
│   ├── types/log-entry.js
│   └── validators/log-validator.js
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
