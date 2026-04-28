import { useState, useEffect } from 'react'

function useCountry(code) {
  // 1. declare state for: country, loading (start true), error
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // 2. if no code, return early
    if (!code) {
      setCountry(null)
      setLoading(false)
      setError(null)
      return
    }

    // 3. reset loading and error before each fetch
    setLoading(true)
    setError(null)

    // 4. fetch from https://restcountries.com/v3.1/alpha/${code}
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch country with code: ${code}`)
        }
        return res.json()
      })
      .then((data) => {
        // the response is an array — store data[0] in country state
        setCountry(data[0])
      })
      .catch((err) => {
        // catch errors and store the message in error state
        setError(err.message)
        setCountry(null)
      })
      .finally(() => {
        // always turn off loading in finally
        setLoading(false)
      })
  }, [code]) // re-runs whenever code changes

  // 5. return { country, loading, error }
  return { country, loading, error }
}

export default useCountry