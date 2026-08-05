export type AqiGrade = 'good' | 'moderate' | 'bad' | 'veryBad'

const GRADE_ORDER: AqiGrade[] = ['good', 'moderate', 'bad', 'veryBad']

export function gradePm10(value: number): AqiGrade {
  if (value <= 30) return 'good'
  if (value <= 80) return 'moderate'
  if (value <= 150) return 'bad'
  return 'veryBad'
}

export function gradePm25(value: number): AqiGrade {
  if (value <= 15) return 'good'
  if (value <= 35) return 'moderate'
  if (value <= 75) return 'bad'
  return 'veryBad'
}

export function worstGrade(a: AqiGrade, b: AqiGrade): AqiGrade {
  return GRADE_ORDER[Math.max(GRADE_ORDER.indexOf(a), GRADE_ORDER.indexOf(b))]
}

export const GRADE_LABEL: Record<AqiGrade, string> = {
  good: '좋음',
  moderate: '보통',
  bad: '나쁨',
  veryBad: '매우 나쁨',
}

export const GRADE_COLOR: Record<AqiGrade, string> = {
  good: 'border-sky-500/30 bg-sky-500/15 text-sky-600 dark:text-sky-400',
  moderate: 'border-emerald-500/30 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  bad: 'border-orange-500/30 bg-orange-500/15 text-orange-600 dark:text-orange-400',
  veryBad: 'border-red-500/30 bg-red-500/15 text-red-600 dark:text-red-400',
}

export const GRADE_BAR_COLOR: Record<AqiGrade, string> = {
  good: 'bg-sky-500',
  moderate: 'bg-emerald-500',
  bad: 'bg-orange-500',
  veryBad: 'bg-red-500',
}
