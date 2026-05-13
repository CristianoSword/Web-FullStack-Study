import './style.css'
import { signal, effect, computed, store } from './signals'

const app = document.querySelector<HTMLDivElement>('#app')!

// State
const count = signal(0)
const double = computed(() => count.value * 2)
const user = store({ name: 'Cristiano', settings: { theme: 'dark' } })

app.innerHTML = `
  <div class="reactive-container">
    <h1>Reactive Signals</h1>
    <div class="card">
      <p>Count: <span id="count">0</span></p>
      <p>Double: <span id="double">0</span></p>
      <button id="inc-btn">Incrementar</button>
    </div>
    
    <div class="card">
      <p>User: <span id="user-name"></span></p>
      <p>Theme: <span id="user-theme"></span></p>
      <button id="toggle-theme">Alternar Tema</button>
    </div>
  </div>
`

// DOM References
const countEl = document.querySelector('#count')!
const doubleEl = document.querySelector('#double')!
const userNameEl = document.querySelector('#user-name')!
const userThemeEl = document.querySelector('#user-theme')!

// Reactions (Effects)
effect(() => {
  countEl.textContent = count.value.toString();
  doubleEl.textContent = double.value.toString();
});

effect(() => {
  userNameEl.textContent = user.name;
  userThemeEl.textContent = user.settings.theme;
});

// Interactions
document.querySelector('#inc-btn')!.addEventListener('click', () => {
  count.value++;
});

document.querySelector('#toggle-theme')!.addEventListener('click', () => {
  user.settings.theme = user.settings.theme === 'dark' ? 'light' : 'dark';
});
