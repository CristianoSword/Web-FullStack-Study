import { useRef, useState } from 'react'
import { Accordion } from './components/Accordion'
import Modal from './components/Modal'
import { Tooltip } from './components/Tooltip'
import { Tabs } from './components/Tabs'
import './App.css'

function App() {
  const modalRef = useRef()
  const [activeSection, setActiveSection] = useState('tabs')

  return (
    <div className="showcase-layout">
      <nav className="showcase-sidebar">
        <h2>UI Kit</h2>
        <ul>
          <li className={activeSection === 'tabs' ? 'active' : ''} onClick={() => setActiveSection('tabs')}>Tabs</li>
          <li className={activeSection === 'accordion' ? 'active' : ''} onClick={() => setActiveSection('accordion')}>Accordion</li>
          <li className={activeSection === 'modal' ? 'active' : ''} onClick={() => setActiveSection('modal')}>Modal</li>
          <li className={activeSection === 'tooltip' ? 'active' : ''} onClick={() => setActiveSection('tooltip')}>Tooltip</li>
        </ul>
      </nav>

      <main className="showcase-main">
        {activeSection === 'tabs' && (
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
        )}

        {activeSection === 'accordion' && (
          <section className="component-section">
            <h2>Accordion (Compound Components)</h2>
            <Accordion>
              <Accordion.Item id="1" title="O que é o React?">
                <p>React é uma biblioteca JavaScript para construir interfaces de usuário baseadas em componentes.</p>
              </Accordion.Item>
              <Accordion.Item id="2" title="Compound Components?">
                <p>Padrão de design para componentes que compartilham estado.</p>
              </Accordion.Item>
            </Accordion>
          </section>
        )}

        {activeSection === 'modal' && (
          <section className="component-section">
            <h2>Modal (forwardRef)</h2>
            <button className="primary-btn" onClick={() => modalRef.current.open()}>Abrir Modal</button>
            <Modal ref={modalRef}>
              <h3>Título do Modal</h3>
              <p>Este modal foi aberto usando useImperativeHandle e forwardRef.</p>
            </Modal>
          </section>
        )}

        {activeSection === 'tooltip' && (
          <section className="component-section">
            <h2>Tooltip (Refs)</h2>
            <Tooltip text="Dica importante aqui!">
              <button className="help-btn">Passe o mouse</button>
            </Tooltip>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
