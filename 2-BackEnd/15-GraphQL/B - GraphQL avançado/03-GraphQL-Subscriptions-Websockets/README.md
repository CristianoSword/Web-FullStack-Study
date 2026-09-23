# GraphQL Subscriptions Websockets

Servidor GraphQL com subscriptions em tempo real via WebSocket usando `graphql-ws` e `ws`.

## Estrutura

- `src/schema/typeDefs.graphql`: query, mutation e subscription do placar ao vivo.
- `src/models/live-score-store.js`: estado atual do evento em memoria.
- `src/resolvers/index.js`: publicação de score e stream filtrado por `matchId`.
- `src/server.js`: GraphQL Yoga no HTTP e servidor websocket acoplado.
- `examples/`: query do último score, mutation de publish e subscription de update.
- `scripts/`: publish HTTP, query HTTP, health check e smoke real de websocket.

## Operacoes cobertas

- `latestScore`
- `publishScore(input: PublishScoreInput!)`
- `scoreUpdated(matchId: ID!)`

## Transporte

- HTTP em `http://localhost:4203/graphql`
- WebSocket em `ws://localhost:4203/graphql`

## Executar

```powershell
npm install
npm start
```

## Validar

```powershell
npm run validate
```
