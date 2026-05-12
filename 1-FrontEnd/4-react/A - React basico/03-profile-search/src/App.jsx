import ProfileCard from './components/ProfileCard'
import './App.css'

function App() {
  const dummyUser = {
    name: "Cristiano Sword",
    username: "cristiano",
    email: "cristiano@example.com",
    address: { city: "Porto Alegre" }
  }

  return (
    <div className="app-container">
      <h1>Buscador de Perfis</h1>
      <div className="profile-grid">
        <ProfileCard user={dummyUser} />
      </div>
    </div>
  )
}

export default App
