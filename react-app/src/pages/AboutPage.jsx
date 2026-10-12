import { useState } from 'react'
import SiteFooter from '../components/SiteFooter.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import './about.css'

const values = [
  {
    id: 'identidad',
    label: 'Identidad',
    description: 'Diseñamos para que tu estilo no tenga que encajar en una sola definición.',
  },
  {
    id: 'durabilidad',
    label: 'Durabilidad',
    description: 'Elegimos acabados y materiales pensados para acompañarte temporada tras temporada.',
  },
  {
    id: 'comunidad',
    label: 'Comunidade',
    description: 'Creemos en una cultura urbana construida entre muchas voces historias y recorridos.',
  },
]

function AboutPage() {
  const [openValue, setOpenValue] = useState('identidad')

  return (
    <div className="about-page">
      <SiteHeader isAbout />
      <main id="contenido">
        <section className="intro">
          <p className="eyebrow">Manifiesto NewStill / 2026</p>
          <h1>Vestimos el movimiento<br /><em>de todos los días.</em></h1>
          <p className="intro-copy">
            Creamos piezas urbanas que acompañan tu ritmo expresan tu identidad
            y permanecen contigo mucho después de la primera impresión.
          </p>
        </section>

        <section className="purpose-grid" aria-label="Propósito de NewStill">
          <article className="purpose-card vision-card">
            <p className="number">01</p>
            <p className="eyebrow">Nuestra vizion</p>
            <h2>Un mundo donde se muestra estilos diferentes.</h2>
            <p>
              Imaginamos un futuro en el que la ropa cotidiana sea una forma de
              libertad: autentica funcional y abierta a todas las maneras de ser.
            </p>
          </article>
          <article className="purpose-card mission-card">
            <p className="number">02</p>
            <p className="eyebrow">Nuestra mision</p>
            <h2>Diseñar nuevos estilos para la vida urbana.</h2>
            <p>
              Convertimos materiales resistentes diseño consciente y detalles
              inesperados en piezas que se sienten tuyas desde el primer día.
            </p>
          </article>
        </section>

        <section className="values">
          <div>
            <p className="eyebrow">Lo que nos mueve</p>
            <h2>Hecho con intencion.</h2>
          </div>
          <div className="value-list">
            {values.map((value) => {
              const isOpen = openValue === value.id

              return (
                <div key={value.id}>
                  <button
                    className={`value-button${isOpen ? ' active' : ''}`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={value.id}
                    onClick={() => setOpenValue(isOpen ? null : value.id)}
                  >
                    {value.label} <span aria-hidden="true">+</span>
                  </button>
                  <p className="value-copy" id={value.id} hidden={!isOpen}>
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>
      </main>
      <SiteFooter isAbout />
    </div>
  )
}

export default AboutPage
