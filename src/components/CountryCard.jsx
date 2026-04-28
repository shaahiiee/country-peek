import { Link } from 'react-router-dom'

function CountryCard({ country }) {
  // destructuring country data
  const { name, flags, population, region, capital, cca3 } = country

  return (
    <Link to={`/country/${cca3}`} className="card">
      {/* Flag */}
      <img
        src={flags.svg}
        alt={name.common}
        className="card__flag"
      />

      {/* Card body */}
      <div className="card__body">
        <h3 className="card__name">{name.common}</h3>
        <p><strong>Population:</strong> {population.toLocaleString()}</p>
        <p><strong>Region:</strong> {region}</p>
        <p><strong>Capital:</strong> {capital?.[0] ?? 'N/A'}</p>
      </div>
    </Link>
  )
}

export default CountryCard