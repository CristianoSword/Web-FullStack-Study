# 01-Console-Calculator

Calculadora de console em C# com parser de expressoes, operacoes aritmeticas, historico em memoria e validacao de entrada.

## O que o projeto cobre

- projeto `.csproj` real para aplicacao de console
- parser no formato `<left> <operator> <right>`
- operacoes `+`, `-`, `*` e `/`
- historico circular com capacidade configuravel
- tratamento de erro para formato invalido e divisao por zero

## Estrutura

```text
01-Console-Calculator/
|-- Bootstrap/
|-- Cli/
|-- Configuration/
|-- Contracts/
|-- Models/
|-- Operations/
|-- Services/
|-- Validation/
|-- Program.cs
|-- ConsoleCalculator.csproj
`-- appsettings.json
```

## Como usar

Quando houver .NET SDK instalado:

```bash
dotnet run
```

Comandos aceitos:

- `12 + 3`
- `7.5 * 4`
- `history`
- `help`
- `exit`

## Observacao

O host atual nao possui .NET SDK instalado, entao a validacao desta entrega foi feita por revisao estatica da estrutura, dos namespaces e da coerencia do projeto.
