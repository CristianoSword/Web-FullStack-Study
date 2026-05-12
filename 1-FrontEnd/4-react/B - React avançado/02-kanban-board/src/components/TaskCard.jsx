import { memo } from 'react'

const TaskCard = memo(({ task, columnId, onMove }) => {
  return (
    <div className="task-card">
      <p>{task.content}</p>
      <div className="task-actions">
        {columnId !== 'done' && (
          <button onClick={() => onMove(task.id, columnId)}>Próximo →</button>
        )}
      </div>
    </div>
  )
})

export default TaskCard
