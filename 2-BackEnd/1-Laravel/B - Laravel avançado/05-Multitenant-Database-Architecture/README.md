# Multitenant Database Architecture - Laravel

Projeto didatico para estudar arquitetura multi-tenant com isolamento por banco, tenant ativo e workspaces operacionais ligados a um registro central.

## Objetivo

Mostrar uma base clara para:

- registrar tenants em uma camada central
- exibir banco isolado e regiao por cliente
- representar workspaces por ambiente
- alternar tenant ativo para fins de roteamento

## Funcionalidades

- Dashboard de tenants provisionados
- Selecao do tenant ativo por formulario validado
- Painel de workspaces ligados ao tenant system
- Estrutura pronta para evoluir para conexao real por tenant

## Estrutura

```text
05-Multitenant-Database-Architecture/
├── app/
│   ├── Contracts/
│   │   └── TenantRegistry.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── TenancyController.php
│   │   └── Requests/
│   │       └── ActivateTenantRequest.php
│   ├── Models/
│   │   ├── Tenant.php
│   │   └── TenantWorkspace.php
│   └── Support/
│       ├── ConfigTenantRegistry.php
│       └── TenancyWorkspace.php
├── config/tenancy.php
├── public/css/site.css
├── resources/views/
│   ├── layouts/app.blade.php
│   └── pages/tenancy.blade.php
└── routes/web.php
```

## Como evoluir para tenância real

1. Persistir tenants e conexoes em banco central.
2. Resolver conexao por middleware ou resolver de request.
3. Aplicar migrations separadas por tenant.
4. Introduzir cache, fila e arquivos isolados por cliente.
5. Adicionar auditoria de troca de tenant e politicas de acesso.

## Fases concluidas

- `[01/06] setup`
- `[02/06] types/models`
- `[03/06] core-logic`
- `[04/06] ui/routes`
- `[05/06] validation/fixes`
- `[06/06] docs`
