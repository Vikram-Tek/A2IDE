'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2, Zap, ChevronDown } from 'lucide-react'

type Message = { role: 'user' | 'assistant'; content: string; ts: Date }

const MODELS = ['claude-sonnet-4-6', 'claude-opus-4-6', 'gemini-3.5-flash']

export function AgentPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'A2IDE agent ready. I can help you scaffold code, run evals, invoke tools, and manage skills. What would you like to build?',
      ts: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [model, setModel] = useState(MODELS[0])
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input, ts: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    // TODO: wire to ADK orchestrator via /api/agents/chat
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Processing: "${userMsg.content}"\n\nThis will route through the ADK orchestrator → skill execution agent → Claude (${model}).`,
        ts: new Date(),
      }])
      setLoading(false)
    }, 1200)
  }

  return (
    <div className="h-full flex flex-col bg-ide-surface border-l border-ide-border">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-ide-border shrink-0">
        <div className="flex items-center gap-2">
          <Zap size={13} className="text-brand-green" />
          <span className="text-xs font-medium text-ide-text">Agent</span>
        </div>
        <div className="relative">
          <select
            value={model}
            onChange={e => setModel(e.target.value)}
            className="appearance-none text-xs bg-ide-bg border border-ide-border text-ide-muted rounded px-2 py-1 pr-5 cursor-pointer hover:border-brand-green/40 transition-colors"
          >
            {MODELS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <ChevronDown size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-ide-muted pointer-events-none" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5
              ${msg.role === 'assistant' ? 'bg-brand-green/10' : 'bg-brand-teal/10'}`}>
              {msg.role === 'assistant'
                ? <Bot size={12} className="text-brand-green" />
                : <User size={12} className="text-brand-teal" />
              }
            </div>
            <div className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed
              ${msg.role === 'assistant'
                ? 'bg-ide-bg text-ide-text border border-ide-border'
                : 'bg-brand-green/10 text-ide-text border border-brand-green/20'
              }`}>
              <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
              <span className="text-ide-muted text-[10px] mt-1 block">
                {msg.ts.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0">
              <Bot size={12} className="text-brand-green" />
            </div>
            <div className="bg-ide-bg border border-ide-border rounded-lg px-3 py-2">
              <Loader2 size={12} className="text-brand-green animate-spin" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-ide-border shrink-0">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }}}
            placeholder="Ask agent to scaffold, eval, or invoke tools…"
            rows={2}
            className="flex-1 bg-ide-bg border border-ide-border rounded-lg px-3 py-2 text-xs text-ide-text placeholder:text-ide-muted resize-none focus:outline-none focus:border-brand-green/50 transition-colors"
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            className="px-3 bg-brand-green/10 border border-brand-green/30 text-brand-green rounded-lg hover:bg-brand-green/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
