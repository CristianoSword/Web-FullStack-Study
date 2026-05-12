import { forwardRef, useImperativeHandle, useState } from 'react'
import ReactDOM from 'react-dom'

const Modal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }))

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {props.children}
        <button className="close-modal-btn" onClick={() => setIsOpen(false)}>×</button>
      </div>
    </div>,
    document.body
  )
})

export default Modal
