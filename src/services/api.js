export const API_BASE_URL = 'https://api.myquran.com/v3'

export async function fetchJson(path, signal) {
  const response = await fetch(`${API_BASE_URL}${path}`, { signal })
  let payload = null

  try {
    payload = await response.json()
  } catch {
    throw new Error('Respons dari server tidak dapat dibaca.')
  }

  if (!response.ok || payload?.status === false) {
    throw new Error(payload?.message || `Permintaan gagal (${response.status}).`)
  }

  return payload
}
