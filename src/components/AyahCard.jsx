export default function AyahCard({ ayah }) {
  return (
    <article className="ayah-card">
      <div className="ayah-heading">
        <span className="ayah-number">{ayah.ayah_number}</span>
        {ayah.audio_url && <audio controls src={ayah.audio_url} aria-label={`Audio ayat ${ayah.ayah_number}`} />}
      </div>
      <p className="arabic" lang="ar" dir="rtl">{ayah.arab}</p>
      <p className="translation">{ayah.translation}</p>
    </article>
  )
}