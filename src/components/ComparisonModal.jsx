import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import './ComparisonModal.css'

function ComparisonModal({ ragReply, noRagReply, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="comparison-overlay" onClick={onClose}>
      <div className="comparison-modal" onClick={(e) => e.stopPropagation()}>
        <div className="comparison-header">
          <h2>RAG Comparison</h2>
          <button className="comparison-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="comparison-columns">
          <div className="comparison-col">
            <div className="comparison-col-label rag">With RAG</div>
            <div className="comparison-col-body">
              <ReactMarkdown>{ragReply}</ReactMarkdown>
            </div>
          </div>
          <div className="comparison-divider" />
          <div className="comparison-col">
            <div className="comparison-col-label no-rag">Without RAG</div>
            <div className="comparison-col-body">
              <ReactMarkdown>{noRagReply}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComparisonModal
