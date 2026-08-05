import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getWeatherInfo, getWeatherCategory } from '@/lib/weatherCodes'
import { getWeatherTheme } from '@/lib/weatherTheme'
import { formatTemp, type TemperatureUnit } from '@/lib/units'
import { Droplet } from 'lucide-react'
import type { HourlyItem } from '@/lib/api'

interface HourlyForecastProps {
  hourly: HourlyItem[]
  unit: TemperatureUnit
}

export function HourlyForecast({ hourly, unit }: HourlyForecastProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal text-muted-foreground">24시간 예보</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {hourly.map((h, i) => {
            const { icon: Icon, label } = getWeatherInfo(h.weatherCode, h.isDay)
            const theme = getWeatherTheme(getWeatherCategory(h.weatherCode, h.isDay))
            const hour = new Date(h.time).getHours()
            const timeLabel = i === 0 ? '지금' : hour === 0 ? '자정' : hour === 12 ? '정오' : `${hour}시`
            return (
              <div
                key={h.time}
                className="flex w-[72px] shrink-0 flex-col items-center gap-1.5 rounded-lg bg-muted/50 px-2 py-3 text-center"
              >
                <span className="text-xs text-muted-foreground">{timeLabel}</span>
                <Icon className={`size-6 ${theme.iconColor}`} strokeWidth={1.5} aria-label={label} />
                <span className="flex items-center gap-0.5 text-xs text-sky-600 dark:text-sky-400">
                  <Droplet className="size-3" />
                  {h.precipitationProbability}%
                </span>
                <span className="text-sm font-semibold">{formatTemp(h.temperature, unit)}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
