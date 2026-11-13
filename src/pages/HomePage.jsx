import { useMemo, useState } from 'react'
import SearchBar from '../components/SearchBar'
import Loading from '../components/Loading'
import SurahCard from '../components/SurahCard'

function normalize(value) {
  return value.toLowerCase().replace(/[-\s]/g, '')
}

export default function HomePage({ surahs, loading, error, retry }) {
  const [query, setQuery] = useState('')
  const filteredSurahs = useMemo(() => {
    const search = normalize(query)
    return surahs.filter((surah) => normalize(surah.name_latin).includes(search))
  }, [query, surahs])

  return (
    <main className="container">
      <section className="hero">
        <p className="eyebrow">MUSHAF DIGITAL</p>
        <h1>Temukan ketenangan<br /><em>dalam setiap ayat.</em></h1>
        <p className="hero-copy">Baca Al-Qur&apos;an dengan terjemahan Bahasa Indonesia, kapan saja dan di mana saja.</p>
      </section>
      <div className="toolbar">
        <div>
          <h2>Daftar Surah</h2>
          <p>{filteredSurahs.length} dari 114 surah</p>
        </div>
        <SearchBar value={query} onChange={setQuery} />
      </div>
      {loading && <Loading label="Memuat daftar surah..." />}
      {error && <ErrorState message={error} retry={retry} />}
      {!loading && !error && (
        filteredSurahs.length
          ? <div className="surah-grid">{filteredSurahs.map((surah) => <SurahCard key={surah.number} surah={surah} />)}</div>
          : <div className="empty-state">Surah dengan nama tersebut tidak ditemukan.</div>
      )}
    </main>
  )
}

function ErrorState({ message, retry }) {
  return <div className="error-state"><strong>Terjadi kesalahan</strong><p>{message}</p><button className="button" onClick={retry}>Coba lagi</button></div>
}