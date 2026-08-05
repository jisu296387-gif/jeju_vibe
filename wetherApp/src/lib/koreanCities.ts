import type { GeoResult } from '@/lib/api'

interface KoreanCity extends GeoResult {
  aliases?: string[]
}

// Open-Meteo의 지오코딩 API는 한글 검색어를 인식하지 못해서(로마자 이름만 매칭)
// 자주 찾을 만한 국내 도시는 직접 좌표를 등록해두고 우선 매칭한다.
export const KOREAN_CITIES: KoreanCity[] = [
  { id: 100001, name: '제주시', latitude: 33.4996, longitude: 126.5312, country: '대한민국', admin1: '제주특별자치도', aliases: ['제주'] },
  { id: 100002, name: '서귀포시', latitude: 33.2541, longitude: 126.5601, country: '대한민국', admin1: '제주특별자치도', aliases: ['서귀포'] },
  { id: 100003, name: '애월읍', latitude: 33.4626, longitude: 126.3223, country: '대한민국', admin1: '제주특별자치도' },
  { id: 100004, name: '성산읍', latitude: 33.4587, longitude: 126.9256, country: '대한민국', admin1: '제주특별자치도' },
  { id: 100005, name: '한림읍', latitude: 33.4110, longitude: 126.2697, country: '대한민국', admin1: '제주특별자치도' },
  { id: 100006, name: '표선면', latitude: 33.3253, longitude: 126.8331, country: '대한민국', admin1: '제주특별자치도' },
  { id: 100007, name: '서울특별시', latitude: 37.5665, longitude: 126.9780, country: '대한민국', admin1: '서울', aliases: ['서울'] },
  { id: 100008, name: '부산광역시', latitude: 35.1796, longitude: 129.0756, country: '대한민국', admin1: '부산', aliases: ['부산'] },
  { id: 100009, name: '인천광역시', latitude: 37.4563, longitude: 126.7052, country: '대한민국', admin1: '인천', aliases: ['인천'] },
  { id: 100010, name: '대구광역시', latitude: 35.8714, longitude: 128.6014, country: '대한민국', admin1: '대구', aliases: ['대구'] },
  { id: 100011, name: '대전광역시', latitude: 36.3504, longitude: 127.3845, country: '대한민국', admin1: '대전', aliases: ['대전'] },
  { id: 100012, name: '광주광역시', latitude: 35.1595, longitude: 126.8526, country: '대한민국', admin1: '광주', aliases: ['광주'] },
  { id: 100013, name: '울산광역시', latitude: 35.5384, longitude: 129.3114, country: '대한민국', admin1: '울산', aliases: ['울산'] },
  { id: 100014, name: '수원시', latitude: 37.2636, longitude: 127.0286, country: '대한민국', admin1: '경기도', aliases: ['수원'] },
  { id: 100015, name: '춘천시', latitude: 37.8813, longitude: 127.7298, country: '대한민국', admin1: '강원도', aliases: ['춘천'] },
  { id: 100016, name: '강릉시', latitude: 37.7519, longitude: 128.8761, country: '대한민국', admin1: '강원도', aliases: ['강릉'] },
  { id: 100017, name: '전주시', latitude: 35.8242, longitude: 127.1480, country: '대한민국', admin1: '전라북도', aliases: ['전주'] },
  { id: 100018, name: '여수시', latitude: 34.7604, longitude: 127.6622, country: '대한민국', admin1: '전라남도', aliases: ['여수'] },
  { id: 100019, name: '목포시', latitude: 34.8118, longitude: 126.3922, country: '대한민국', admin1: '전라남도', aliases: ['목포'] },
  { id: 100020, name: '경주시', latitude: 35.8562, longitude: 129.2247, country: '대한민국', admin1: '경상북도', aliases: ['경주'] },
  { id: 100021, name: '포항시', latitude: 36.0190, longitude: 129.3435, country: '대한민국', admin1: '경상북도', aliases: ['포항'] },
]

export function matchKoreanCities(query: string): GeoResult[] {
  const q = query.trim()
  if (!q) return []
  return KOREAN_CITIES.filter(
    (c) => c.name.includes(q) || c.aliases?.some((alias) => alias.includes(q) || q.includes(alias)),
  )
}
