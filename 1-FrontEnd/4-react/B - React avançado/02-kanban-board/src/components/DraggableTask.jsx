import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

function DraggableTask({ task, columnId }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { columnId, task }
  })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes} 
      className="task-card"
    >
      {task.content}
    </div>
  )
}

export default DraggableTask
