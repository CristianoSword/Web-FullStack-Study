# 02-Contact-Book-CRUD

Gerenciador de contatos em C# com armazenamento em memoria, comandos de console, validacao de dominio e configuracao via `appsettings.json`.

## O que o projeto cobre

- projeto `.csproj` real para aplicacao de console
- CRUD completo de contatos em memoria
- busca por nome com comparacao case-insensitive
- validacao de nome, email, telefone e id
- protecao contra email duplicado
- leitura de configuracao para contatos iniciais e tamanho de pagina

## Estrutura

```text
02-Contact-Book-CRUD/
|-- Bootstrap/
|-- Cli/
|-- Configuration/
|-- Contracts/
|-- Exceptions/
|-- Models/
|-- Services/
|-- Validation/
|-- Program.cs
|-- ContactBookCrud.csproj
`-- appsettings.json
```

## Como usar

Quando houver .NET SDK instalado:

```bash
dotnet run
```

Comandos aceitos:

- `list`
- `search marina`
- `add Marina Costa;marina@example.dev;+55 11 99999-1234`
- `update 1;Marina Costa;marina@example.dev;+55 11 99999-4321`
- `delete 2`
- `help`
- `exit`

## Regras de validacao

- nome com pelo menos 3 caracteres
- email obrigatorio e com formato valido
- telefone com 8 a 15 digitos e apenas caracteres aceitos
- ids devem ser inteiros positivos
- email nao pode se repetir em dois contatos

## Observacao

O host atual nao possui .NET SDK instalado, entao a validacao desta entrega foi feita por revisao estatica da estrutura, dos namespaces, das configuracoes e da coerencia dos fluxos do projeto.
