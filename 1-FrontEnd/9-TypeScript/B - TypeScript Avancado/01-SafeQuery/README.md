# 01 - SafeQuery (Query Builder)

Um construtor de consultas SQL fortemente tipado que utiliza recursos avançados do TypeScript para garantir a integridade dos dados em tempo de compilao.

## Conceitos Avanados Aplicados
- **Mapped Types**: Transformao de um Schema de strings em tipos reais do TypeScript (`string`, `number`, `boolean`, etc).
- **Conditional Types**: Uso de `extends ? :` para inferir o tipo correto de cada coluna.
- **Generic Constraints**: Garantia de que as tabelas e colunas passadas como argumentos existem no Schema global.
- **Utility Types**: Criao de utilitrios como `QueryResult` e `TableColumns`.

## Como Executar
1. Instale as dependncias:
   ```bash
   npm install
   ```
2. Execute o modo demo:
   ```bash
   npm run dev
   ```
