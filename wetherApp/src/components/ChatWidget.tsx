import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatWidgetProps {
  weatherContext: string
}

export function ChatWidget({ weatherContext }: ChatWidgetProps) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return

    const priorMessages = messages
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, weatherContext, history: priorMessages }),
      })
      if (!res.ok) throw new Error('요청 실패')
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply || '답변을 가져오지 못했어요.' }])
    } catch {
      setError('챗봇 응답을 가져오지 못했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {open && (
        <Card className="fixed right-4 bottom-24 z-50 flex h-[28rem] w-[22rem] flex-col overflow-hidden shadow-xl sm:right-6">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <p className="text-sm font-medium">날씨 챗봇</p>
            <Button variant="ghost" size="icon-sm" onClick={() => setOpen(false)}>
              <X className="size-4" />
            </Button>
          </div>
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.length === 0 && (
              <p className="text-sm text-muted-foreground">
                지금 날씨나 미세먼지, 우산이 필요한지 등을 물어보세요!
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  m.role === 'user' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Loader2 className="size-3.5 animate-spin" />
                답변 작성 중...
              </div>
            )}
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <div className="flex items-center gap-2 border-t p-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
              placeholder="날씨에 대해 물어보세요"
              disabled={loading}
            />
            <Button size="icon" onClick={sendMessage} disabled={loading || !input.trim()}>
              <Send className="size-4" />
            </Button>
          </div>
        </Card>
      )}
      <Button
        size="icon"
        className="fixed right-4 bottom-6 z-50 size-14 rounded-full shadow-lg sm:right-6"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </Button>
    </>
  )
}
