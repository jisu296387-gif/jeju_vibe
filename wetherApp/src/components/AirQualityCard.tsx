import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Gauge } from 'lucide-react'
import {
  GRADE_BAR_COLOR,
  GRADE_COLOR,
  GRADE_LABEL,
  gradePm10,
  gradePm25,
  worstGrade,
  type AqiGrade,
} from '@/lib/airQuality'
import type { AirQuality } from '@/lib/api'

const PM25_SCALE_MAX = 75
const PM10_SCALE_MAX = 150

export function AirQualityCard({ airQuality }: { airQuality: AirQuality }) {
  const hasData = airQuality.pm10 != null && airQuality.pm25 != null
  const overallGrade = hasData ? worstGrade(gradePm10(airQuality.pm10!), gradePm25(airQuality.pm25!)) : null

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-normal text-muted-foreground">
          <span className="flex items-center gap-2">
            <Gauge className="size-4" />
            미세먼지
          </span>
          {overallGrade && (
            <Badge variant="outline" className={GRADE_COLOR[overallGrade]}>
              {GRADE_LABEL[overallGrade]}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <div className="grid h-full grid-cols-2 gap-3">
            <PmStat
              label="초미세먼지 (PM2.5)"
              value={airQuality.pm25!}
              grade={gradePm25(airQuality.pm25!)}
              max={PM25_SCALE_MAX}
            />
            <PmStat
              label="미세먼지 (PM10)"
              value={airQuality.pm10!}
              grade={gradePm10(airQuality.pm10!)}
              max={PM10_SCALE_MAX}
            />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">미세먼지 정보를 가져올 수 없습니다.</p>
        )}
      </CardContent>
    </Card>
  )
}

function PmStat({ label, value, grade, max }: { label: string; value: number; grade: AqiGrade; max: number }) {
  return (
    <div className="flex flex-col justify-center gap-1.5 rounded-lg bg-muted/50 px-3 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold">
        {Math.round(value)} <span className="text-xs font-normal text-muted-foreground">µg/m³</span>
      </p>
      <Progress value={Math.min(100, (value / max) * 100)} indicatorClassName={GRADE_BAR_COLOR[grade]} />
      <span className={`inline-block w-fit rounded border px-1.5 py-0.5 text-xs ${GRADE_COLOR[grade]}`}>
        {GRADE_LABEL[grade]}
      </span>
    </div>
  )
}
