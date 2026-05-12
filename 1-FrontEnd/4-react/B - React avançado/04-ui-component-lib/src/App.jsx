import { useRef } from 'react'
import { Accordion } from './components/Accordion'
import Modal from './components/Modal'
import { Tooltip } from './components/Tooltip'
import './App.css'

function App() {
  const modalRef = useRef()

  return (
    <div className="showcase-container">
      <h1>UI Component Library</h1>
      
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

      <section className="component-section">
        <h2>Accordion (Compound Components)</h2>
        <Accordion>
          <Accordion.Item id="1" title="O que é o React?">
            <p>React é uma biblioteca JavaScript para construir interfaces de usuário baseadas em componentes.</p>
          </Accordion.Item>
        </Accordion>
      </section>
    </div>
  )
}

export default App
