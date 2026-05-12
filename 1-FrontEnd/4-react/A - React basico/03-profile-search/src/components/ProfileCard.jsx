function ProfileCard({ user }) {
  return (
    <div className="profile-card">
      <div className="avatar">
        {user.name.charAt(0)}
      </div>
      <div className="info">
        <h3>{user.name}</h3>
        <p className="username">@{user.username}</p>
        <p className="email">{user.email}</p>
        <p className="city">📍 {user.address.city}</p>
      </div>
    </div>
  )
}

export default ProfileCard
