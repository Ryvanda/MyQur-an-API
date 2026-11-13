import { fetchJson } from './api'

export async function getSurahDetail(number, page = 1, limit = 100, signal) {
  if (number < 1 || number > 114) {
    throw new Error('Nomor surah harus berada di antara 1 dan 114.')
  }

  return fetchJson(`/quran/${number}?page=${page}&limit=${limit}`, signal)
}