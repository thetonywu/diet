import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import './LoginPage.css'

function LoginPage({ onSignIn }) {
  return (
    <main className="login-page">
      <div className="login-card">
        <h2>Animal Based AI</h2>
        <p>Guiding you on your path to health and wellness. Get started now, it's totally free!</p>
        <button className="google-btn" onClick={onSignIn}>
          <FontAwesomeIcon icon={faGoogle} />
          Sign in with Google
        </button>
      </div>
    </main>
  )
}

export default LoginPage
