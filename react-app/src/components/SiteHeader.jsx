function SiteHeader({ isAbout = false, menuOpen = false, setMenuOpen, onUserOpen }) {
  if (isAbout) {
    return (
      <header className="site-header">
        <a className="brand" href="/">
          NEWSTILL<span>.</span>
        </a>
        <a className="back-link" href="/">
          Volver a la tienda <span>↗</span>
        </a>
      </header>
    )
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <button
          className="menu-trigger"
          type="button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <a className="brand" href="#inicio">
          NEWSTILL<span>.</span>
        </a>
        <div className="header-actions">
          <nav
            className={`nav${menuOpen ? ' open' : ''}`}
            id="primary-navigation"
            aria-label="Navegación principal"
          >
            <a href="#coleccion" onClick={() => setMenuOpen(false)}>Tienda</a>
            <a href="#novedades" onClick={() => setMenuOpen(false)}>Revista</a>
            <a href="/vision-mision">Nosotros</a>
          </nav>
          <button
            className="user-trigger"
            type="button"
            aria-label="Agregar usuario"
            onClick={onUserOpen}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
