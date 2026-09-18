# GraphQL Hello Server

Servidor GraphQL inicial com GraphQL Yoga, query `hello`, endpoint `/graphql` e health check HTTP.

## Estrutura

- `package.json`: scripts do projeto e dependencias GraphQL.
- `src/config/server-config.js`: porta, nome da app e endpoint GraphQL.
- `src/schema/typeDefs.graphql`: SDL com `Greeting` e `Query.hello`.
- `src/models/greeting.js`: factory da resposta de saudacao.
- `src/resolvers/queryResolvers.js`: resolver da query `hello`.
- `src/server.js`: bootstrap do GraphQL Yoga e rota `/health`.
- `examples/hello-query.graphql`: query pronta para testar no playground ou cliente HTTP.
- `scripts/`: consulta GraphQL, health check e smoke test automatizado.

## Endpoints

- `POST /graphql`
- `GET /health`

## Query principal

```graphql
query HelloQuery {
  hello(name: "Cristiano") {
    message
    timestamp
    source
  }
}
```

## Executar

```powershell
npm install
npm start
```

## Validar

```powershell
npm run validate
```
