export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-box">
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Cari nama surah..."
        aria-label="Cari nama surah"
      />
      {value && <button type="button" onClick={() => onChange('')} aria-label="Hapus pencarian">×</button>}
    </label>
  )
}