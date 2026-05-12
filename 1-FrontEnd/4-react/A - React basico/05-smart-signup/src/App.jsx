import { useState } from 'react'
import './App.css'

function App() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
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
  const handleSubmit = () => setSubmitted(true)

  if (submitted) {
    return (
      <div className="app-container">
        <div className="success-card">
          <h2>🎉 Cadastro Realizado!</h2>
          <p>Obrigado, {formData.name}. Seus dados foram enviados com sucesso.</p>
          <button className="reset-btn" onClick={() => window.location.reload()}>Novo Cadastro</button>
        </div>
      </div>
    )
  }

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
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Ex: João Silva" />
            </div>
            <div className="input-group">
              <label>E-mail</label>
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Ex: joao@email.com" />
            </div>
            <div className="actions">
              <button className="next-btn" onClick={nextStep} disabled={!formData.name || !formData.email}>Próximo</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step">
            <h2>Endereço</h2>
            <div className="input-group">
              <label>Cidade</label>
              <input name="city" value={formData.city} onChange={handleChange} placeholder="Ex: São Paulo" />
            </div>
            <div className="input-group">
              <label>CEP</label>
              <input name="zip" value={formData.zip} onChange={handleChange} placeholder="Ex: 01234-567" />
            </div>
            <div className="actions">
              <button className="prev-btn" onClick={prevStep}>Anterior</button>
              <button className="next-btn" onClick={nextStep} disabled={!formData.city || !formData.zip}>Próximo</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step">
            <h2>Confirmar Dados</h2>
            <div className="summary">
              <p><strong>Nome:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Cidade:</strong> {formData.city}</p>
              <p><strong>CEP:</strong> {formData.zip}</p>
            </div>
            <div className="actions">
              <button className="prev-btn" onClick={prevStep}>Anterior</button>
              <button className="submit-btn" onClick={handleSubmit}>Finalizar Cadastro</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
