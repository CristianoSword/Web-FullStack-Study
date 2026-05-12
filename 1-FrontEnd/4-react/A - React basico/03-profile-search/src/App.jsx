import { useState, useEffect } from 'react'
import ProfileCard from './components/ProfileCard'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="app-container">
      <h1>Buscador de Perfis</h1>
      <div className="search-box">
        <input 
          type="text" 
          placeholder="Pesquisar por nome ou usuário..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="status-msg">Carregando perfis...</div>
      ) : (
        <div className="profile-grid">
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <ProfileCard key={user.id} user={user} />
            ))
          ) : (
            <div className="status-msg">Nenhum perfil encontrado para "{searchTerm}"</div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
