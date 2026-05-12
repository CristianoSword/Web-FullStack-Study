import { useState, useEffect } from 'react'
import ProfileCard from './components/ProfileCard'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err))
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
      <div className="profile-grid">
        {filteredUsers.map(user => (
          <ProfileCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}

export default App
