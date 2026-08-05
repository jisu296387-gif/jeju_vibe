import { useCallback, useEffect, useState } from 'react'
import { fetchWeather, type GeoResult, type WeatherBundle } from '@/lib/api'

const DEFAULT_CITY: GeoResult = {
  id: 1846266,
  name: '제주시',
  latitude: 33.4996,
  longitude: 126.5312,
  country: '대한민국',
  admin1: '제주특별자치도',
}

export function useWeather() {
  const [city, setCity] = useState<GeoResult>(DEFAULT_CITY)
  const [data, setData] = useState<WeatherBundle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async (target: GeoResult) => {
    setLoading(true)
    setError(null)
    try {
      const bundle = await fetchWeather(target.latitude, target.longitude)
      setData(bundle)
    } catch (e) {
      setError(e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load(city)
  }, [city, load])

  return { city, setCity, data, loading, error }
}
