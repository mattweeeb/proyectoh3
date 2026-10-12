import { useEffect, useState } from 'react'
import AboutPage from './pages/AboutPage.jsx'
import StorePage from './pages/StorePage.jsx'
import './App.css'

function getRoute(pathname) {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/'

  if (normalizedPath === '/') return 'store'
  if (
    normalizedPath === '/vision-mision' ||
    normalizedPath === '/vision-mision/index.html'
  ) {
    return 'about'
  }

  return 'not-found'
}

function App() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    function handlePopState() {
      setPathname(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  function handleInternalNavigation(event) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    const anchor = event.target.closest('a[href]')
    if (
      !anchor ||
      anchor.target ||
      anchor.hasAttribute('download') ||
      anchor.getAttribute('href').startsWith('#')
    ) {
      return
    }

    const destination = new URL(anchor.href)
    if (
      destination.origin !== window.location.origin ||
      !/^https?:$/.test(destination.protocol) ||
      destination.pathname === '/api' ||
      destination.pathname.startsWith('/api/') ||
      /\.[^/]+$/.test(destination.pathname)
    ) {
      return
    }

    event.preventDefault()
    window.history.pushState({}, '', destination)
    setPathname(destination.pathname)

    if (destination.hash) {
      window.setTimeout(() => {
        document.getElementById(decodeURIComponent(destination.hash.slice(1)))?.scrollIntoView()
      }, 0)
    } else {
      window.scrollTo(0, 0)
    }
  }

  const route = getRoute(pathname)

  return (
    <div onClick={handleInternalNavigation}>
      {route === 'store' && <StorePage />}
      {route === 'about' && <AboutPage />}
      {route === 'not-found' && (
        <main className="not-found-page">
          <p className="eyebrow">Error 404</p>
          <h1>No encontramos esta página.</h1>
          <p>Puede que la dirección haya cambiado o que ya no exista.</p>
          <a className="btn" href="/">Volver a la tienda <span>↗</span></a>
        </main>
      )}
    </div>
  )
}

export default App
