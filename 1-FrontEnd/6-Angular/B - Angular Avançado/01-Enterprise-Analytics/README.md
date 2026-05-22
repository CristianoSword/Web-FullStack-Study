# 📊 01-Enterprise-Analytics — AuraAnalytics

Painel analítico corporativo de alta performance construído com a arquitetura moderna do **Angular 18 (Standalone Components)** e **Vite**, utilizando **Roteamento Assíncrono com Lazy Loading** e controle reativo baseado em streams **RxJS**.

---

## 🎨 Principais Recursos & UX

1. **Roteamento Preguiçoso (Lazy Loading)**: Divisão de código otimizada em nível de componente, separando a aplicação em chunks sob demanda (como `/dashboard` e `/reports`) para carregamento instantâneo.
2. **Gráficos SVG Matemáticos Dinâmicos**: Sparklines e gráficos de área desenhados reativamente de forma nativa e limpa diretamente via SVG no HTML, adaptando-se instantaneamente às flutuações das métricas.
3. **Simulação Reativa em Tempo Real**: Uso de injeção de dependências e `BehaviorSubject` para propagar flutuações de dados realistas e simular latência de rede assíncrona.
4. **Gerador e Validador de Relatórios**: Formulário premium com tratamento de erro e validações visuais em tempo real, permitindo gerar formatos dinâmicos como `.pdf`, `.xlsx` e `.csv`.

---

## 📁 Estrutura de Arquivos

```
src/
├── app/
│   ├── models/            # Definições de interfaces e dados seed
│   ├── services/          # Serviços com streams RxJS BehaviorSubject
│   ├── views/             # Telas lazy-loaded (Dashboard e Reports)
│   ├── app.component.ts   # Layout base de casca (Shell) com router-outlet
│   └── app.routes.ts      # Configurações de rotas lazy-loaded
├── main.ts                # Bootstrap Standalone principal
└── styles.css             # Estilos cibernéticos e paleta HSL customizada
```

---

## 🛠️ Tecnologias Utilizadas

* **Angular 18**: Plataforma moderna de alta performance com componentização Standalone e fluxo de controle nativo (`@for`, `@if`).
* **RxJS Observables**: Manipulação assíncrona robusta baseada em streams de dados reativos.
* **Vite / Build System**: Compilação Ahead-of-Time (AOT) ultra rápida e bundling modular.

---

## 🚀 Como Iniciar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento local:
   ```bash
   npm start
   ```
3. Acesse a aplicação na porta padrão: **`http://localhost:4200`**
