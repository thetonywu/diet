import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import '../components/AboutPage.css'
import './FaqPage.css'

const FAQS = [
  {
    q: 'How is it different from carnivore?',
    a: 'The carnivore diet is strictly animal products only — no plants at all. We love the carivore diet too, but we make it more flexible by adding fruit, honey, and raw dairy into the mix. This allow us to enjoy sweet and nutritious foods and provides some carbs to those who need it (carbs are not the enemy!). ',
  },
  {
    q: 'What foods can I eat on an animal-based diet?',
    a: 'The core foods are: beef, lamb, pork, poultry, and other meats; organ meats like liver, heart, and kidney; eggs; raw or minimally processed dairy (raw milk, cheese, butter); seafood and shellfish; fruit and honey for carbs. Foods to minimize or avoid: seed oils, processed foods, grains, legumes, and most vegetables high in oxalates or lectins.',
  },
  {
    q: 'What are the benefits of eating animal-based?',
    a: 'Many people report improvements in energy, mental clarity, digestion, skin, and body composition. Animal foods provide highly bioavailable protein, essential fatty acids, fat-soluble vitamins (A, D, K2), and minerals like zinc and iron in forms the body absorbs efficiently. Reducing seed oils and processed foods removes a major source of chronic inflammation for many people.',
  },
  {
    q: 'What should I eat in a day on an animal-based diet?',
    a: 'A simple day might look like: breakfast — eggs cooked in butter with bacon or beef; lunch — ground beef or a ribeye steak with some fruit; dinner — salmon or lamb with liver pâté and raw cheese. Snacks can be beef jerky, hard-boiled eggs, or fruit. The goal is animal foods at every meal, with fruit and honey as needed for energy.',
  },
  {
    q: 'Is red meat bad for you?',
    a: "The evidence that red meat causes heart disease or cancer is weak and largely based on flawed epidemiological studies that don't distinguish between processed and unprocessed meat. Unprocessed red meat like beef and lamb is nutrient-dense, high in protein, and rich in vitamins and minerals. Many people thrive eating it daily.",
  },
  {
    q: 'Do I need to eat organ meats?',
    a: "Organ meats are optional but highly recommended. Liver in particular is one of the most nutrient-dense foods on the planet — packed with vitamin A, B12, folate, iron, copper, and CoQ10. Even a small serving (2–4 oz) once or twice a week can significantly improve your nutrient intake. If you don't like the taste, try mixing ground liver into ground beef.",
  },
  {
    q: 'Will eating this much meat raise my cholesterol?',
    a: "It often raises LDL, but context matters. Most people also see HDL rise and triglycerides drop — a pattern associated with better metabolic health. The relationship between dietary cholesterol, LDL, and actual cardiovascular outcomes is more nuanced than the mainstream narrative suggests. If you have specific concerns, track your full lipid panel and work with a doctor.",
  },
]

function FaqPage() {
  return (
    <div className="about-page">
      <Helmet>
        <title>Why Animal Based? | Animal Based AI</title>
        <meta name="description" content="Learn why the animal-based and carnivore diet works. Common questions about meat, organ meats, fruit, and how to get started eating ancestrally." />
        <link rel="canonical" href="https://animalbased.ai/why" />
      </Helmet>
      <div className="about-content faq-content">
        <Link to="/" className="about-back">
          <FontAwesomeIcon icon={faHouse} />
          Home
        </Link>

          <h2>Why Animal Based?</h2>
          <p>Honestly, because its the simplest and most satisfying diet thats also extremely healthy. Just eat meat and fruit. That's it.</p>

          <div className="faq-list">
            {FAQS.map(({ q, a }) => (
              <div className="faq-item" key={q}>
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>
      </div>
    </div>
  )
}

export default FaqPage
