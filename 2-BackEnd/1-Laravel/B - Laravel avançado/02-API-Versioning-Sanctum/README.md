# API Versioning Sanctum - Laravel

Projeto didatico para estudar uma API versionada com autenticacao estilo Sanctum, usando um token de demonstracao e respostas diferentes entre `v1` e `v2`.

## Objetivo

Mostrar como separar:

- catalogo de recursos por versao da API
- consumidor autenticado por bearer token
- workspace que resolve autorizacao e payload da versao
- endpoint versionado com resposta JSON consistente

## Funcionalidades

- Endpoint `GET /{version}/catalog`
- Suporte a `v1` e `v2`
- Token demo validado por request
- Payload diferente entre versoes
- Estrutura pronta para evoluir para Sanctum real

## Estrutura

```text
02-API-Versioning-Sanctum/
├── app/
│   ├── Contracts/
│   │   └── VersionedCatalog.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── VersionedApiController.php
│   │   └── Requests/
│   │       └── VersionedCatalogRequest.php
│   ├── Models/
│   │   ├── ApiConsumer.php
│   │   └── ApiResource.php
│   └── Support/
│       ├── ApiVersionWorkspace.php
│       ├── ConfigVersionedCatalog.php
│       └── SanctumVersionGate.php
├── config/
│   └── api_versions.php
└── routes/
    └── api.php
```

## Exemplo de chamada

```http
GET /v1/catalog
Authorization: Bearer demo-token-v1
```

## Como evoluir para Sanctum real

1. Persistir personal access tokens em banco.
2. Trocar `SanctumVersionGate` por autenticao real de middleware.
3. Adicionar abilities por rota.
4. Registrar `v3+` com transformadores dedicados.
5. Versionar contratos de response e erros.

## Fases concluidas

- `[01/06] setup`
- `[02/06] types/models`
- `[03/06] core-logic`
- `[04/06] ui/routes`
- `[05/06] validation/fixes`
- `[06/06] docs`
