import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({handleChange}) => (
  <div>
    find countries <input onChange={handleChange} />
  </div>
)

const Country = ({country}) => (
  <div>
    <h1>{country.name}</h1>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h2>languages</h2>
    <ul>
      {country.languages.map(language => (<li>{language.name}</li>))}
    </ul>
    <img src={country.flag} alt="flag" width="100" />
  </div>
)

const Countries = ({countries, filter}) => {
  const filteredCountries = countries.filter(filter)

  if (filteredCountries.length === 1) {
    return (
      <Country country={filteredCountries[0]} />
    )
  } else if (filteredCountries.length <= 10) {
    return filteredCountries.map(country => (<div key={country.numericCode}>{country.name}</div>))
  }

  return (
    <div>Too many matches, specify another filter</div>
  )
}
  
const App = () => {
  const [countries, setCountries] = useState([])
  const [nameFilter, setNameFilter] = useState('')

  const handleFilterChange = event => setNameFilter(event.target.value)

  const countryFilter = country => country.name.toLowerCase().indexOf(nameFilter.toLowerCase()) > -1

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  return (
    <div>
      <Filter handleChange={handleFilterChange} />
      <Countries countries={countries} filter={countryFilter} />
    </div>
  )
}

export default App;
