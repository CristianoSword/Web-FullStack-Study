# 🌀 Projeto 02: Advanced Math Animations

Este projeto demonstra a criação de animações orbitais dinâmicas usando funções matemáticas e trigonométricas avançadas (seno e cosseno) integradas no fluxo do pré-processador Sass moderno.

## 🚀 Conceitos e Arquitetura

* **Posicionamento Trigonométrico:** Distribuição circular de partículas calculando coordenadas cartesianas a partir de coordenadas polares com as funções `math.sin` e `math.cos`.
* **Geração Dinâmica de Keyframes:** Um loop `@for` gera automaticamente animações personalizadas de `@keyframes` individuais para cada partícula com base no seu índice de rotação.
* **Timings e Delays Iterados:** Atrasos na animação e durações ajustados automaticamente para criar um efeito orbital fluido e ondulatório.

## 📦 Como Executar

```bash
npm install
npm run build:sass
```
Abra o `index.html` na raiz do projeto no seu navegador para visualizar as partículas orbitando em tempo real.
