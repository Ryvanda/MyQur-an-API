import { useEffect, useState } from 'react'
import AyahCard from '../components/AyahCard'
import Loading from '../components/Loading'
import { getSurahDetail } from '../services/detailService'

export default function DetailPage({ number, onNavigate }) {
  const [detail, setDetail] = useState(null)
  const [ayahs, setAyahs] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState('')

  const loadPage = async (page, append = false, signal) => {
    if (append) setLoadingMore(true)
    else setLoading(true)
    setError('')
    try {
      const response = await getSurahDetail(number, page, 100, signal)
      setDetail(response.data)
      setPagination(response.pagination)
      setAyahs((current) => append ? [...current, ...response.data.ayahs] : response.data.ayahs)
    } catch (requestError) {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    setDetail(null)
    setAyahs([])
    loadPage(1, false, controller.signal)
    return () => controller.abort()
  }, [number])

  const go = (target) => {
    window.history.pushState({}, '', `/surah/${target}`)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  if (loading) return <main className="container"><Loading label="Memuat surah..." /></main>
  if (error) return <main className="container"><div className="error-state"><strong>Surah tidak dapat dimuat</strong><p>{error}</p><button className="button" onClick={() => loadPage(1)}>Coba lagi</button></div></main>
  if (!detail) return null

  const hasMore = pagination && ayahs.length < pagination.total
  return (
    <main className="container detail-page">
      <button className="back-link" onClick={() => onNavigate('/')}>← Kembali ke daftar surah</button>
      <header className="detail-header">
        <div>
          <p className="eyebrow">SURAH {String(detail.number).padStart(3, '0')}</p>
          <h1>{detail.name_latin}</h1>
          <p className="detail-translation">{detail.translation} · {detail.revelation}</p>
          <p className="detail-stats">{detail.number_of_ayahs} ayat</p>
        </div>
        <div className="detail-arabic" lang="ar">{detail.name}</div>
        {detail.audio_url && <audio controls src={detail.audio_url} aria-label={`Audio ${detail.name_latin}`} />}
      </header>
      {detail.description && <p className="description">{detail.description}</p>}
      <div className="ayah-list">{ayahs.map((ayah) => <AyahCard key={ayah.id || ayah.ayah_number} ayah={ayah} />)}</div>
      {hasMore && <button className="button load-more" disabled={loadingMore} onClick={() => loadPage(pagination.page + 1, true)}>{loadingMore ? 'Memuat...' : 'Muat lebih banyak ayat'}</button>}
      <nav className="surah-navigation" aria-label="Navigasi surah">
        <button disabled={number === 1} onClick={() => go(number - 1)}>← <span>Surah sebelumnya</span></button>
        <button disabled={number === 114} onClick={() => go(number + 1)}><span>Surah berikutnya</span> →</button>
      </nav>
    </main>
  )
}