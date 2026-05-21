# 📈 01-SaaS-Dashboard — Painel de Controle SaaS Premium

Este é um painel administrativo extremamente premium e de alta performance desenvolvido com **Vue 3**, **Vite**, **Vue Router** e **Pinia**, focado no controle de permissões baseado em funções (RBAC - Role-Based Access Control) e visualizações de dados interativas.

## 🎨 Características do Design e UX
- **Estética Ultra Premium**: Combinação de tons escuros profundos (HSL), gradientes elegantes de neon violeta/rosa e cantos curvos modernos.
- **Gráficos SVG Dinâmicos**: Gráfico de área e linha interativo construído do zero utilizando SVG nativo para performance de renderização máxima (60 FPS) e zero dependência de pesadas bibliotecas de gráficos externas.
- **Gerenciamento de Estado Avançado**: Centralização total de dados de faturamento, faturas, métricas corporativas e controle de usuários através de um store global **Pinia**, com persistência local de dados no **LocalStorage**.
- **Segurança de Rotas (RBAC)**: Guards de roteamento que detectam se o usuário está logado e aplicam restrições em tempo de execução:
  - **Admin**: Acesso total, CRUD de membros e faturas.
  - **Editor**: Acesso total a painéis e pode cadastrar membros e faturas, mas não pode deletar administradores.
  - **Viewer**: Acesso puramente de leitura. Os botões de adição, edição e exclusão de dados são dinamicamente desativados e um banner de segurança é ativado notificando o modo de visualização segura.

## 🛠️ Tecnologias Utilizadas
- **Vue 3** (Composition API com SFC)
- **Vite** (Build e bundling ultra-rápido)
- **Pinia** (State Management)
- **Vue Router** (Roteamento com navegação baseada em privilégios)
- **Vanilla CSS** (Sistema de temas centralizado com variáveis customizadas)

## 📁 Estrutura de Diretórios
```
01-SaaS-Dashboard/
├── src/
│   ├── components/
│   │   └── Sidebar.vue      # Menu de navegação dinâmico colapsável
│   ├── models/
│   │   └── mockData.js     # Tipos estruturados de dados e sementes mockadas
│   ├── router/
│   │   └── index.js        # Roteamento e guards de permissões (RBAC)
│   ├── stores/
│   │   └── saasStore.js    # Store principal com lógica de negócio e persistência
│   ├── views/
│   │   ├── DashboardView.vue    # Painel principal com métricas e gráficos
│   │   ├── UsersView.vue        # Painel CRUD de membros
│   │   ├── BillingView.vue      # Painel CRUD de faturamento e finanças
│   │   ├── LoginView.vue        # Tela de login com preenchimento rápido para testes
│   │   └── UnauthorizedView.vue # Tela de erro 403 para acessos bloqueados
│   ├── App.vue
│   ├── main.js
│   └── style.css           # Design System centralizado
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
