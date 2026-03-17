import { useState, useRef, useEffect } from 'react'
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
        <div>
          <h1>Animal Based AI</h1>
        </div>
        <div className="header-right">
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
          ) : (
            <button className="sign-in-link" onClick={onSignIn}>
              Sign in
            </button>
          )}
          <div className="settings-menu" ref={settingsRef}>
            <button className="settings-btn" onClick={() => setSettingsOpen((o) => !o)} aria-label="Settings">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </button>
            {settingsOpen && (
              <div className="settings-dropdown">
                <button
                  className="settings-item"
                  onClick={() => { onResetChat(); setSettingsOpen(false) }}
                >
                  Reset chat
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
