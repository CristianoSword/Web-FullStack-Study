# 01 - TaskFlow (CLI Todo)

Um gerenciador de tarefas simples via linha de comando para demonstrar os fundamentos do TypeScript.

## Conceitos Aplicados
- **Interfaces**: Definio da estrutura da `Task`.
- **Enums**: Controle de estados com `TaskStatus`.
- **Classes**: Encapsulamento da lgica no `TaskManager`.
- **Generics/Utility Types**: Uso de `Partial` e `Omit` para atualizaes seguras.
- **Modificadores de Acesso**: Uso de `private` para proteger o estado das tarefas.

## Como Executar
1. Instale as dependncias:
   ```bash
   npm install
   ```
2. Compile o projeto:
   ```bash
   npx tsc
   ```
3. Execute:
   ```bash
   node dist/index.js
   ```
