import { useState, useRef, useEffect } from 'react'
import { supabase } from './supabaseClient'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import Header from './components/Header'
import LoginPage from './components/LoginPage'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const STORAGE_KEY = 'diet-chat-history'
const MAX_MESSAGES = 20

const WELCOME_MESSAGE = {
  role: 'assistant',
  content:
    "Welcome! I'm your animal-based diet assistant. Ask me anything about the animal-based way of eating — foods, meal ideas, nutrition, and more.",
}

const PRESET_MESSAGES = [
  'What is the Animal Based Diet?',
  'What foods should I eat on an animal-based diet?',
  'Give me a simple animal-based meal plan for a day',
]

function loadMessages() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {}
  return [WELCOME_MESSAGE]
}

function saveMessages(messages) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_MESSAGES)))
  } catch {}
}

function App() {
  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [messages, setMessages] = useState(loadMessages)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setAuthLoading(false)
    }).catch(() => {
      setAuthLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    )

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    saveMessages(messages)
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const hasUserMessages = messages.some((msg) => msg.role === 'user')

  const signIn = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem(STORAGE_KEY)
    setMessages([WELCOME_MESSAGE])
  }

  const sendMessage = async (text) => {
    const userMessage = { role: 'user', content: text }
    const history = [...messages]
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const { data: { session: freshSession } } = await supabase.auth.getSession()
      if (!freshSession) {
        setSession(null)
        return
      }

      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${freshSession.access_token}`,
        },
        body: JSON.stringify({
          message: text,
          history: history,
        }),
      })

      if (res.status === 401) {
        await supabase.auth.signOut()
        setSession(null)
        return
      }

      if (!res.ok) throw new Error('Failed to get response')

      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="app">
        <Header />
        <main className="chat-container">
          <div className="loading">Loading...</div>
        </main>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="app">
        <Header />
        <LoginPage onSignIn={signIn} />
      </div>
    )
  }

  return (
    <div className="app">
      <Header user={session.user} onSignOut={signOut} />
      <main className="chat-container">
        <div className="messages">
          {messages.map((msg, i) => (
            <ChatMessage key={i} role={msg.role} content={msg.content} />
          ))}
          {!hasUserMessages && !isLoading && (
            <div className="presets">
              {PRESET_MESSAGES.map((text) => (
                <button
                  key={text}
                  className="preset-btn"
                  onClick={() => sendMessage(text)}
                >
                  {text}
                </button>
              ))}
            </div>
          )}
          {isLoading && (
            <div className="message assistant">
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </main>
    </div>
  )
}

export default App
