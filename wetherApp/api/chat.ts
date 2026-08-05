import type { VercelRequest, VercelResponse } from '@vercel/node'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { message, weatherContext, history } = req.body as {
    message?: unknown
    weatherContext?: unknown
    history?: ChatMessage[]
  }

  if (typeof message !== 'string' || !message.trim()) {
    res.status(400).json({ error: 'message is required' })
    return
  }

  const safeHistory = Array.isArray(history)
    ? history
        .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
        .slice(-10)
    : []

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 1024,
      thinking: { type: 'disabled' },
      output_config: { effort: 'low' },
      system:
        '당신은 제주 날씨 웹앱에 내장된 챗봇 도우미입니다. 아래 실시간 날씨 데이터를 참고해서 사용자 질문에 한국어로 친절하고 간결하게 답하세요. ' +
        '우산이 필요한지, 옷차림, 야외활동 여부 같은 질문에는 데이터를 근거로 실용적인 조언을 주세요. ' +
        '주어진 데이터에 없는 내용(다른 지역 날씨, 미래 예측 등)은 추측하지 말고 모른다고 답하세요.\n\n' +
        `[현재 날씨 데이터]\n${typeof weatherContext === 'string' && weatherContext ? weatherContext : '날씨 데이터를 아직 불러오지 못했습니다.'}`,
      messages: [...safeHistory.map((m) => ({ role: m.role, content: m.content })), { role: 'user', content: message }],
    })

    const textBlock = response.content.find((block) => block.type === 'text')
    res.status(200).json({ reply: textBlock && textBlock.type === 'text' ? textBlock.text : '' })
  } catch (err) {
    console.error('chat api error', err)
    res.status(500).json({ error: '챗봇 응답을 가져오지 못했습니다' })
  }
}
