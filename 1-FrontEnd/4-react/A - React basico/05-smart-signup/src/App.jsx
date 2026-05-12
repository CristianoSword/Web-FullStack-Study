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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <div className="app-container">
      <h1>Smart Signup</h1>
      <div className="form-box">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
        
        {step === 1 && (
          <div className="step">
            <h2>Informações Pessoais</h2>
            <div className="input-group">
              <label>Nome Completo</label>
              <input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Ex: João Silva" 
              />
            </div>
            <div className="input-group">
              <label>E-mail</label>
              <input 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Ex: joao@email.com" 
              />
            </div>
            <div className="actions">
              <button onClick={nextStep} disabled={!formData.name || !formData.email}>
                Próximo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
