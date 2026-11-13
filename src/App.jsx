import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import { getSurahs } from './services/surahService'

function getRoute() {
  const match = window.location.pathname.match(/^\/surah\/(-?\d+)\/?$/)
  return match ? { page: 'detail', number: Number(match[1]) } : { page: 'home' }
}

export default function App() {
  const [route, setRoute] = useState(getRoute)
  const [surahs, setSurahs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadSurahs = () => {
    setLoading(true)
    setError('')
    getSurahs()
      .then(setSurahs)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const controller = new AbortController()
    const handlePopState = () => setRoute(getRoute())
    window.addEventListener('popstate', handlePopState)

    getSurahs(controller.signal)
      .then((data) => {
        setSurahs(data)
        setError('')
      })
      .catch((requestError) => {
        if (requestError.name !== 'CanceledError' && requestError.name !== 'AbortError') {
          setError(requestError.message)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => {
      controller.abort()
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const navigate = (path) => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <>
      <Navbar />
      {route.page === 'home' ? (
        <HomePage surahs={surahs} loading={loading} error={error} retry={loadSurahs} />
      ) : (
        <DetailPage key={route.number} number={route.number} onNavigate={navigate} />
      )}
      <footer className="footer">
        <p>myQuran — Sumber data: myQuran API v3</p>
      </footer>
    </>
  )
}
