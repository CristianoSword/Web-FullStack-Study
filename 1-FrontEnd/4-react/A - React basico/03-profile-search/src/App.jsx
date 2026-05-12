import { useState, useEffect } from 'react'
import ProfileCard from './components/ProfileCard'
import './App.css'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="app-container">
      <h1>Buscador de Perfis</h1>
      <div className="profile-grid">
        {users.map(user => (
          <ProfileCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}

export default App
