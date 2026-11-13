export default function SurahCard({ surah }) {
  const openDetail = () => {
    window.history.pushState({}, '', `/surah/${surah.number}`)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <article className="surah-card" onClick={openDetail} onKeyDown={(event) => event.key === 'Enter' && openDetail()} role="button" tabIndex="0">
      <div className="surah-number">{String(surah.number).padStart(3, '0')}</div>
      <div className="surah-info">
        <h2>{surah.name_latin}</h2>
        <p>{surah.translation}</p>
        <div className="surah-meta">
          <span>{surah.number_of_ayahs} ayat</span>
          <span>{surah.revelation}</span>
        </div>
      </div>
      <div className="surah-arabic">{surah.name}</div>
      {surah.audio_url && <audio controls src={surah.audio_url} onClick={(event) => event.stopPropagation()} aria-label={`Audio ${surah.name_latin}`} />}
    </article>
  )
}