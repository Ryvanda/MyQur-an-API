import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import { getSurahs } from './services/surahService'

function getRoute() {
  const match = window.location.pathname.match(/^\/surah\/(\d+)\/?$/)
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
    getSurahs().then(setSurahs).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false))
  }

  useEffect(() => {
    const handlePopState = () => setRoute(getRoute())
    window.addEventListener('popstate', handlePopState)
    loadSurahs()
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (path) => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return <><Navbar />{route.page === 'home' ? <HomePage surahs={surahs} loading={loading} error={error} retry={loadSurahs} /> : <DetailPage number={route.number} onNavigate={navigate} />}</>
}