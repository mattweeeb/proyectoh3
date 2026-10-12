function SiteFooter({ isAbout = false }) {
  if (isAbout) {
    return (
      <footer className="site-footer">
        <p>&copy; 2026 NewStill. Hecho para todos los días.</p>
        <a href="/">Explorar la colección <span>↗</span></a>
      </footer>
    )
  }

  return (
    <footer id="about" className="site-footer">
      <div className="container footer-inner">
        <p>&copy; 2026 NewStill. Hecho para todos los días.</p>
        <small>Sigue el movimiento &nbsp; Instagram / TikTok</small>
      </div>
    </footer>
  )
}

export default SiteFooter
