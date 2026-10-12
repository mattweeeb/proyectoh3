import { useLayoutEffect, useRef } from 'react'

function UserRegistrationModal({ isOpen, onClose, onRegister }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const nameInputRef = useRef(null)
  const emailInputRef = useRef(null)
  const codeInputRef = useRef(null)
  const submitButtonRef = useRef(null)

  useLayoutEffect(() => {
    if (!isOpen) return undefined

    const previousFocus = document.activeElement
    const focusableElements = [
      closeButtonRef.current,
      nameInputRef.current,
      emailInputRef.current,
      codeInputRef.current,
      submitButtonRef.current,
    ].filter(Boolean)

    nameInputRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (!dialogRef.current?.contains(document.activeElement)) {
        event.preventDefault()
        firstElement?.focus()
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement?.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [isOpen, onClose])

  function handleSubmit(event) {
    event.preventDefault()
    onRegister()
    event.currentTarget.reset()
  }

  return (
    <div
      className={`modal-overlay${isOpen ? ' active' : ''}`}
      aria-hidden={!isOpen}
      inert={!isOpen}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="user-modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="userModalTitle"
      >
        <button
          className="close-modal"
          type="button"
          aria-label="Cerrar ventana"
          ref={closeButtonRef}
          onClick={onClose}
        >
          ×
        </button>
        <h3 id="userModalTitle">Agregar usuario</h3>
        <form className="user-form" onSubmit={handleSubmit}>
          <label>
            <span>Nombre</span>
            <input
              ref={nameInputRef}
              id="nombre"
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              autoComplete="name"
              required
            />
          </label>
          <label>
            <span>Gmail</span>
            <input
              ref={emailInputRef}
              id="gmail"
              type="email"
              name="gmail"
              placeholder="ejemplo@gmail.com"
              autoComplete="email"
              required
            />
          </label>
          <label>
            <span>Código de entrada</span>
            <input
              ref={codeInputRef}
              id="codigo"
              type="text"
              name="codigo"
              placeholder="Código recibido por Gmail"
              aria-describedby="codigoHelp"
              pattern="[A-Za-z0-9]{6}"
              title="Usa 6 caracteres alfanuméricos por ejemplo ABC123"
              required
            />
            <small id="codigoHelp">
              Demo: usa 6 caracteres alfanuméricos por ejemplo ABC123.
            </small>
          </label>
          <button className="btn btn-form" type="submit" ref={submitButtonRef}>
            Guardar usuario
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserRegistrationModal
