import './style.css'
import { EventBus } from './bus'
import { EventLogger } from './logger'

const app = document.querySelector<HTMLDivElement>('#app')!
const bus = new EventBus()
new EventLogger(bus)

app.innerHTML = `
  <div class="bus-container">
    <h2>EventBus Notifier</h2>
    <div class="actions">
      <button id="login-btn">Simular Login</button>
      <button id="msg-btn">Enviar Mensagem</button>
    </div>
    <div id="logs" class="logs-panel">
      <h3>Event Logs</h3>
    </div>
  </div>
`

const logsDiv = document.querySelector<HTMLDivElement>('#logs')!

function addLog(msg: string) {
  const p = document.createElement('p')
  p.textContent = msg
  logsDiv.appendChild(p)
}

document.querySelector('#login-btn')!.addEventListener('click', () => {
  const payload = { userId: 'user_' + Math.floor(Math.random()*1000), timestamp: Date.now() }
  bus.emit('user:login', payload)
  addLog(`Login emitido: ${payload.userId}`)
})

document.querySelector('#msg-btn')!.addEventListener('click', () => {
  const payload = { from: 'Cristiano', text: 'Olá Mundo TS!' }
  bus.emit('chat:message', payload)
  addLog(`Mensagem emitida: ${payload.text}`)
})
