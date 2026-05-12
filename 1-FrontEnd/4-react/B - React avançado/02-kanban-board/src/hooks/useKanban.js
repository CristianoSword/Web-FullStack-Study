import { useState } from 'react'

export function useKanban(initialData) {
  const [columns, setColumns] = useState(initialData)

  const moveTask = (taskId, sourceCol, destCol) => {
    const task = columns[sourceCol].find(t => t.id === taskId)
    const newSource = columns[sourceCol].filter(t => t.id !== taskId)
    const newDest = [...columns[destCol], task]
    
    setColumns({
      ...columns,
      [sourceCol]: newSource,
      [destCol]: newDest
    })
  }

  return { columns, setColumns, moveTask }
}
