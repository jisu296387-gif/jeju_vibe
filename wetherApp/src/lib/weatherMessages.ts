import type { WeatherCategory } from '@/lib/weatherCodes'

const MESSAGE_POOL: Record<WeatherCategory, string[]> = {
  clearDay: [
    '하늘이 활짝 갠 상쾌한 하루예요 ☀️',
    '햇살이 눈부셔요, 나들이하기 좋은 날씨네요',
    '구름 한 점 없이 맑아요. 선크림 챙기세요 😎',
  ],
  clearNight: [
    '별이 잘 보이는 맑은 밤이에요 🌙',
    '고요하고 맑은 밤하늘이 펼쳐져 있어요',
    '선선한 밤바람이 산책하기 좋아요',
  ],
  cloudy: [
    '구름이 하늘을 포근하게 덮고 있어요 ☁️',
    '적당히 흐려서 눈부심 없는 하루예요',
    '흐린 하늘 아래 차분한 하루가 될 것 같아요',
  ],
  fog: [
    '안개가 자욱해요, 시야 확보에 주의하세요 🌫️',
    '몽환적인 안개가 거리를 감쌌어요',
    '앞이 뿌옇게 보여요, 운전은 조심히 하세요',
  ],
  drizzle: [
    '보슬비가 살짝 내려요, 우산을 챙기세요 🌦️',
    '가랑비가 촉촉하게 내리는 중이에요',
    '이슬비에 거리가 촉촉해졌어요',
  ],
  rain: [
    '비가 내려요, 우산 꼭 챙기세요 🌧️',
    '추적추적 비 오는 날, 실내 활동이 좋겠어요',
    '빗소리가 제법 크게 들리는 하루예요',
  ],
  snow: [
    '하얀 눈이 소복소복 내려요 ❄️',
    '눈길 미끄러우니 조심히 다니세요',
    '온 세상이 하얗게 물드는 중이에요',
  ],
  storm: [
    '천둥 번개를 동반한 궂은 날씨예요 ⛈️',
    '강한 비바람이 몰아쳐요, 외출은 자제하세요',
    '거센 뇌우가 지나가는 중이니 안전에 유의하세요',
  ],
}

function tempFlavor(tempC: number): string | null {
  if (tempC >= 33) return '폭염 수준이니 야외활동은 자제하세요 🥵'
  if (tempC >= 28) return '꽤 더우니 수분 보충 잊지 마세요'
  if (tempC <= -5) return '한파가 매섭습니다, 방한 단단히 하세요 🥶'
  if (tempC <= 3) return '쌀쌀하니 겉옷 챙기세요'
  return null
}

export function getWeatherMessage(category: WeatherCategory, tempC: number, seed: number): string {
  const pool = MESSAGE_POOL[category]
  const base = pool[Math.abs(seed) % pool.length]
  const flavor = tempFlavor(tempC)
  return flavor ? `${base} · ${flavor}` : base
}
