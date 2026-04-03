import { Link, NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import '../components/AboutPage.css'

function AboutPage() {
  return (
    <div className="about-page">
      <Helmet>
        <title>About | Animal Based AI</title>
        <meta name="description" content="About Animal Based AI — a tool built to help people explore the animal-based diet and get quick, practical answers." />
        <link rel="canonical" href="https://animalbased.ai/about" />
      </Helmet>
      <div className="about-content">
        <Link to="/" className="about-back">
          <FontAwesomeIcon icon={faHouse} />
          Home
        </Link>

          <h2>Animal Based AI</h2>
          <p>
            A conversational assistant built to help people explore the animal-based diet — a way of
            eating centered around meat, organs, fruit, honey, and raw dairy while minimizing
            processed foods and seed oils.
          </p>
          <NavLink to="/why" className="about-why-link">Why animal-based? →</NavLink>

          <h3>About me</h3>
          <p>
            I stumbled onto the animal-based diet a couple years ago and it genuinely changed my life. Years of brain fog, digestive issues, and low energy all dramatically started to improve soon after switching. The best part? I actually enjoyed it. It was ridiculously easy to follow, and everything that I ate on the diet was delicious. All I have to do is eat meat and fruit? Sign me up!
          </p>
          <p>
            I built Animal Based AI to make it easier for curious people to get quick, practical answers without digging through hours of podcasts and blog posts. I'm not a doctor or nutritionist — just someone who's experienced the benefits firsthand and wanted to share a useful tool.
          </p>

          <h3>Disclaimer</h3>
          <p>
            This app is for informational purposes only and is not a substitute for professional
            medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider
            before making significant changes to your diet. The AI can make mistakes — verify anything
            important with a professional.
          </p>

          <h3>Contact</h3>
          <p>Questions or feedback? Reach out at <a href="mailto:hello@animalbased.ai" className="about-email-link">hello@animalbased.ai</a></p>
        </div>
    </div>
  )
}

export default AboutPage
