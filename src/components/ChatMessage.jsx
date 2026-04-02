import ReactMarkdown from 'react-markdown'

const YT_REGEX = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/g

function extractYouTubeIds(text) {
  const ids = []
  let match
  const re = new RegExp(YT_REGEX.source, 'g')
  while ((match = re.exec(text)) !== null) {
    if (!ids.includes(match[1])) ids.push(match[1])
  }
  return ids
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

function ChatMessage({ role, content }) {
  const ytIds = role === 'assistant' ? extractYouTubeIds(content) : []

  return (
    <div className={`message ${role}`}>
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
      {ytIds.map((id) => (
        <div key={id} className="yt-embed">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ))}
    </div>
  )
}

export default ChatMessage
