# 03 - DataGuard (Validator Lib)

Uma biblioteca de validao de dados extensvel e fortemente tipada usando Generics.

## Conceitos Aplicados
- **Generics**: A classe `DataGuard<T>` trabalha com qualquer interface de dados.
- **Mapped Types**: O tipo `Schema<T>` mapeia as chaves de `T` para arrays de validadores.
- **Utility Types**: Demonstrao de flexibilidade com tipos genricos.
- **Higher-Order Functions**: Validadores como `minLength` que retornam funes de validao.

## Como Executar
1. Instale as dependncias:
   ```bash
   npm install
   ```
2. Compile o projeto:
   ```bash
   npx tsc
   ```
3. Execute os testes:
   ```bash
   node dist/index.js
   ```
