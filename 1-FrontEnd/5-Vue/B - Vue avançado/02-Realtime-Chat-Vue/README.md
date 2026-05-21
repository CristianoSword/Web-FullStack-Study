# 💬 02-Realtime-Chat-Vue — Chat Reativo com Bots Inteligentes

Esta é uma aplicação de bate-papo em tempo real inspirada no Slack/Discord, desenvolvida com **Vue 3** (Composition API) e **Pinia**. Ela implementa um mecanismo de mensageria simulado reativo, com bots dinâmicos inteligentes e persistência de dados completa no LocalStorage.

## 🎨 Características do Design e UX
- **Design de Vidro Dark (Teal Accent)**: Visual minimalista luxuoso com tons azuis/slate escuros profundos e realces em verde azulado (Teal HSL).
- **Simulação de Tráfego de Mensagens**: Lógica local que simula a latência de tráfego de dados e digitação.
- **Bots de Bate-Papo Inteligentes**: Três bots integrados que respondem dinamicamente quando mencionados via `@`:
  - **@Jarvis**: Assistente pessoal focado em monitorar tarefas de estudo e status técnico de performance.
  - **@Suporte-Bot**: Responde com dicas úteis de engenharia de frontend (Vue Router, state, CSS).
  - **@GamerBot**: Um bot descontraído que traz fatos gamers e easter eggs sobre Mu Online e desenvolvimento OpenGL.
- **Micro-Animações**: Indicador de digitação dinâmico com bolhas animadas que sobem e descem, além de rolagem suave automática (`auto-scroll`) ao receber novas mensagens.
- **CRUD de Canais**: Criação ágil de novos canais corporativos com ícone (emoji) e descrição customizados em tempo real.

## 🛠️ Tecnologias Utilizadas
- **Vue 3** (Composition API com SFC)
- **Vite** (Build e bundling ultra-rápido)
- **Pinia** (Gerenciador de Estado reativo)
- **Vanilla CSS** (Componentização isolada com scoped CSS)
- **LocalStorage** (Persistência completa de canais e conversas)

## 📁 Estrutura de Diretórios
```
02-Realtime-Chat-Vue/
├── src/
│   ├── models/
│   │   └── mockData.js     # Estrutura base de dados, canais e bots
│   ├── stores/
│   │   └── chatStore.js    # Store principal de canais, mensagens e bots
│   ├── App.vue             # Interface completa do chat dividida em duas colunas
│   ├── main.js
│   └── style.css           # Variáveis e reset global
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
