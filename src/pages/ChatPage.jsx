import { useState, useRef, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import ChatMessage from '../components/ChatMessage'
import ChatInput from '../components/ChatInput'
import Header from '../components/Header'
import ComparisonModal from '../components/ComparisonModal'
import { Helmet } from 'react-helmet-async'
import '../App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const COMPARISON_MODE = import.meta.env.VITE_COMPARISON_MODE === 'true'
const PRODUCT_RECS = import.meta.env.VITE_PRODUCT_RECS === 'true'
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 7000

async function withRetry(fn, onFirstFail) {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn()
    } catch (err) {
      if (attempt === MAX_RETRIES) throw err
      if (attempt === 0 && onFirstFail) onFirstFail()
      await new Promise((r) => setTimeout(r, RETRY_DELAY_MS))
    }
  }
}
const STORAGE_KEY = 'diet-chat-history'
const PENDING_MSG_KEY = 'diet-pending-message'
const MAX_MESSAGES = 20

const WELCOME_MESSAGE = {
  role: 'assistant',
  content:
    "Welcome! I'm your animal-based diet assistant. Ask me anything about the animal-based way of eating — foods, meal ideas, nutrition, and more.",
}

const PRESET_MESSAGES = [
  'What is the Animal Based Diet?',
  'What are the benefits?',
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

function ChatPage() {
  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [messages, setMessages] = useState(loadMessages)
  const [isLoading, setIsLoading] = useState(false)
  const [showSignInNudge, setShowSignInNudge] = useState(false)
  const [pendingMessage, setPendingMessage] = useState(() => localStorage.getItem(PENDING_MSG_KEY))
  const [comparisonData, setComparisonData] = useState(null)
  const [failedMessage, setFailedMessage] = useState(null)
  const messagesEndRef = useRef(null)
  const sendMessageRef = useRef(null)

  useEffect(() => {
    const ping = () => fetch(`${API_URL}/health`).catch(() => {})
    ping()
    const onVisibility = () => { if (document.visibilityState === 'visible') ping() }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

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

  useEffect(() => { sendMessageRef.current = sendMessage })

  useEffect(() => {
    if (session && pendingMessage) {
      localStorage.removeItem(PENDING_MSG_KEY)
      setPendingMessage(null)
      setShowSignInNudge(false)
      sendMessageRef.current(pendingMessage, { alreadyAdded: true })
    }
  }, [session, pendingMessage])

  const hasUserMessages = messages.some((msg) => msg.role === 'user')

  const signIn = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const resetChat = () => {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(PENDING_MSG_KEY)
    setMessages([WELCOME_MESSAGE])
    setShowSignInNudge(false)
    setPendingMessage(null)
  }

  const sendMessage = async (text, { alreadyAdded = false } = {}) => {
    setFailedMessage(null)
    const userMessage = { role: 'user', content: text }
    const history = alreadyAdded ? messages.slice(0, -1) : [...messages]
    if (!alreadyAdded) {
      setMessages((prev) => [...prev, userMessage])
    }
    setIsLoading(true)

    try {
      const { data: { session: freshSession } } = await supabase.auth.getSession()

      const headers = { 'Content-Type': 'application/json' }
      if (freshSession) {
        headers.Authorization = `Bearer ${freshSession.access_token}`
      }

      const fetchChat = (use_rag) =>
        fetch(`${API_URL}/api/chat`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ message: text, history, use_rag }),
        })

      const fetchProducts = () => PRODUCT_RECS
        ? fetch(`${API_URL}/api/recommended-products`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ message: text, limit: 3 }),
          }).then((r) => r.ok ? r.json() : { products: [] }).catch(() => ({ products: [] }))
        : Promise.resolve({ products: [] })

      if (COMPARISON_MODE) {
        const [ragRes, noRagRes, productsData] = await withRetry(
          () => Promise.all([fetchChat(true), fetchChat(false), fetchProducts()]),
        )

        if (ragRes.status === 401) {
          await supabase.auth.signOut()
          setSession(null)
          return
        }

        if (ragRes.status === 429 && !freshSession) {
          localStorage.setItem(PENDING_MSG_KEY, text)
          setPendingMessage(text)
          setShowSignInNudge(true)
          return
        }

        if (!ragRes.ok || !noRagRes.ok) throw new Error('Failed to get response')

        const [ragData, noRagData] = await Promise.all([ragRes.json(), noRagRes.json()])
        setMessages((prev) => [...prev, { role: 'assistant', content: ragData.reply, products: productsData.products }])
        setComparisonData({ ragReply: ragData.reply, noRagReply: noRagData.reply })
      } else {
        const [res, productsData] = await withRetry(
          () => Promise.all([fetchChat(true), fetchProducts()]),
        )

        if (res.status === 401) {
          await supabase.auth.signOut()
          setSession(null)
          return
        }

        if (res.status === 429 && !freshSession) {
          localStorage.setItem(PENDING_MSG_KEY, text)
          setPendingMessage(text)
          setShowSignInNudge(true)
          return
        }

        if (!res.ok) throw new Error('Failed to get response')

        const data = await res.json()
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply, products: productsData.products }])
      }
    } catch {
      if (!alreadyAdded) setMessages((prev) => prev.slice(0, -1))
      setFailedMessage(text)
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

  return (
    <div className="app">
      <Helmet>
        <title>Animal Based AI</title>
        <meta name="description" content="Ask anything about the animal-based or carnivore diet. Get instant answers on nutrition, beef, organ meats, and how to eat ancestrally." />
        <link rel="canonical" href="https://animalbased.ai" />
      </Helmet>
      <Header user={session?.user} onSignIn={signIn} onSignOut={signOut} onResetChat={resetChat} />
      <main className="chat-container">
        <div className="messages">
          {messages.map((msg, i) => (
            <ChatMessage key={i} role={msg.role} content={msg.content} products={msg.products} />
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
          {failedMessage && !isLoading && (
            <div className="message user failed">
              {failedMessage}
              <div className="message-failed-row">
                <span className="message-failed-label">Failed to send</span>
                <button className="message-retry-btn" onClick={() => sendMessage(failedMessage)}>Retry</button>
              </div>
            </div>
          )}
          {showSignInNudge && (
            <div className="sign-in-nudge">
              <p>You've reached the free message limit. Sign in to keep chatting — it's free.</p>
              <button className="nudge-sign-in-btn" onClick={signIn}><FontAwesomeIcon icon={faGoogle} /> Sign in with Google</button>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </main>
      {comparisonData && (
        <ComparisonModal
          ragReply={comparisonData.ragReply}
          noRagReply={comparisonData.noRagReply}
          onClose={() => setComparisonData(null)}
        />
      )}
    </div>
  )
}

export default ChatPage
