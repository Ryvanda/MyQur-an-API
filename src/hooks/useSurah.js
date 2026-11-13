import { useCallback, useEffect, useMemo, useState } from 'react'
import { filterSurahsByName, getSurahs } from '../services/surahService.js'

export function useSurah() {
  const [surahs, setSurahs] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const retry = useCallback(() => {
    setLoading(true)
    setError('')
    getSurahs()
      .then((data) => {
        setSurahs(data)
      })
      .catch((requestError) => {
        setError(requestError.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    getSurahs(controller.signal)
      .then((data) => {
        setSurahs(data)
        setError('')
      })
      .catch((requestError) => {
        if (requestError.name !== 'CanceledError' && requestError.name !== 'AbortError') {
          setError(requestError.message)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [])

  const filteredSurahs = useMemo(
    () => filterSurahsByName(surahs, query),
    [query, surahs]
  )

  const isEmpty = !loading && !error && filteredSurahs.length === 0

  return {
    surahs,
    filteredSurahs,
    query,
    setQuery,
    loading,
    error,
    isEmpty,
    retry,
  }
}
