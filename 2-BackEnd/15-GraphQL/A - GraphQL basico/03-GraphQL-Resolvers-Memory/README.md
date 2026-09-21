# GraphQL Resolvers Memory

Servidor GraphQL com resolvers de busca em memoria, filtros por argumentos e relacionamentos entre `User` e `Post`.

## Estrutura

- `src/schema/typeDefs.graphql`: tipos `User`, `Post` e queries com filtros.
- `src/models/`: dados em memoria para usuarios e posts.
- `src/resolvers/index.js`: resolvers de busca, filtro e relacionamento.
- `src/server.js`: bootstrap do GraphQL Yoga com `/graphql` e `/health`.
- `examples/`: queries prontas para filtro de posts e detalhe de usuario.
- `scripts/`: consulta HTTP, health check e smoke automatizado.

## Queries disponiveis

- `users`
- `user(id: ID!)`
- `posts(authorId: ID, published: Boolean)`
- `post(id: ID!)`

## Executar

```powershell
npm install
npm start
```

## Validar

```powershell
npm run validate
```
