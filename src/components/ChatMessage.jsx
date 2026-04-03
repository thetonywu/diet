import ReactMarkdown from 'react-markdown'
import ProductRecs from './ProductRecs'

// Matches full YouTube URLs to preserve query params (t=, start=)
const YT_URL_REGEX = /https?:\/\/(?:www\.)?(?:youtube\.com\/watch[^\s)>"]*|youtu\.be\/[^\s)>"]*|youtube\.com\/embed\/[^\s)>"]*)/g

function parseTimestamp(t) {
  if (!t) return null
  if (/^\d+$/.test(t)) return parseInt(t)
  let secs = 0
  const h = t.match(/(\d+)h/)
  const m = t.match(/(\d+)m/)
  const s = t.match(/(\d+)s/)
  if (h) secs += parseInt(h[1]) * 3600
  if (m) secs += parseInt(m[1]) * 60
  if (s) secs += parseInt(s[1])
  return secs || null
}

function extractYouTubeEmbeds(text) {
  const seen = new Set()
  const embeds = []
  for (const urlStr of text.matchAll(YT_URL_REGEX)) {
    try {
      const url = new URL(urlStr[0])
      let videoId
      if (url.hostname.includes('youtu.be')) {
        videoId = url.pathname.slice(1)
      } else {
        videoId = url.searchParams.get('v') || url.pathname.split('/embed/')[1]
      }
      if (!videoId || seen.has(videoId)) continue
      seen.add(videoId)

      const rawT = url.searchParams.get('t') || url.searchParams.get('start')
      const start = parseTimestamp(rawT)

      const src = `https://www.youtube.com/embed/${videoId}${start ? `?start=${start}` : ''}`
      embeds.push({ videoId, src })
    } catch {}
  }
  return embeds
}

const components = {
  a({ href, children }) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  },
}

function ChatMessage({ role, content, products, failed, onRetry }) {
  const embeds = role === 'assistant' ? extractYouTubeEmbeds(content).slice(0, 1) : []

  return (
    <div className={`message ${role}${failed ? ' failed' : ''}`}>
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
      {failed && (
        <div className="message-failed-row">
          <span className="message-failed-label">Failed to send</span>
          <button className="message-retry-btn" onClick={onRetry}>Retry</button>
        </div>
      )}
      {embeds.map(({ videoId, src }) => (
        <div key={videoId} className="yt-embed">
          <iframe
            src={src}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ))}
      <ProductRecs products={products} />
    </div>
  )
}

export default ChatMessage
