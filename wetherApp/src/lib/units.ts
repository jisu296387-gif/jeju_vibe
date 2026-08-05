export type TemperatureUnit = 'C' | 'F'

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32
}

export function formatTemp(celsius: number, unit: TemperatureUnit): string {
  const value = unit === 'C' ? celsius : celsiusToFahrenheit(celsius)
  return `${Math.round(value)}°`
}
