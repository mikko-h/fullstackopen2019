import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({value, handleChange}) => (
  <div>
    find countries <input value={value} onChange={handleChange} />
  </div>
)

const CountryDetails = ({country}) => (
  <div>
    <h1>{country.name}</h1>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h2>languages</h2>
    <ul>
      {country.languages.map(language => (<li key={language.iso639_2}>{language.name}</li>))}
    </ul>
    <img src={country.flag} alt="flag" width="100" />
  </div>
)

const CountryListing = ({name, handleShow}) => (
  <div>{name} <button value={name} onClick={handleShow}>show</button></div>
)

const Countries = ({countries, filter, handleShow}) => {
  const filteredCountries = countries.filter(filter)

  if (filteredCountries.length === 1) {
    return (
      <CountryDetails country={filteredCountries[0]} />
    )
  } else if (filteredCountries.length <= 10) {
    return filteredCountries.map(country => (
      <CountryListing key={country.numericCode} name={country.name} handleShow={handleShow} />
    ))
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
      <Filter value={nameFilter} handleChange={handleFilterChange} />
      <Countries countries={countries} filter={countryFilter} handleShow={handleFilterChange} />
    </div>
  )
}

export default App;
