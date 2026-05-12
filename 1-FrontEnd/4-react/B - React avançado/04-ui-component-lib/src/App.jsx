import { useRef, useState, useEffect } from 'react'
import { Accordion } from './components/Accordion'
import Modal from './components/Modal'
import { Tooltip } from './components/Tooltip'
import { Tabs } from './components/Tabs'
import './App.css'

function App() {
  const modalRef = useRef()
  const [activeSection, setActiveSection] = useState('tabs')
  const [theme, setTheme] = useState(localStorage.getItem('lib-theme') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('lib-theme', theme)
  }, [theme])

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
        <div className="sidebar-footer">
          <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
          </button>
        </div>
      </nav>

      <main className="showcase-main">
        {activeSection === 'tabs' && (
          <section className="component-section">
            <h2>Tabs</h2>
            <p className="desc">Padrão Compound Component para navegação entre conteúdos.</p>
            <Tabs defaultValue="react">
              <Tabs.List>
                <Tabs.Trigger value="react">React</Tabs.Trigger>
                <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
                <Tabs.Trigger value="angular">Angular</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="react">
                <p>O React domina o mercado com sua flexibilidade.</p>
              </Tabs.Content>
              <Tabs.Content value="vue">
                <p>Vue é amado por sua curva de aprendizado suave.</p>
              </Tabs.Content>
              <Tabs.Content value="angular">
                <p>Angular é a escolha para grandes corporações.</p>
              </Tabs.Content>
            </Tabs>
          </section>
        )}

        {activeSection === 'accordion' && (
          <section className="component-section">
            <h2>Accordion</h2>
            <p className="desc">Ideal para FAQs e conteúdos expansíveis.</p>
            <Accordion>
              <Accordion.Item id="1" title="O que é o React?">
                <p>React é uma biblioteca JavaScript para construir interfaces de usuário baseadas em componentes.</p>
              </Accordion.Item>
              <Accordion.Item id="2" title="Compound Components?">
                <p>Padrão de design para componentes que compartilham estado de forma implícita.</p>
              </Accordion.Item>
            </Accordion>
          </section>
        )}

        {activeSection === 'modal' && (
          <section className="component-section">
            <h2>Modal</h2>
            <p className="desc">Utiliza Portals para renderização fora da hierarquia DOM principal.</p>
            <button className="primary-btn" onClick={() => modalRef.current.open()}>Abrir Modal</button>
            <Modal ref={modalRef}>
              <h3>Configurações de Perfil</h3>
              <p>Este modal usa forwardRef e useImperativeHandle.</p>
              <button className="primary-btn" onClick={() => modalRef.current.close()}>Entendido</button>
            </Modal>
          </section>
        )}

        {activeSection === 'tooltip' && (
          <section className="component-section">
            <h2>Tooltip</h2>
            <p className="desc">Pequenas dicas visuais que aparecem ao passar o mouse.</p>
            <Tooltip text="Informação extra vindo do Tooltip!">
              <button className="help-btn">Passe o mouse aqui</button>
            </Tooltip>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
