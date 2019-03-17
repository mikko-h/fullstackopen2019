import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({value, handleChange}) => (
  <div>
    find countries <input value={value} onChange={handleChange} />
  </div>
)

const Weather = ({weather}) => (
  <div>
    <h2>Weather in {weather.location.name}</h2>
    <div><b>temperature:</b> {weather.current.temp_c} Celsius</div>
    <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
    <div><b>wind:</b> {weather.current.wind_kph} kph direction {weather.current.wind_dir}</div>
  </div>
)

const CountryDetails = ({country, weather}) => (
  <div>
    <h1>{country.name}</h1>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h2>languages</h2>
    <ul>
      {country.languages.map(language => (<li key={language.iso639_2}>{language.name}</li>))}
    </ul>
    <img src={country.flag} alt="flag" width="100" />
    {weather && <Weather weather={weather} />}
  </div>
)

const CountryListing = ({name, handleShow}) => (
  <div>{name} <button value={name} onClick={handleShow}>show</button></div>
)

const Countries = ({countries, handleShow}) => {
  if (countries.length === 1) {
    return null
  } else if (countries.length <= 10) {
    return countries.map(country => (
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
  const [weather, setWeather] = useState(null)

  const handleFilterChange = event => setNameFilter(event.target.value)

  const countryFilter = country => country.name.toLowerCase().indexOf(nameFilter.toLowerCase()) > -1

  const filteredCountries = countries.filter(countryFilter)

  const selectedCountry = filteredCountries.length === 1 ? filteredCountries[0] : undefined

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(`https://api.apixu.com/v1/current.json?key=${process.env.REACT_APP_APIXU_API_KEY}&q=${selectedCountry.capital}`)
        .then(response => setWeather(response.data))
    } else {
      setWeather(null)
    }
  }, [selectedCountry])

  return (
    <div>
      <Filter value={nameFilter} handleChange={handleFilterChange} />
      <Countries countries={filteredCountries} handleShow={handleFilterChange} />
      {selectedCountry && <CountryDetails country={selectedCountry} weather={weather} />}
    </div>
  )
}

export default App;
