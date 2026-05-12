import { useState } from 'react'
import './App.css'

function App() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    zip: ''
  })

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <div className="app-container">
      <h1>Smart Signup</h1>
      <div className="form-box">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
        <p>Passo {step} de 3</p>
        <div className="step-content">
           {/* Conteúdo virá nos próximos commits */}
           <p>Carregando etapa...</p>
        </div>
      </div>
    </div>
  )
}

export default App
