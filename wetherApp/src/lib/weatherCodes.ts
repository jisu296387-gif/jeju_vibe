import {
  Sun,
  MoonStar,
  CloudSun,
  CloudMoon,
  Cloud,
  Cloudy,
  CloudFog,
  Eye,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudSunRain,
  CloudMoonRain,
  CloudSnow,
  Snowflake,
  CloudLightning,
  CloudHail,
  type LucideIcon,
} from 'lucide-react'

export interface WeatherCodeInfo {
  label: string
  icon: LucideIcon
}

const WEATHER_CODES: Record<number, WeatherCodeInfo> = {
  0: { label: '맑음', icon: Sun },
  1: { label: '대체로 맑음', icon: CloudSun },
  2: { label: '구름 조금', icon: Cloud },
  3: { label: '흐림', icon: Cloudy },
  45: { label: '안개', icon: CloudFog },
  48: { label: '짙은 안개', icon: Eye },
  51: { label: '약한 이슬비', icon: CloudDrizzle },
  53: { label: '이슬비', icon: CloudDrizzle },
  55: { label: '강한 이슬비', icon: CloudDrizzle },
  56: { label: '언 이슬비', icon: CloudDrizzle },
  57: { label: '강한 언 이슬비', icon: CloudDrizzle },
  61: { label: '약한 비', icon: CloudRain },
  63: { label: '비', icon: CloudRain },
  65: { label: '강한 비', icon: CloudRainWind },
  66: { label: '언 비', icon: CloudRain },
  67: { label: '강한 언 비', icon: CloudRainWind },
  71: { label: '약한 눈', icon: CloudSnow },
  73: { label: '눈', icon: CloudSnow },
  75: { label: '강한 눈', icon: CloudSnow },
  77: { label: '싸락눈', icon: Snowflake },
  80: { label: '약한 소나기', icon: CloudSunRain },
  81: { label: '소나기', icon: CloudSunRain },
  82: { label: '강한 소나기', icon: CloudRainWind },
  85: { label: '약한 눈 소나기', icon: CloudSnow },
  86: { label: '강한 눈 소나기', icon: CloudSnow },
  95: { label: '뇌우', icon: CloudLightning },
  96: { label: '우박 동반 뇌우', icon: CloudHail },
  99: { label: '강한 우박 동반 뇌우', icon: CloudHail },
}

// 맑은 계열은 낮/밤에 따라 해·구름·달 아이콘이 달라 보이도록 야간 전용 아이콘을 따로 둔다.
const NIGHT_ICON_OVERRIDES: Partial<Record<number, LucideIcon>> = {
  0: MoonStar,
  1: CloudMoon,
  80: CloudMoonRain,
  81: CloudMoonRain,
}

const FALLBACK: WeatherCodeInfo = { label: '알 수 없음', icon: Cloud }

export function getWeatherInfo(code: number, isDay = true): WeatherCodeInfo {
  const info = WEATHER_CODES[code] ?? FALLBACK
  if (!isDay && NIGHT_ICON_OVERRIDES[code]) {
    return { ...info, icon: NIGHT_ICON_OVERRIDES[code]! }
  }
  return info
}

export type WeatherCategory =
  | 'clearDay'
  | 'clearNight'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'storm'

type BaseCategory = Exclude<WeatherCategory, 'clearDay' | 'clearNight'> | 'clear'

const CODE_BASE_CATEGORY: Record<number, BaseCategory> = {
  0: 'clear',
  1: 'clear',
  2: 'cloudy',
  3: 'cloudy',
  45: 'fog',
  48: 'fog',
  51: 'drizzle',
  53: 'drizzle',
  55: 'drizzle',
  56: 'drizzle',
  57: 'drizzle',
  61: 'rain',
  63: 'rain',
  65: 'rain',
  66: 'rain',
  67: 'rain',
  71: 'snow',
  73: 'snow',
  75: 'snow',
  77: 'snow',
  80: 'rain',
  81: 'rain',
  82: 'rain',
  85: 'snow',
  86: 'snow',
  95: 'storm',
  96: 'storm',
  99: 'storm',
}

export function getWeatherCategory(code: number, isDay: boolean): WeatherCategory {
  const base = CODE_BASE_CATEGORY[code] ?? 'cloudy'
  return base === 'clear' ? (isDay ? 'clearDay' : 'clearNight') : base
}
