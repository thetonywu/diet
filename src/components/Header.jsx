import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faArrowRotateLeft, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import './Header.css'

function Header({ user, onSignIn, onSignOut, onResetChat, onAbout }) {
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
          <h1><span className="header-title-accent">Animal Based AI</span></h1>
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
                <button
                  className="settings-item"
                  onClick={() => { onAbout(); setSettingsOpen(false) }}
                >
                  <FontAwesomeIcon icon={faCircleInfo} fixedWidth />
                  About
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
