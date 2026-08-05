import type { WeatherBundle } from '@/lib/api'
import { getWeatherInfo } from '@/lib/weatherCodes'
import { formatTemp, type TemperatureUnit } from '@/lib/units'
import { GRADE_LABEL, gradePm10, gradePm25, worstGrade } from '@/lib/airQuality'

export function buildWeatherContext(data: WeatherBundle, cityLabel: string, unit: TemperatureUnit): string {
  const { current, daily, airQuality } = data
  const { label } = getWeatherInfo(current.weatherCode, current.isDay)
  const today = daily[0]

  const lines = [
    `지역: ${cityLabel}`,
    `현재 날씨: ${label}, 기온 ${formatTemp(current.temperature, unit)} (체감 ${formatTemp(current.apparentTemperature, unit)})`,
    `습도 ${current.humidity}%, 풍속 ${Math.round(current.windSpeed)} km/h, 강수량 ${current.precipitation} mm`,
  ]

  if (today) {
    lines.push(
      `오늘 최고/최저 기온: ${formatTemp(today.tempMax, unit)} / ${formatTemp(today.tempMin, unit)}, 강수확률 ${today.precipitationProbability}%`
    )
  }

  if (airQuality.pm10 != null && airQuality.pm25 != null) {
    const grade = worstGrade(gradePm10(airQuality.pm10), gradePm25(airQuality.pm25))
    lines.push(
      `미세먼지 PM10 ${Math.round(airQuality.pm10)}㎍/㎥, 초미세먼지 PM2.5 ${Math.round(airQuality.pm25)}㎍/㎥ (${GRADE_LABEL[grade]})`
    )
  }

  const week = daily
    .slice(0, 7)
    .map((d) => `${formatTemp(d.tempMax, unit)}/${formatTemp(d.tempMin, unit)}`)
    .join(', ')
  lines.push(`7일 예보(최고/최저): ${week}`)

  return lines.join('\n')
}
