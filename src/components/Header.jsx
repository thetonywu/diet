import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons'
import './Header.css'

function Header({ user, onSignIn, onSignOut, onResetChat }) {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const settingsRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setSettingsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-title">
          <h1><span className="header-title-accent">Animal Based AI</span></h1>
        </Link>
        <div className="header-right">
          <nav className="header-nav">
            <Link to="/101" className="header-nav-link">101</Link>
            <Link to="/about" className="header-nav-link">About</Link>
          </nav>
          {user ? (
            <div className="user-info">
              {user.user_metadata?.avatar_url && (
                <img
                  className="user-avatar"
                  src={user.user_metadata.avatar_url}
                  alt=""
                  referrerPolicy="no-referrer"
                />
              )}
              <span className="user-email">{user.email}</span>
              <button className="sign-out-btn" onClick={onSignOut}>
                Sign out
              </button>
            </div>
          ) : onSignIn ? (
            <button className="sign-in-link" onClick={onSignIn}>
              Sign in
            </button>
          ) : null}
          {onResetChat && (
            <div className="settings-menu" ref={settingsRef}>
              <button className="settings-btn" onClick={() => setSettingsOpen((o) => !o)} aria-label="Settings">
                <FontAwesomeIcon icon={faGear} size="lg" />
              </button>
              {settingsOpen && (
                <div className="settings-dropdown">
                  <button
                    className="settings-item"
                    onClick={() => { onResetChat(); setSettingsOpen(false) }}
                  >
                    <FontAwesomeIcon icon={faArrowRotateLeft} fixedWidth />
                    Reset chat
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
