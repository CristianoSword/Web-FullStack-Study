# 04-C-sharp-Task-Parallel-Library

Projeto em C# para processamento paralelo pesado com `TPL Dataflow`, batches, transformacoes concorrentes e comandos de execucao via console.

## O que o projeto cobre

- projeto `.csproj` real com `System.Threading.Tasks.Dataflow`
- carregamento de work items em memoria
- batching com `BatchBlock`
- transformacao paralela com `TransformManyBlock`
- agregacao de resultados com `ActionBlock`
- validacao de configuracao e falha isolada por item

## Estrutura

```text
04-C-sharp-Task-Parallel-Library/
|-- Bootstrap/
|-- Cli/
|-- Configuration/
|-- Contracts/
|-- Exceptions/
|-- Models/
|-- Services/
|-- Validation/
|-- Program.cs
|-- CSharpTaskParallelLibrary.csproj
`-- appsettings.json
```

## Como usar

Quando houver .NET SDK instalado:

```bash
dotnet run
```

Comandos aceitos:

- `run`
- `preview`
- `sample`
- `help`
- `exit`

## Observacao

O host atual nao possui .NET SDK instalado, entao a validacao desta entrega foi feita por revisao estatica da estrutura, do pipeline `Dataflow` e da coerencia do processamento paralelo.
