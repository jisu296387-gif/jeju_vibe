import type { WeatherCategory } from '@/lib/weatherCodes'

export interface WeatherTheme {
  gradient: string
  iconColor: string
  accentText: string
  badgeClass: string
}

const THEMES: Record<WeatherCategory, WeatherTheme> = {
  clearDay: {
    gradient:
      'bg-gradient-to-br from-amber-100 via-orange-50 to-sky-100 dark:from-amber-500/15 dark:via-orange-500/10 dark:to-sky-500/10',
    iconColor: 'text-amber-500 dark:text-amber-400',
    accentText: 'text-amber-700 dark:text-amber-300',
    badgeClass: 'border-amber-500/30 bg-amber-500/15 text-amber-700 dark:text-amber-300',
  },
  clearNight: {
    gradient:
      'bg-gradient-to-br from-indigo-100 via-violet-50 to-slate-100 dark:from-indigo-500/20 dark:via-violet-500/15 dark:to-slate-900/40',
    iconColor: 'text-indigo-500 dark:text-indigo-300',
    accentText: 'text-indigo-700 dark:text-indigo-300',
    badgeClass: 'border-indigo-500/30 bg-indigo-500/15 text-indigo-700 dark:text-indigo-300',
  },
  cloudy: {
    gradient:
      'bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 dark:from-slate-600/25 dark:via-slate-500/10 dark:to-slate-800/30',
    iconColor: 'text-slate-500 dark:text-slate-300',
    accentText: 'text-slate-700 dark:text-slate-300',
    badgeClass: 'border-slate-500/30 bg-slate-500/15 text-slate-700 dark:text-slate-300',
  },
  fog: {
    gradient:
      'bg-gradient-to-br from-zinc-100 via-zinc-50 to-slate-100 dark:from-zinc-600/20 dark:via-zinc-500/10 dark:to-zinc-800/30',
    iconColor: 'text-zinc-500 dark:text-zinc-300',
    accentText: 'text-zinc-700 dark:text-zinc-300',
    badgeClass: 'border-zinc-500/30 bg-zinc-500/15 text-zinc-700 dark:text-zinc-300',
  },
  drizzle: {
    gradient:
      'bg-gradient-to-br from-sky-100 via-blue-50 to-slate-100 dark:from-sky-500/20 dark:via-blue-500/10 dark:to-slate-800/30',
    iconColor: 'text-sky-500 dark:text-sky-300',
    accentText: 'text-sky-700 dark:text-sky-300',
    badgeClass: 'border-sky-500/30 bg-sky-500/15 text-sky-700 dark:text-sky-300',
  },
  rain: {
    gradient:
      'bg-gradient-to-br from-blue-100 via-sky-50 to-slate-200 dark:from-blue-500/25 dark:via-sky-500/10 dark:to-slate-900/40',
    iconColor: 'text-blue-500 dark:text-blue-300',
    accentText: 'text-blue-700 dark:text-blue-300',
    badgeClass: 'border-blue-500/30 bg-blue-500/15 text-blue-700 dark:text-blue-300',
  },
  snow: {
    gradient:
      'bg-gradient-to-br from-sky-50 via-cyan-50 to-white dark:from-cyan-500/15 dark:via-sky-500/10 dark:to-slate-800/30',
    iconColor: 'text-cyan-500 dark:text-cyan-300',
    accentText: 'text-cyan-700 dark:text-cyan-300',
    badgeClass: 'border-cyan-500/30 bg-cyan-500/15 text-cyan-700 dark:text-cyan-300',
  },
  storm: {
    gradient:
      'bg-gradient-to-br from-violet-100 via-purple-50 to-slate-200 dark:from-violet-600/25 dark:via-purple-600/15 dark:to-slate-900/50',
    iconColor: 'text-violet-500 dark:text-violet-300',
    accentText: 'text-violet-700 dark:text-violet-300',
    badgeClass: 'border-violet-500/30 bg-violet-500/15 text-violet-700 dark:text-violet-300',
  },
}

export function getWeatherTheme(category: WeatherCategory): WeatherTheme {
  return THEMES[category]
}
