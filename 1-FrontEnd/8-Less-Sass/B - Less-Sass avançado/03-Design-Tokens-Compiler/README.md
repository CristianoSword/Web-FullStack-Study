# 📦 Projeto 03: Design Tokens Compiler

Este projeto demonstra a compilação automatizada de tokens de design de um formato JSON (`tokens/tokens.json`) para variáveis utilizáveis no Sass (`src/scss/_tokens.scss`) por meio de um script em Node.js.

## 🚀 Conceitos e Arquitetura

* **Única Fonte de Verdade:** Centralização de variáveis visuais (cores, espaçamentos, raios de borda, fontes) em um arquivo JSON de especificação de design.
* **Compilação Automatizada:** Script utilitário em Node.js (`scripts/compile-tokens.js`) que processa recursivamente o JSON de tokens e cospe variáveis Sass nativas.
* **Ciclo de Build Unificado:** Integração do script de compilação de tokens diretamente no script principal de build do Sass (`npm run build:sass`), garantindo que qualquer alteração de design seja propagada na compilação do CSS.

## 📦 Como Executar

```bash
npm install
npm run build:sass
```
Altere os valores de cores ou espaçamentos em `tokens/tokens.json`, execute `npm run build:sass` e veja a interface atualizar automaticamente para refletir as mudanças do tema.
