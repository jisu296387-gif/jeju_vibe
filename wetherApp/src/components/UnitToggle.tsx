import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { TemperatureUnit } from '@/lib/units'

interface UnitToggleProps {
  unit: TemperatureUnit
  onChange: (unit: TemperatureUnit) => void
}

export function UnitToggle({ unit, onChange }: UnitToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={unit}
      onValueChange={(v) => v && onChange(v as TemperatureUnit)}
      className="shrink-0"
      variant="outline"
    >
      <ToggleGroupItem value="C" aria-label="섭씨">
        °C
      </ToggleGroupItem>
      <ToggleGroupItem value="F" aria-label="화씨">
        °F
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
