import { useState, createContext, useContext } from 'react'

const AccordionContext = createContext()

export function Accordion({ children }) {
  const [openItem, setOpenItem] = useState(null)
  return (
    <AccordionContext.Provider value={{ openItem, setOpenItem }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  )
}

Accordion.Item = function AccordionItem({ id, title, children }) {
  const { openItem, setOpenItem } = useContext(AccordionContext)
  const isOpen = openItem === id

  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <div className="accordion-title" onClick={() => setOpenItem(isOpen ? null : id)}>
        {title}
        <span>{isOpen ? '−' : '+'}</span>
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  )
}
