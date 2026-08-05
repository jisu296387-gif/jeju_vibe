import { matchKoreanCities } from '@/lib/koreanCities'

export interface GeoResult {
  id: number
  name: string
  latitude: number
  longitude: number
  country: string
  admin1?: string
}

export async function searchCity(query: string): Promise<GeoResult[]> {
  if (!query.trim()) return []

  // Open-Meteo 지오코딩 API는 한글 검색어를 인식하지 못하므로, 국내 주요 도시는 먼저 로컬 목록에서 찾는다.
  const localMatches = matchKoreanCities(query)
  if (localMatches.length > 0) return localMatches

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=ko&format=json`
  const res = await fetch(url)
  if (!res.ok) throw new Error('도시 검색에 실패했습니다')
  const data = await res.json()
  return (data.results ?? []).map((r: Record<string, unknown>) => ({
    id: r.id as number,
    name: r.name as string,
    latitude: r.latitude as number,
    longitude: r.longitude as number,
    country: r.country as string,
    admin1: r.admin1 as string | undefined,
  }))
}

export interface CurrentWeather {
  temperature: number
  apparentTemperature: number
  humidity: number
  windSpeed: number
  precipitation: number
  weatherCode: number
  time: string
}

export interface HourlyItem {
  time: string
  temperature: number
  precipitationProbability: number
  weatherCode: number
}

export interface DailyItem {
  date: string
  weatherCode: number
  tempMax: number
  tempMin: number
  precipitationProbability: number
  sunrise: string
  sunset: string
}

export interface AirQuality {
  pm10: number | null
  pm25: number | null
}

export interface WeatherBundle {
  current: CurrentWeather
  hourly: HourlyItem[]
  daily: DailyItem[]
  airQuality: AirQuality
}

export async function fetchWeather(latitude: number, longitude: number): Promise<WeatherBundle> {
  const forecastUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
    '&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m' +
    '&hourly=temperature_2m,precipitation_probability,weather_code' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset' +
    '&timezone=auto&forecast_days=7'
  const airQualityUrl =
    `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}` +
    '&current=pm10,pm2_5&timezone=auto'

  const [forecastRes, airRes] = await Promise.all([fetch(forecastUrl), fetch(airQualityUrl)])
  if (!forecastRes.ok) throw new Error('날씨 정보를 불러오지 못했습니다')
  const forecast = await forecastRes.json()
  const air = airRes.ok ? await airRes.json() : null

  const hourlyTimes: string[] = forecast.hourly.time
  const now = new Date(forecast.current.time)
  let startIndex = hourlyTimes.findIndex((t) => new Date(t) >= now)
  if (startIndex === -1) startIndex = 0

  const hourly: HourlyItem[] = hourlyTimes.slice(startIndex, startIndex + 24).map((time, i) => {
    const idx = startIndex + i
    return {
      time,
      temperature: forecast.hourly.temperature_2m[idx],
      precipitationProbability: forecast.hourly.precipitation_probability[idx],
      weatherCode: forecast.hourly.weather_code[idx],
    }
  })

  const daily: DailyItem[] = forecast.daily.time.map((date: string, i: number) => ({
    date,
    weatherCode: forecast.daily.weather_code[i],
    tempMax: forecast.daily.temperature_2m_max[i],
    tempMin: forecast.daily.temperature_2m_min[i],
    precipitationProbability: forecast.daily.precipitation_probability_max[i],
    sunrise: forecast.daily.sunrise[i],
    sunset: forecast.daily.sunset[i],
  }))

  const current: CurrentWeather = {
    temperature: forecast.current.temperature_2m,
    apparentTemperature: forecast.current.apparent_temperature,
    humidity: forecast.current.relative_humidity_2m,
    windSpeed: forecast.current.wind_speed_10m,
    precipitation: forecast.current.precipitation,
    weatherCode: forecast.current.weather_code,
    time: forecast.current.time,
  }

  const airQuality: AirQuality = {
    pm10: air?.current?.pm10 ?? null,
    pm25: air?.current?.pm2_5 ?? null,
  }

  return { current, hourly, daily, airQuality }
}
