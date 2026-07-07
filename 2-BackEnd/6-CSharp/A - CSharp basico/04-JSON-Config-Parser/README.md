# 04-JSON-Config-Parser

Parser de configuracao em C# usando `System.Text.Json` para carregar, mesclar, inspecionar e atualizar arquivos `appsettings*.json`.

## O que o projeto cobre

- projeto `.csproj` real para aplicacao de console
- leitura de `appsettings.json` e `appsettings.{Environment}.json`
- merge recursivo entre configuracao base e override
- binding tipado para servidor, banco, cache e feature flags
- comandos `show`, `export`, `get`, `set` e `reload`
- validacao antes de persistir mudancas no JSON base

## Estrutura

```text
04-JSON-Config-Parser/
|-- Bootstrap/
|-- Cli/
|-- Configuration/
|-- Contracts/
|-- Exceptions/
|-- Models/
|-- Services/
|-- Validation/
|-- Program.cs
|-- JsonConfigParser.csproj
|-- appsettings.json
`-- appsettings.Development.json
```

## Como usar

Quando houver .NET SDK instalado:

```bash
dotnet run
```

Comandos aceitos:

- `show`
- `export`
- `reload`
- `get server.port`
- `get featureFlags.enableVerboseLogging`
- `set cache.durationSeconds 120`
- `set featureFlags.enableAnalytics true`
- `exit`

## Regras de validacao

- `App.Name`, `App.Environment`, `App.Server.Host`, `App.Database.ConnectionString` e `App.Database.Provider` sao obrigatorios
- `App.Server.Port` precisa ficar entre `1` e `65535`
- `App.Cache.DurationSeconds` precisa ser positivo quando o cache estiver habilitado
- path e valor de mutacao nao podem ser vazios

## Observacao

O host atual nao possui .NET SDK instalado, entao a validacao desta entrega foi feita por revisao estatica da estrutura, dos namespaces, dos modelos e da coerencia do parser.
