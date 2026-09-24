# Custom Directives Auth

Servidor GraphQL com diretiva customizada `@auth` aplicada no schema para validar autenticação, papel e escopos de usuário.

## Estrutura

- `src/schema/typeDefs.graphql`: diretiva `@auth`, queries públicas e protegidas.
- `src/models/`: catálogo de tokens, relatórios administrativos e sumário financeiro.
- `src/auth/build-auth-context.js`: extrai token do header e monta o `currentUser`.
- `src/auth/auth-directive.js`: transforma o schema e envolve resolvers protegidos.
- `src/resolvers/index.js`: resolvers da API com o controle de acesso vindo da diretiva.
- `src/server.js`: GraphQL Yoga com `/graphql` e `/health`.
- `examples/`: queries pública, administrativa e com escopo.
- `scripts/`: consultas HTTP e smoke automatizado cobrindo sucesso e bloqueio.

## Regras cobertas

- `@auth` sem argumentos: exige usuário autenticado
- `@auth(role: "admin")`: exige papel administrativo
- `@auth(scopes: ["billing:read"])`: exige escopo específico

## Executar

```powershell
npm install
npm start
```

## Validar

```powershell
npm run validate
```
