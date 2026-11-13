import { fetchJson } from './api'

export async function getSurahs(signal) {
  const response = await fetchJson('/quran', signal)
  return response.data
}
