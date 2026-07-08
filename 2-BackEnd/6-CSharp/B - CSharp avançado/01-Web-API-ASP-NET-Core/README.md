# 01-Web-API-ASP-NET-Core

Web API em ASP.NET Core para gestao de inventario, com `Entity Framework Core`, mapeamento para SQL Server, Swagger e CRUD completo de produtos.

## O que o projeto cobre

- projeto `Microsoft.NET.Sdk.Web` real
- `DbContext`, configuracao de entidade e repositorio EF Core
- `ConnectionStrings` e configuracao por `appsettings`
- endpoints REST em controllers para listar, buscar, criar, atualizar e remover produtos
- middleware de erro para validacoes de dominio
- seed inicial de dados e suporte a Swagger em ambiente de desenvolvimento

## Estrutura

```text
01-Web-API-ASP-NET-Core/
|-- Configuration/
|-- Contracts/
|-- Controllers/
|-- Data/
|-- Exceptions/
|-- Middleware/
|-- Models/
|-- Repositories/
|-- Services/
|-- Validation/
|-- Properties/
|-- Program.cs
|-- WebApiAspNetCore.csproj
|-- appsettings.json
`-- appsettings.Development.json
```

## Como usar

Quando houver .NET SDK instalado:

```bash
dotnet restore
dotnet run
```

Endpoints principais:

- `GET /api/health`
- `GET /api/products`
- `GET /api/products/{id}`
- `POST /api/products`
- `PUT /api/products/{id}`
- `DELETE /api/products/{id}`

## Regras de validacao

- `Sku` obrigatorio e com ate 32 caracteres
- `Name` obrigatorio e com ate 120 caracteres
- `Category` obrigatoria e com ate 80 caracteres
- `QuantityInStock` nao pode ser negativo
- `UnitPrice` deve ser maior que zero
- `Sku` deve ser unico

## Observacao

O host atual nao possui .NET SDK instalado, entao a entrega foi validada por revisao estatica da estrutura, dos namespaces, das referencias `EF Core/SQL Server` e da coerencia do pipeline HTTP.
