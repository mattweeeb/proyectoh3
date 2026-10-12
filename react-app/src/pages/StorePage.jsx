import { useCallback, useEffect, useRef, useState } from 'react'
import SiteFooter from '../components/SiteFooter.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import UserRegistrationModal from '../components/UserRegistrationModal.jsx'
import './store.css'

const products = [
  {
    image: '/img/4090206_10121_Pitch-Black_01_LF.jpg',
    alt: 'Gorra negra clasica',
    name: 'Negro azabache',
    price: 'Bs 292 aprox.',
  },
  {
    image: '/img/4090206_17-1044_Tawny-Brown_01_LF.jpg',
    alt: 'Gorra marrón',
    name: 'Marrón tostado',
    price: 'Bs 292 aprox.',
  },
  {
    image: '/img/B-FHTTT12GWP-NTC-HR-F.webp',
    alt: 'Gorra deportiba azul',
    name: 'Azul deportivo',
    price: 'Bs 264 aprox.',
  },
]

function StorePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [registrationStatus, setRegistrationStatus] = useState('')
  const statusRef = useRef(null)
  const closeUserModal = useCallback(() => setIsModalOpen(false), [])

  useEffect(() => {
    if (registrationStatus) statusRef.current?.focus()
  }, [registrationStatus])

  function handleRegister() {
    setRegistrationStatus(
      'Usuario validado. Esta demostración no envía ni almacena datos.',
    )
    setIsModalOpen(false)
  }

  return (
    <div className="store-page">
      <a className="skip-link" href="#main">Saltar al contenido</a>
      <SiteHeader
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onUserOpen={() => setIsModalOpen(true)}
      />

      <main id="main">
        <section id="inicio" className="hero container">
          <div className="hero-content">
            <p className="eyebrow">Nueva coleccion / 2026</p>
            <h2>Crea tus<br /><em>propias</em> reglas.</h2>
            <p className="hero-copy">
              Gorras para todos los días y para una ciudad en movimiento.
              Disenadas para destacar y hechas para durar.
            </p>
            <a className="btn" href="#coleccion">Ver colección <span>↗</span></a>
          </div>
          <div className="hero-visual">
            <div className="hero-label">01 / 04</div>
            <img
              src="/img/2078511-022-col-410_1.jpg"
              alt="Gorra roja NewStill"
              className="hero-img"
            />
            <div className="hero-stamp">ESENCIALES<br />URBANOS</div>
          </div>
        </section>

        <section className="ticker" aria-label="Ventajas de NewStill">
          <div>ENVÍO GRATIS EN COMPRAS MAYORES A Bs 520</div>
          <span>✳</span>
          <div>DISEÑADAS PARA EL MOVIMIENTO DIARIO</div>
          <span>✳</span>
          <div>LANZAMIENTO LIMITADO / SIN REPOSICIÓN</div>
        </section>

        <section className="container categories" aria-label="Categorías de la tienda">
          <p className="section-kicker">Explora la colecion</p>
          <div className="category-links">
            <a href="#coleccion">Gorras <span>↗</span></a>
            <a href="#novedades">Novedades <span>↗</span></a>
            <a href="/vision-mision">El estilo NewStill <span>↗</span></a>
          </div>
        </section>

        <section id="coleccion" className="container collection">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Los esenciales</p>
              <h3>Hechas para el presente.</h3>
            </div>
            <a href="#novedades" className="text-link">Ver todo <span>↗</span></a>
          </div>
          <div className="cards">
            {products.map((product) => (
              <article className="card" key={product.name}>
                <img src={product.image} alt={product.alt} />
                <div className="card-info">
                  <h4>{product.name}</h4>
                  <p>{product.price}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="novedades" className="container novedades">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Desde la revista</p>
              <h3>Notas de ciudad.</h3>
            </div>
            <a href="#coleccion" className="text-link">Leer historias <span>↗</span></a>
          </div>
          <div className="novedades-grid">
            <article className="novedad">
              <img src="/img/2967246.webp" alt="Gorra edicion limitada" />
              <p>
                <strong>01 — Estudio de campo</strong> / Un vistazo a los detalles
                que convierten una gorra en parte de tu uniforme diario.
              </p>
            </article>
            <article className="novedad">
              <img src="/img/B-CHRTN17GKS-CC-HR-F.webp" alt="Gorra con parche" />
              <p>
                <strong>02 — Despues de hora</strong> / La ciudad siempre cambia.
                Nosotros también.
              </p>
            </article>
          </div>
        </section>
      </main>

      <p
        className="form-status"
        role="status"
        aria-live="polite"
        tabIndex="-1"
        ref={statusRef}
      >
        {registrationStatus}
      </p>
      <UserRegistrationModal
        isOpen={isModalOpen}
        onClose={closeUserModal}
        onRegister={handleRegister}
      />
      <SiteFooter />
    </div>
  )
}

export default StorePage
