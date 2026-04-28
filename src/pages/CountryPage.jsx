import { useParams, useNavigate } from 'react-router-dom'
import useCountry from '../hooks/useCountry'
import '../styles/App.css'

function CountryPage() {
  // 1. read the country code from the URL with useParams
  const { code } = useParams()

  // 2. set up navigate with useNavigate
  const navigate = useNavigate()

  // 3. call useCountry(code) and destructure country, loading, error
  const { country, loading, error } = useCountry(code)

  // 4. handle loading state — return a status paragraph
  if (loading) return <p className="status">Loading country data...</p>

  // 5. handle error state — return an error paragraph
  if (error) return <p className="error">Error: {error}</p>

  // 6. handle null country — return null
  if (!country) return null

  // 7. destructure the fields you need from country
  const {
    name,
    flags,
    population,
    region,
    subregion,
    capital,
    languages,
    currencies,
    borders,
  } = country

  // 8. convert languages (object) to an array of names
  const languageList = languages ? Object.values(languages) : []

  // 9. convert currencies (object) to an array of names
  const currencyList = currencies
    ? Object.values(currencies).map((c) => c.name)
    : []

  return (
    <div className="country-page">
      {/* back button — calls navigate(-1) on click */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="country-page__layout">
        {/* flag image with alt text */}
        <img
          src={flags.svg}
          alt={`${name.common} flag`}
          className="country-page__flag"
        />

        <div className="country-page__info">
          {/* country common name as h2 */}
          <h2>{name.common}</h2>
          {/* official name as a paragraph */}
          <p>Official: {name.official}</p>

          <div className="country-page__details">
            {/* left column */}
            <div className="details-left">
              <p>Population: {population.toLocaleString()}</p>
              <p>Region: {region}</p>
              <p>Subregion: {subregion}</p>
              <p>Capital: {capital?.[0] ?? 'N/A'}</p>
            </div>

            {/* right column */}
            <div className="details-right">
              <p>Languages: {languageList.join(', ') || 'N/A'}</p>
              <p>Currencies: {currencyList.join(', ') || 'N/A'}</p>
            </div>
          </div>

          {/* borders section */}
          {borders && borders.length > 0 && (
            <div className="borders">
              <h3>Borders:</h3>
              {borders.map((border) => (
                <span key={border} className="border-badge">
                  {border}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CountryPage