import { useState, createContext, useContext } from 'react'

const TabsContext = createContext()

export function Tabs({ defaultValue, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue)
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs-container">{children}</div>
    </TabsContext.Provider>
  )
}

Tabs.List = function TabList({ children }) {
  return <div className="tabs-list">{children}</div>
}

Tabs.Trigger = function TabTrigger({ value, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext)
  return (
    <button 
      className={`tab-trigger ${activeTab === value ? 'active' : ''}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

Tabs.Content = function TabContent({ value, children }) {
  const { activeTab } = useContext(TabsContext)
  if (activeTab !== value) return null
  return <div className="tab-content">{children}</div>
}
