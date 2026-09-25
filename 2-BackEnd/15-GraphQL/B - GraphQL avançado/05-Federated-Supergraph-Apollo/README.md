# Federated Supergraph Apollo

Arquitetura federada com Apollo Gateway compondo tres subgrafos independentes de contas, catalogo e reviews.

## Estrutura

- `src/subgraphs/accounts-subgraph.js`: entidade `User` e query de usuarios.
- `src/subgraphs/catalog-subgraph.js`: entidade `Product` e referencia federada para `User`.
- `src/subgraphs/reviews-subgraph.js`: `Review` e extensoes federadas de `User` e `Product`.
- `src/start-subgraph-server.js`: helper para subir subgrafos Express + Apollo.
- `src/server.js`: start dos subgrafos e composicao do supergraph via `ApolloGateway`.
- `src/models/`: dados separados por dominio.
- `examples/`: consultas no gateway cobrindo seller, reviews e autores.
- `scripts/`: query HTTP, health check e smoke do supergraph.

## Federacao coberta

- `@key` em entidades compartilhadas
- resolucao federada de `User`
- resolucao federada de `Product`
- `ApolloGateway` com `IntrospectAndCompose`
- consulta unica agregando dados de multiplos subgrafos

## Portas

- gateway: `4205`
- accounts: `4301`
- catalog: `4302`
- reviews: `4303`

## Executar

```powershell
npm install
npm start
```

## Validar

```powershell
npm run validate
```
