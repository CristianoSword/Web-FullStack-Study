# 05-Basic-Interface-Polymorphism

Projeto em C# que demonstra interfaces e polimorfismo com um centro de notificacoes capaz de despachar mensagens por Email, SMS e Slack.

## O que o projeto cobre

- projeto `.csproj` real para aplicacao de console
- interface `INotificationChannel` com implementacoes polimorficas concretas
- dispatcher que resolve o canal pelo contrato em runtime
- repositorio de historico em memoria
- comandos para listar canais, enviar mensagens e consultar log
- validacao de destinatario por tipo de canal

## Estrutura

```text
05-Basic-Interface-Polymorphism/
|-- Bootstrap/
|-- Channels/
|-- Cli/
|-- Configuration/
|-- Contracts/
|-- Exceptions/
|-- Models/
|-- Services/
|-- Validation/
|-- Program.cs
|-- InterfacePolymorphism.csproj
`-- appsettings.json
```

## Como usar

Quando houver .NET SDK instalado:

```bash
dotnet run
```

Comandos aceitos:

- `channels`
- `history`
- `send Email;marina@example.dev;Deploy done;The deploy finished successfully`
- `send Sms;+5511999991234;Code;Your verification code is 123456`
- `send Slack;#backend-alerts;Job failed;The nightly import needs review`
- `help`
- `exit`

## Regras de validacao

- sender padrao nao pode ser vazio
- `Recipient`, `Subject` e `Body` sao obrigatorios
- Email exige endereco valido
- SMS exige telefone valido
- Slack exige destino com `#` ou `@`

## Observacao

O host atual nao possui .NET SDK instalado, entao a validacao desta entrega foi feita por revisao estatica da estrutura, dos contratos e da coerencia do despacho polimorfico.
