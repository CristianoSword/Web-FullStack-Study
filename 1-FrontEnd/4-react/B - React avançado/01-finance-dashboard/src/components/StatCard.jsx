function StatCard({ title, value, type }) {
  return (
    <div className={`stat-card ${type}`}>
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  )
}

export default StatCard
