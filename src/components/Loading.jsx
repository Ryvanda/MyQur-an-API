export default function Loading({ label = 'Memuat...' }) {
  return <div className="loading" role="status"><span className="spinner" />{label}</div>
}