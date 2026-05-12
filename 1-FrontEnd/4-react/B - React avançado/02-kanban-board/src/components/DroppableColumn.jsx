import { useDroppable } from '@dnd-kit/core'

function DroppableColumn({ id, children }) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div ref={setNodeRef} className="column">
      <h3>{id.toUpperCase()}</h3>
      <div className="task-list">
        {children}
      </div>
    </div>
  )
}

export default DroppableColumn
