import { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateLeft, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import './Header.css'

function Header({ user, onSignIn, onSignOut, onResetChat }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const name = user?.user_metadata?.full_name || user?.user_metadata?.name

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-title">
          <h1><span className="header-title-accent">animalbased.ai</span></h1>
        </Link>
        <div className="header-right">
          <nav className="header-nav">
            <NavLink to="/about" className={({ isActive }) => 'header-nav-link' + (isActive ? ' active' : '')}>About</NavLink>
          </nav>
          {user ? (
            <div className="user-menu" ref={menuRef}>
              <button className="user-menu-btn" onClick={() => setMenuOpen((o) => !o)} aria-label="Account menu">
                {user.user_metadata?.avatar_url
                  ? <img className="user-avatar" src={user.user_metadata.avatar_url} alt="" referrerPolicy="no-referrer" />
                  : <div className="user-avatar-fallback">{user.email[0].toUpperCase()}</div>
                }
              </button>
              {menuOpen && (
                <div className="user-dropdown">
                  <div className="user-dropdown-profile">
                    {user.user_metadata?.avatar_url
                      ? <img className="user-avatar-lg" src={user.user_metadata.avatar_url} alt="" referrerPolicy="no-referrer" />
                      : <div className="user-avatar-fallback-lg">{user.email[0].toUpperCase()}</div>
                    }
                    <div className="user-dropdown-info">
                      {name && <span className="user-dropdown-name">{name}</span>}
                      <span className="user-dropdown-email">{user.email}</span>
                    </div>
                  </div>
                  <div className="user-dropdown-divider" />
                  {onResetChat && (
                    <button className="user-dropdown-item" onClick={() => { onResetChat(); setMenuOpen(false) }}>
                      <FontAwesomeIcon icon={faArrowRotateLeft} fixedWidth />
                      Reset chat
                    </button>
                  )}
                  <button className="user-dropdown-item" onClick={() => { onSignOut(); setMenuOpen(false) }}>
                    <FontAwesomeIcon icon={faRightFromBracket} fixedWidth />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : onSignIn ? (
            <button className="sign-in-link" onClick={onSignIn}>Sign in</button>
          ) : null}
        </div>
      </div>
    </header>
  )
}

export default Header
