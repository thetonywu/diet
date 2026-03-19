import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/Header'
import '../components/AboutPage.css'
import './FaqPage.css'

const FAQS = [
  {
    q: 'What is the animal-based diet?',
    a: 'The animal-based diet is a way of eating that prioritizes animal foods — meat, organs, eggs, raw dairy, and seafood — as the foundation of nutrition. It also includes fruit and honey for carbohydrates, while avoiding processed foods, seed oils, and most plant foods that contain anti-nutrients.',
  },
  {
    q: 'How is it different from carnivore?',
    a: 'The carnivore diet is strictly animal products only — no plants at all. The animal-based diet is more flexible: it embraces fruit, honey, and raw dairy alongside meat and organs. Think of animal-based as a broader, more sustainable version of carnivore that still keeps plants to a minimum.',
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
    q: 'Is the animal-based diet the same as the carnivore diet?',
    a: 'No, though they overlap. Carnivore means zero plant foods. Animal-based allows fruit, honey, and raw dairy on top of the animal food foundation. Both diets eliminate processed foods and seed oils.',
  },
  {
    q: 'Can I eat fruit on the carnivore diet?',
    a: 'On strict carnivore, no — fruit is excluded. However, on an animal-based diet, fruit is actively encouraged as a clean carbohydrate source. If you want to include fruit, animal-based is likely a better fit than pure carnivore.',
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
  const navigate = useNavigate()

  return (
    <div className="app">
      <Header onBack={() => navigate(-1)} />
      <div className="about-page">
        <div className="about-content faq-content">
          <button className="about-back" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faChevronLeft} />
            Back
          </button>

          <h2>Animal Based 101</h2>
          <p>Everything you need to know to get started with the animal-based diet.</p>

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
    </div>
  )
}

export default FaqPage
