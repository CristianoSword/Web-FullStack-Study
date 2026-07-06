# 03-Library-Catalog-OOP

Sistema de emprestimo de livros em C# com modelagem orientada a objetos, catalogo em memoria, politica de emprestimo e interface de console.

## O que o projeto cobre

- projeto `.csproj` real para aplicacao de console
- classe abstrata `LibraryItem` e especializacao `Book`
- modelos para `Member`, `LoanRecord`, requests e enums de dominio
- repositorio em memoria com dados iniciais
- politica de emprestimo com limite global e por membro
- fluxo de emprestimo, devolucao, busca, listagem e historico de loans
- validacao de ids, datas e termos de busca

## Estrutura

```text
03-Library-Catalog-OOP/
|-- Bootstrap/
|-- Cli/
|-- Configuration/
|-- Contracts/
|-- Exceptions/
|-- Models/
|-- Policies/
|-- Services/
|-- Validation/
|-- Program.cs
|-- LibraryCatalogOop.csproj
`-- appsettings.json
```

## Como usar

Quando houver .NET SDK instalado:

```bash
dotnet run
```

Comandos aceitos:

- `catalog`
- `members`
- `loans`
- `search clean`
- `borrow 1;2`
- `return 1;2`
- `help`
- `exit`

## Regras de negocio

- um livro nao pode ser emprestado se ja existir loan ativo
- o limite efetivo usa o menor valor entre o limite global e o limite do membro
- a devolucao precisa pertencer ao mesmo membro que abriu o emprestimo
- datas futuras invalidas e ids nao positivos sao rejeitados

## Observacao

O host atual nao possui .NET SDK instalado, entao a validacao desta entrega foi feita por revisao estatica da estrutura, dos namespaces, das configuracoes e da coerencia dos fluxos de emprestimo.
