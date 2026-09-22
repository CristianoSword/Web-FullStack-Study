# GraphQL Relational Queries

Servidor GraphQL relacional com Apollo Server, consultas profundas entre `Author`, `Post` e `Comment` e DataLoader para reduzir N+1.

## Estrutura

- `src/schema/typeDefs.graphql`: tipos relacionais e query por time.
- `src/models/`: dados em memoria de autores, posts e comentarios.
- `src/loaders/create-loaders.js`: batch loaders de autor, posts por autor e comentarios por post.
- `src/resolvers/index.js`: resolvers profundos usando loaders no `context`.
- `src/server.js`: bootstrap do Apollo Server com Express.
- `examples/`: consultas profundas de autor e posts por time.
- `scripts/`: consulta HTTP, health check e smoke automatizado.

## Relacoes cobertas

- `Author.posts`
- `Post.author`
- `Post.comments`
- `Query.postsByTeam(team: String!)`

## Executar

```powershell
npm install
npm start
```

## Validar

```powershell
npm run validate
```
