import './Header.css'

function Header({ user, onSignOut }) {
  return (
    <header className="header">
      <div className="header-content">
        <div>
          <h1>Animal Based AI</h1>
        </div>
        {user && (
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
        )}
      </div>
    </header>
  )
}

export default Header
