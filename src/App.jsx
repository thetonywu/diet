import { Routes, Route } from 'react-router-dom'
import ChatPage from './pages/ChatPage'
import AboutPage from './pages/AboutPage'
import FaqPage from './pages/FaqPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/101" element={<FaqPage />} />
    </Routes>
  )
}

export default App
