import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

function Layout({ children }) {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <img src="/images/logo.png" alt="Patrick Hanna" className="logo-image" />
          </Link>
          <button 
            className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <Link to="/" className={`nav-link ${isActive('/')}`} onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={`nav-link ${isActive('/about')}`} onClick={closeMenu}>
                About
              </Link>
            </li>
            <li>
              <Link to="/resume" className={`nav-link ${isActive('/resume')}`} onClick={closeMenu}>
                Resume
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Patrick Hanna. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Layout
