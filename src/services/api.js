import axios from 'axios'

export const API_BASE_URL = 'https://api.myquran.com/v3'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
  },
})

export async function fetchJson(path, signal) {
  try {
    const response = await api.get(path, { signal })
    const payload = response.data

    if (payload?.status === false) {
      throw new Error(payload?.message || 'Permintaan ke API gagal.')
    }

    return payload
  } catch (error) {
    if (axios.isCancel(error) || error?.name === 'CanceledError' || error?.name === 'AbortError') {
      throw error
    }

    const apiMessage = error?.response?.data?.message
    if (typeof apiMessage === 'string' && apiMessage.trim().length > 0) {
      throw new Error(apiMessage.trim())
    }

    if (error?.response) {
      throw new Error(`Permintaan gagal (${error.response.status}).`)
    }

    throw new Error(error?.message || 'Gagal terhubung ke server myQuran.')
  }
}
