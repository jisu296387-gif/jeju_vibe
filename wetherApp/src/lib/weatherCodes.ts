import {
  Sun,
  CloudSun,
  Cloud,
  Cloudy,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  Snowflake,
  CloudLightning,
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
  48: { label: '짙은 안개', icon: CloudFog },
  51: { label: '약한 이슬비', icon: CloudDrizzle },
  53: { label: '이슬비', icon: CloudDrizzle },
  55: { label: '강한 이슬비', icon: CloudDrizzle },
  56: { label: '언 이슬비', icon: CloudDrizzle },
  57: { label: '강한 언 이슬비', icon: CloudDrizzle },
  61: { label: '약한 비', icon: CloudRain },
  63: { label: '비', icon: CloudRain },
  65: { label: '강한 비', icon: CloudRain },
  66: { label: '언 비', icon: CloudRain },
  67: { label: '강한 언 비', icon: CloudRain },
  71: { label: '약한 눈', icon: CloudSnow },
  73: { label: '눈', icon: CloudSnow },
  75: { label: '강한 눈', icon: CloudSnow },
  77: { label: '싸락눈', icon: Snowflake },
  80: { label: '약한 소나기', icon: CloudRain },
  81: { label: '소나기', icon: CloudRain },
  82: { label: '강한 소나기', icon: CloudRain },
  85: { label: '약한 눈 소나기', icon: CloudSnow },
  86: { label: '강한 눈 소나기', icon: CloudSnow },
  95: { label: '뇌우', icon: CloudLightning },
  96: { label: '우박 동반 뇌우', icon: CloudLightning },
  99: { label: '강한 우박 동반 뇌우', icon: CloudLightning },
}

const FALLBACK: WeatherCodeInfo = { label: '알 수 없음', icon: Cloud }

export function getWeatherInfo(code: number): WeatherCodeInfo {
  return WEATHER_CODES[code] ?? FALLBACK
}
