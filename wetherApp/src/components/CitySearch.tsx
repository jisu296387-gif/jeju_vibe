import { useEffect, useRef, useState } from 'react'
import { Search, MapPin, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { searchCity, type GeoResult } from '@/lib/api'

interface CitySearchProps {
  onSelect: (city: GeoResult) => void
}

export function CitySearch({ onSelect }: CitySearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<GeoResult[]>([])
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    setSearching(true)
    const timer = setTimeout(async () => {
      try {
        const found = await searchCity(query)
        setResults(found)
        setOpen(true)
      } catch {
        setResults([])
      } finally {
        setSearching(false)
      }
    }, 350)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full sm:w-64">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      {searching && (
        <Loader2 className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
      )}
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        placeholder="도시 이름 검색 (예: 서귀포)"
        className="pl-9"
      />
      {open && results.length > 0 && (
        <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-md border bg-popover shadow-lg">
          {results.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                onSelect(r)
                setQuery('')
                setResults([])
                setOpen(false)
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground"
            >
              <MapPin className="size-4 shrink-0 text-muted-foreground" />
              <span>{r.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {[r.admin1, r.country].filter(Boolean).join(', ')}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
