# Apollo Server Setup

Servidor GraphQL usando Apollo Server v4 com Express, rota `/graphql`, health check HTTP e smoke test automatizado.

## Estrutura

- `package.json`: dependencias Apollo Server, Express e scripts do projeto.
- `src/schema/typeDefs.graphql`: schema da API de status de servicos.
- `src/models/services.js`: dataset em memoria para consulta.
- `src/resolvers/index.js`: resolvers de listagem e busca por `id`.
- `src/server.js`: bootstrap do Apollo Server com middleware Express.
- `examples/`: queries prontas de listagem e detalhe.
- `scripts/`: consulta HTTP, health check e smoke automatizado.

## Endpoints

- `POST /graphql`
- `GET /health`

## Executar

```powershell
npm install
npm start
```

## Validar

```powershell
npm run validate
```
