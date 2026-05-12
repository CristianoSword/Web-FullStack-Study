import ReactDOM from 'react-dom'

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <button className="close-modal-btn" onClick={onClose}>×</button>
      </div>
    </div>,
    document.body
  )
}

export default Modal
