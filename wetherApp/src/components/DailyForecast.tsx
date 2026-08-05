import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getWeatherInfo, getWeatherCategory } from '@/lib/weatherCodes'
import { getWeatherTheme } from '@/lib/weatherTheme'
import { formatTemp, type TemperatureUnit } from '@/lib/units'
import { Umbrella } from 'lucide-react'
import type { DailyItem } from '@/lib/api'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

interface DailyForecastProps {
  daily: DailyItem[]
  unit: TemperatureUnit
}

export function DailyForecast({ daily, unit }: DailyForecastProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal text-muted-foreground">7일 예보</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {daily.map((d, i) => {
            const { icon: Icon, label } = getWeatherInfo(d.weatherCode, true)
            const theme = getWeatherTheme(getWeatherCategory(d.weatherCode, true))
            const date = new Date(d.date)
            const dayLabel = i === 0 ? '오늘' : WEEKDAYS[date.getDay()]
            return (
              <div
                key={d.date}
                className="flex min-w-[104px] flex-1 flex-col items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-4 text-center"
              >
                <span className="text-sm font-medium">{dayLabel}</span>
                <span className="text-xs text-muted-foreground">
                  {date.getMonth() + 1}/{date.getDate()}
                </span>
                <Icon className={`size-7 ${theme.iconColor}`} strokeWidth={1.5} aria-label={label} />
                <span className="flex items-center gap-0.5 text-xs text-sky-600 dark:text-sky-400">
                  <Umbrella className="size-3" />
                  {d.precipitationProbability}%
                </span>
                <span className="text-sm">
                  <span className="font-semibold">{formatTemp(d.tempMax, unit)}</span>
                  <span className="text-muted-foreground"> / {formatTemp(d.tempMin, unit)}</span>
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
