import { fetchJson } from './api.js'

export function normalizeSurahName(value = '') {
  return String(value).toLowerCase().replace(/[-\s]/g, '')
}

export async function getSurahs(signal) {
  const response = await fetchJson('/quran', signal)
  return response.data
}

export function filterSurahsByName(surahs = [], query = '') {
  const normalizedQuery = normalizeSurahName(query)
  if (!normalizedQuery) {
    return surahs
  }

  return surahs.filter((surah) =>
    normalizeSurahName(surah.name_latin).includes(normalizedQuery)
  )
}
