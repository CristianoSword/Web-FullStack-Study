# 05 - Library-OOP (System)

Um sistema de gesto de biblioteca que demonstra os pilares da Programao Orientada a Objetos (POO) no TypeScript.

## Conceitos Aplicados
- **Classes Abstratas**: Uso de `BaseItem` como modelo para livros e DVDs.
- **Herana**: `Book` e `DVD` estendendo funcionalidades da classe base.
- **Modificadores de Acesso**: Uso de `private`, `protected` e `readonly` para encapsulamento.
- **Getters & Setters**: Controle de acesso a propriedades como `availability`.
- **Polimorfismo**: Mtodo `getDetails` implementado de formas diferentes nas subclasses.

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
