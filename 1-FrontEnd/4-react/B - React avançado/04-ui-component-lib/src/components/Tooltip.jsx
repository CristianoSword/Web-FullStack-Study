import { useState, useRef } from 'react'

export function Tooltip({ text, children }) {
  const [isVisible, setIsVisible] = useState(false)
  const triggerRef = useRef(null)

  return (
    <div 
      className="tooltip-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      ref={triggerRef}
    >
      {children}
      {isVisible && (
        <div className="tooltip-content">
          {text}
        </div>
      )}
    </div>
  )
}
