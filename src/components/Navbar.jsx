export default function Navbar() {
  const goHome = (event) => {
    event.preventDefault()
    window.history.pushState({}, '', '/')
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <header className="navbar">
      <a href="/" className="brand" onClick={goHome}>
        <span className="brand-mark">م</span>
        <span>myQuran</span>
      </a>
      <span className="brand-subtitle">Al-Qur&apos;an Digital</span>
    </header>
  )
}