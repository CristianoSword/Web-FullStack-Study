# 🛠️ Projeto 05: Schema Validator Factory

Este projeto demonstra a criação de um gerador de validadores de runtime fortemente tipados usando recursos avançados do TypeScript.

## 🚀 Conceitos e Arquitetura

* **Tipagem Estática Avançada:** Uso intenso de Conditional Types, Mapped Types e Type Inference (como a utility `InferType<T>`) para derivar os tipos do TypeScript a partir das definições do schema em tempo de design.
* **Validação em Tempo de Execução:** Uma função recursiva garante que qualquer estrutura de dados fornecida atenda estritamente às regras do schema configurado, disparando erros detalhados sobre as propriedades inválidas.
* **Discriminated Unions:** Definição clara de esquemas que permitem checagem exaustiva dentro de blocos `switch/case`, garantindo escalabilidade na adição de novos tipos de dados.

## 📦 Como Executar

Instale as dependências:
```bash
npm install
```

Execute o exemplo de validação fornecido no entry point (`src/index.ts`):
```bash
npm start
```

Para compilar a versão final para JavaScript:
```bash
npm run build
```
