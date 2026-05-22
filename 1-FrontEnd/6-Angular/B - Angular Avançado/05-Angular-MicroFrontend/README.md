# 🌐 05-Angular-MicroFrontend — AuraShell

Orquestrador e contêiner dinâmico (**Shell**) de Micro-Frontends isolados, assíncronos e autônomos (**Standalone**) desenvolvidos sobre o **Angular 18**.

---

## 🎨 Principais Recursos & UX

1. **Standalone Micro-Frontends**: Três painéis independentes expostos como micro-aplicações (`FinanceWidgetComponent`, `LogsWidgetComponent`, `AnalyticsWidgetComponent`) carregáveis sob demanda.
2. **Dynamic Mounting Canvas**: Central de visualização (Viewport) que utiliza `ViewContainerRef` e a API moderna de compilação `createComponent()` do Angular para instanciar as micro-aplicações dinamicamente.
3. **WidgetLoaderService**: Emulador de download assíncrono que adiciona atraso reativo de rede via streams RxJS para demonstrar os estados ativos de carregamento no shell.
4. **Memory Leak Protection**: Injeção da chamada nativa de desmontagem `compRef.destroy()` antes da remoção do container para garantir a limpeza reativa absoluta de listeners e ciclos de vida.

---

## 🛠️ Tecnologias Utilizadas

* **Angular 18**: Dynamic rendering, component compilation standalone, encapsulation.
* **RxJS**: Delays reativos, status de rede assíncronos.
* **Design Premium**: Estilo cyberpunk carmesim de alta fidelidade com painel operacional.

---

## 🚀 Como Iniciar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
3. Abra o navegador em: **`http://localhost:4200`**
