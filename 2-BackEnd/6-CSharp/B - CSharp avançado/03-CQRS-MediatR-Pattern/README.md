# 03-CQRS-MediatR-Pattern

API em C# que implementa CQRS com `MediatR`, separando comandos, queries, handlers, controller HTTP e pipeline de validacao.

## O que o projeto cobre

- projeto web real com `MediatR`
- comandos e queries separados por feature
- handlers independentes para create, update, list e get by id
- repositorio em memoria e seed inicial
- controller HTTP enviando requests ao `ISender`
- pipeline de validacao e middleware de erro

## Estrutura

```text
03-CQRS-MediatR-Pattern/
|-- Configuration/
|-- Contracts/
|-- Controllers/
|-- Domain/
|-- Exceptions/
|-- Features/
|-- Middleware/
|-- Models/
|-- Properties/
|-- Repositories/
|-- Services/
|-- Validation/
|-- Program.cs
|-- CqrsMediatRPattern.csproj
`-- appsettings.json
```

## Como usar

Quando houver .NET SDK instalado:

```bash
dotnet restore
dotnet run
```

Endpoints principais:

- `GET /api/support-tickets`
- `GET /api/support-tickets/{id}`
- `POST /api/support-tickets`
- `PATCH /api/support-tickets/{id}/status`

## Observacao

O host atual nao possui .NET SDK instalado, entao a validacao desta entrega foi feita por revisao estatica da estrutura, dos handlers, do pipeline `MediatR` e da coerencia do fluxo CQRS.
