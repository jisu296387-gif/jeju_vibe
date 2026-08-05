import type { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Droplets,
  Wind,
  Thermometer,
  ThermometerSun,
  ThermometerSnowflake,
  Umbrella,
  type LucideIcon,
} from 'lucide-react'
import { getWeatherInfo, getWeatherCategory } from '@/lib/weatherCodes'
import { getWeatherTheme } from '@/lib/weatherTheme'
import { getWeatherMessage } from '@/lib/weatherMessages'
import { formatTemp, type TemperatureUnit } from '@/lib/units'
import type { CurrentWeather, DailyItem } from '@/lib/api'

interface CurrentWeatherCardProps {
  current: CurrentWeather
  today: DailyItem | undefined
  unit: TemperatureUnit
  cityLabel: string
}

export function CurrentWeatherCard({ current, today, unit, cityLabel }: CurrentWeatherCardProps) {
  const { label, icon: Icon } = getWeatherInfo(current.weatherCode, current.isDay)
  const category = getWeatherCategory(current.weatherCode, current.isDay)
  const theme = getWeatherTheme(category)
  const message = getWeatherMessage(category, current.temperature, new Date(current.time).getHours())
  const apparentIcon =
    current.apparentTemperature >= 25 ? ThermometerSun : current.apparentTemperature <= 5 ? ThermometerSnowflake : Thermometer

  return (
    <Card className={`h-full ${theme.gradient}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-normal text-muted-foreground">
          <span>오늘 날씨</span>
          <span className="truncate">{cityLabel}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex shrink-0 items-center gap-4">
            <Icon className={`size-14 ${theme.iconColor}`} strokeWidth={1.5} />
            <div>
              <p className="text-5xl font-semibold tracking-tight">{formatTemp(current.temperature, unit)}</p>
              <div className="mt-1 flex items-center gap-1.5">
                <Badge variant="outline" className={theme.badgeClass}>
                  {label}
                </Badge>
                {today && (
                  <span className="text-sm text-muted-foreground">
                    {formatTemp(today.tempMax, unit)} / {formatTemp(today.tempMin, unit)}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-2 sm:border-l sm:pl-5">
            <Stat icon={apparentIcon} label="체감 온도" value={formatTemp(current.apparentTemperature, unit)} />
            <Stat icon={Droplets} label="습도" value={`${current.humidity}%`}>
              <Progress value={current.humidity} className="mt-1.5 h-1" />
            </Stat>
            <Stat icon={Wind} label="풍속" value={`${Math.round(current.windSpeed)} km/h`} />
            <Stat icon={Umbrella} label="강수량" value={`${current.precipitation} mm`} />
          </div>
        </div>
        <p className={`text-sm font-medium ${theme.accentText}`}>{message}</p>
      </CardContent>
    </Card>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
  children,
}: {
  icon: LucideIcon
  label: string
  value: string
  children?: ReactNode
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
      <Icon className="size-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0 flex-1 leading-tight">
        <p className="truncate text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
        {children}
      </div>
    </div>
  )
}
