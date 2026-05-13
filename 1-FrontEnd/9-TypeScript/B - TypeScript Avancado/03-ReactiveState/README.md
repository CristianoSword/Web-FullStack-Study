# 03 - ReactiveState (Signals Engine)

Uma engine de reatividade moderna baseada em Signals, similar ao que  usado no SolidJS, Vue 3 e Angular 17+.

## Conceitos Avanados Aplicados
- **Dependency Tracking**: Rastreamento automtico de dependncias usando uma pilha de contexto global.
- **Signals & Effects**: Implementao do padro Observer de forma granular.
- **Computed Signals**: Sinais que derivam seu valor de outros sinais de forma reativa.
- **Proxies (Deep Reactivity)**: Uso de `Proxy` para interceptar mudanas em objetos aninhados (Store).

## Como Executar
1. Instale as dependncias:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   npm run dev
   ```
