function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">FinTrack</div>
      <nav>
        <ul>
          <li className="active">Dashboard</li>
          <li>Transações</li>
          <li>Relatórios</li>
          <li>Configurações</li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
