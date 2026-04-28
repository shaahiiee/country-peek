import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import CountryCard from '../components/CountryCard'

function Home() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // if query is empty → reset and stop
    if (!query.trim()) {
      setCountries([])
      setError(null)
      return
    }

    const timer = setTimeout(() => {
      setLoading(true)

      fetch(`https://restcountries.com/v3.1/name/${query}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('No countries found')
          }
          return res.json()
        })
        .then((data) => {
          setCountries(data)
          setError(null)
        })
        .catch(() => {
          setCountries([])
          setError('Something went wrong or no results found')
        })
        .finally(() => {
          setLoading(false)
        })
    }, 400)

    // cleanup (debounce)
    return () => clearTimeout(timer)
  }, [query])

  return (
    <div className="home">
      <SearchBar query={query} onQueryChange={setQuery} />

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Error */}
      {error && <p>{error}</p>}

      {/* Countries Grid */}
      {!loading && !error && countries.length > 0 && (
        <div className="cards-grid">
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}

      {/* Default message */}
      {!loading && !error && countries.length === 0 && !query && (
        <p className="home__placeholder">
          Start searching to explore countries.
        </p>
      )}
    </div>
  )
}

export default Home