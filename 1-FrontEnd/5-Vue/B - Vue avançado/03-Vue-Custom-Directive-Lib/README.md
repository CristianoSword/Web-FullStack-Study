# 🔮 03-Vue-Custom-Directive-Lib — Biblioteca de Diretivas Customizadas

Esta é uma biblioteca interativa avançada contendo 4 diretivas Vue customizadas extremamente úteis para enriquecer a experiência visual e a interatividade de qualquer projeto web, desenvolvida com **Vue 3** (Composition API) e **Vite**.

## 🚀 Diretivas Desenvolvidas
1. **`v-tooltip` 💬**:
   - Cria balões explicativos dinâmicos com suporte a múltiplas direções (`top`, `bottom`, `left`, `right`).
   - Evita memory leaks ao instanciar os balões apenas em hover e destruí-los ao sair.
2. **`v-ripple` 🌊**:
   - Adiciona um efeito reativo Material Design (onda de choque) no ponto exato de clique do cursor.
   - Perfeito para botões de ação e cards premium.
3. **`v-intersection-observer` 👁️**:
   - Um observador de visibilidade altamente performático.
   - Adiciona automaticamente classes de animação de fade/slide in quando o elemento entra no viewport, poupando CPU.
4. **`v-click-outside` 🔐**:
   - Detecta cliques fora da área limitadora do elemento e dispara callbacks de fechamento de modais ou dropdowns.

## 📁 Estrutura de Diretórios
```
03-Vue-Custom-Directive-Lib/
├── src/
│   ├── directives/
│   │   └── index.js        # Lógica central e ciclo de vida das 4 diretivas
│   ├── models/
│   │   └── directiveTypes.js # Constantes e definições de contratos de tipos
│   ├── App.vue             # Playground interativo com console de logs reativos
│   ├── main.js
│   └── style.css           # Estilização das diretivas e orbes neon do tema dark
```

## ⚙️ Inicialização Local
Para executar este projeto em sua máquina local:
1. Certifique-se de que as dependências do Node estão instaladas.
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Realize o build para produção:
   ```bash
   npm run build
   ```
