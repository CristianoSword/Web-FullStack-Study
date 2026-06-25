# 01-NestJS-Enterprise-API

Exemplo de API corporativa em NestJS com modulo de contas e fluxo basico de criacao.

## Estrutura

- `src/main.ts`: bootstrap da aplicacao.
- `src/app.module.ts`: modulo raiz.
- `src/accounts/accounts.controller.ts`: endpoints `/accounts`.
- `src/accounts/accounts.service.ts`: regra de negocio em memoria.
- `src/accounts/pipes/account-payload.pipe.ts`: validacao do payload.

## Fluxo

- `GET /accounts` lista contas;
- `POST /accounts` cria conta com `name`, `email` e `team`;
- o pipe sanitiza email e normaliza os campos antes da gravacao.
