# 🔮 02-Custom-RxJS-Operators — AuraRxJS

Console reativo avançado para estudo de streams de eventos assíncronos e formulários complexos no **Angular 18**, apresentando a criação de **Operadores Customizados RxJS** para tratamento e cálculo matemático de fluxos contínuos.

---

## 🎨 Principais Recursos & UX

1. **Operador Customizado `calculateSpeed`**: Operador puramente RxJS que intercepta coordenadas de ponteiros (`MouseEvent`) ao longo do tempo para calcular a aceleração real do cursor em tempo real.
2. **Monitor de Força de Senha Reativo**: Stream dinâmico que escuta alterações de valor no input de senha para medir sua complexidade (entropia) e atualizar uma barra de progresso colorida via injeção assíncrona (`async` pipe).
3. **Log Terminal Unificado**: Uso de `merge()` para unificar streams de coordenadas, cliques, digitação de teclas e validação de formulários em um console histórico interativo.
4. **Throttle & Debounce Controle**: Limitação de frequência em eventos de cursor e digitação rápida para mitigar sobrecarga da renderização e evitar memory leaks.

---

## 🛠️ Tecnologias Utilizadas

* **Angular 18**: Componentes autônomos (Standalone) e validação avançada com `ReactiveFormsModule`.
* **RxJS Operators**: Uso avançado de pipelines (`scan`, `map`, `throttleTime`, `filter`, `merge`, `BehaviorSubject`).
* **Estilização Premium**: Paleta escura com gradientes neon e visual console cibernético.

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
