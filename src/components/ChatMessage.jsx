import ReactMarkdown from 'react-markdown'

function ChatMessage({ role, content }) {
  return (
    <div className={`message ${role}`}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}

export default ChatMessage
