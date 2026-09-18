# Schema Definition Language

Servidor GraphQL focado em SDL oficial, modelando `User` e `Post` com relacionamentos bidirecionais.

## Estrutura

- `package.json`: scripts e dependencias do servidor SDL.
- `src/schema/*.graphql`: SDL separada em `base`, `user` e `post`.
- `src/models/`: dados em memoria para usuarios e posts.
- `src/resolvers/index.js`: resolvers de `Query`, `User.posts` e `Post.author`.
- `src/server.js`: bootstrap do GraphQL Yoga com endpoint `/graphql` e `/health`.
- `examples/users-posts-query.graphql`: consulta pronta para navegar os tipos.
- `scripts/`: query exemplo, health check e smoke automatizado.

## Tipos modelados

- `User`
- `Post`
- `Query`

## Campos relacionais

- `User.posts`
- `Post.author`

## Executar

```powershell
npm install
npm start
```

## Validar

```powershell
npm run validate
```
