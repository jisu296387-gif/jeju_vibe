import { useMemo, useState } from 'react'
import { MapPin } from 'lucide-react'
import { CitySearch } from '@/components/CitySearch'
import { UnitToggle } from '@/components/UnitToggle'
import { CurrentWeatherCard } from '@/components/CurrentWeatherCard'
import { AirQualityCard } from '@/components/AirQualityCard'
import { HourlyForecast } from '@/components/HourlyForecast'
import { DailyForecast } from '@/components/DailyForecast'
import { Skeleton } from '@/components/ui/skeleton'
import { useWeather } from '@/hooks/useWeather'
import type { TemperatureUnit } from '@/lib/units'

function App() {
  const { city, setCity, data, loading, error } = useWeather()
  const [unit, setUnit] = useState<TemperatureUnit>('C')

  const cityLabel = useMemo(() => [city.name, city.admin1].filter(Boolean).join(', '), [city])

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
        <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">날씨</h1>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-3.5" />
              {cityLabel}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <CitySearch onSelect={setCity} />
            <UnitToggle unit={unit} onChange={setUnit} />
          </div>
        </header>

        {error && (
          <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {loading || !data ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-48 w-full rounded-xl" />
            </div>
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <CurrentWeatherCard current={data.current} today={data.daily[0]} unit={unit} cityLabel={cityLabel} />
              <AirQualityCard airQuality={data.airQuality} />
            </div>
            <HourlyForecast hourly={data.hourly} unit={unit} />
            <DailyForecast daily={data.daily} unit={unit} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
