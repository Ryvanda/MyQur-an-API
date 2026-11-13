import { fetchJson } from './api.js'

export async function getSurahDetail(number, page = 1, limit = 100, signal) {
  return fetchJson(`/quran/${number}?page=${page}&limit=${limit}`, signal)
}
