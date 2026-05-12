import { useRef } from 'react'
import { Accordion } from './components/Accordion'
import Modal from './components/Modal'
import { Tooltip } from './components/Tooltip'
import { Tabs } from './components/Tabs'
import './App.css'

function App() {
  const modalRef = useRef()

  return (
    <div className="showcase-container">
      <h1>UI Component Library</h1>
      
      <section className="component-section">
        <h2>Tabs (Compound Components)</h2>
        <Tabs defaultValue="react">
          <Tabs.List>
            <Tabs.Trigger value="react">React</Tabs.Trigger>
            <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
            <Tabs.Trigger value="angular">Angular</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="react">
            <p>React é o mais popular.</p>
          </Tabs.Content>
          <Tabs.Content value="vue">
            <p>Vue é elegante e simples.</p>
          </Tabs.Content>
          <Tabs.Content value="angular">
            <p>Angular é robusto e completo.</p>
          </Tabs.Content>
        </Tabs>
      </section>

      <section className="component-section">
        <h2>Tooltip (Refs)</h2>
        <Tooltip text="Este é um tooltip avançado!">
          <button className="help-btn">Passe o mouse aqui</button>
        </Tooltip>
      </section>

      <section className="component-section">
        <h2>Modal (forwardRef)</h2>
        <button onClick={() => modalRef.current.open()}>Abrir Modal</button>
        <Modal ref={modalRef}>
          <h3>Título do Modal</h3>
          <p>Este modal foi aberto usando useImperativeHandle e forwardRef.</p>
        </Modal>
      </section>
    </div>
  )
}

export default App
