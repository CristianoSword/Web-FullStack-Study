import { Accordion } from './components/Accordion'
import './App.css'

function App() {
  return (
    <div className="showcase-container">
      <h1>UI Component Library</h1>
      
      <section className="component-section">
        <h2>Accordion (Compound Components)</h2>
        <Accordion>
          <Accordion.Item id="1" title="O que é o React?">
            <p>React é uma biblioteca JavaScript para construir interfaces de usuário baseadas em componentes.</p>
          </Accordion.Item>
          <Accordion.Item id="2" title="O que são Compound Components?">
            <p>É um padrão onde componentes trabalham juntos para manter um estado compartilhado de forma implícita.</p>
          </Accordion.Item>
          <Accordion.Item id="3" title="Vantagens do Pattern?">
            <p>Melhor legibilidade, maior flexibilidade e separação de responsabilidades clara.</p>
          </Accordion.Item>
        </Accordion>
      </section>
    </div>
  )
}

export default App
