import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Droplets, Wind, Thermometer, CloudRain, type LucideIcon } from 'lucide-react'
import { getWeatherInfo } from '@/lib/weatherCodes'
import { formatTemp, type TemperatureUnit } from '@/lib/units'
import type { CurrentWeather, DailyItem } from '@/lib/api'

interface CurrentWeatherCardProps {
  current: CurrentWeather
  today: DailyItem | undefined
  unit: TemperatureUnit
  cityLabel: string
}

export function CurrentWeatherCard({ current, today, unit, cityLabel }: CurrentWeatherCardProps) {
  const { label, icon: Icon } = getWeatherInfo(current.weatherCode)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-normal text-muted-foreground">
          <span>오늘 날씨</span>
          <span className="truncate">{cityLabel}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex shrink-0 items-center gap-4">
          <Icon className="size-14 text-primary" strokeWidth={1.5} />
          <div>
            <p className="text-5xl font-semibold tracking-tight">{formatTemp(current.temperature, unit)}</p>
            <p className="text-sm text-muted-foreground">
              {label}
              {today ? ` · ${formatTemp(today.tempMax, unit)} / ${formatTemp(today.tempMin, unit)}` : ''}
            </p>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-2 sm:border-l sm:pl-5">
          <Stat icon={Thermometer} label="체감 온도" value={formatTemp(current.apparentTemperature, unit)} />
          <Stat icon={Droplets} label="습도" value={`${current.humidity}%`} />
          <Stat icon={Wind} label="풍속" value={`${Math.round(current.windSpeed)} km/h`} />
          <Stat icon={CloudRain} label="강수량" value={`${current.precipitation} mm`} />
        </div>
      </CardContent>
    </Card>
  )
}

function Stat({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
      <Icon className="size-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0 leading-tight">
        <p className="truncate text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}
