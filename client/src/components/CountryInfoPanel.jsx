import React from 'react'
import * as API from '../api'

const CountryInfoPanel = () => {
   const [countryName, setCountryName] = React.useState('')
   const [countries, setCountries] = React.useState([])
   const [amounts, setAmounts] = React.useState({})
   const [convertedAmounts, setConvertedAmounts] = React.useState({})
   const bearerToken = localStorage.getItem('token')

   const handleCountrySearchSubmit = async (e) => {
      e.preventDefault()

      try {
         const isCountryAdded = countries.some((country) => country.commonName.toLowerCase() === countryName.toLowerCase())

         if (!isCountryAdded) {
            const data = await API.getCountryByName(countryName, bearerToken)
            setCountries([data, ...countries])
         } else {
            alert('Country already added. You can find on the list below.')
         }
      } catch (error) {
         console.error('Error fetching country:', error)
      }

      setCountryName('')
   }

   const handleCurrencyConvertSubmit = async (e, country) => {
      e.preventDefault()
      const from = country.exchange.baseCurrency
      const to = country.exchange.targetCurrency
      const amount = amounts[country.fullName]

      try {
         const data = await API.convertCurrency(from, to, amount, bearerToken)
         setConvertedAmounts((prevState) => ({ ...prevState, [country.fullName]: data.convertedAmount }))
      } catch (error) {
         console.error('Error fetching converted amount:', error)
      }
   }

   return (
      <>
         <CountrySearchForm
            onSearchSubmit={handleCountrySearchSubmit}
            countryName={countryName}
            setCountryName={setCountryName}
         />
         <CountryListTable
            countries={countries}
            onConvertSubmit={handleCurrencyConvertSubmit}
            amounts={amounts}
            setAmounts={setAmounts}
            convertedAmounts={convertedAmounts}
         />
      </>
   )
}

export default CountryInfoPanel

const CountrySearchForm = ({ onSearchSubmit, countryName, setCountryName }) => (
   <form onSubmit={onSearchSubmit} className="search-form">
      <input
         type="text"
         placeholder="Search for a country..."
         value={countryName}
         onChange={(e) => setCountryName(e.target.value)}
         required
      />
      <button type="submit">Search</button>
   </form>
)

const CountryListTable = ({ countries, onConvertSubmit, amounts, setAmounts, convertedAmounts }) => (
   <table className="countries-table">
      <thead>
         <tr>
            <th>Country</th>
            <th>Population</th>
            <th>Currencies</th>
            <th>Exchange Rate</th>
            <th>Convert</th>
            <th>Converted Amount</th>
         </tr>
      </thead>

      <tbody>
         {countries.length === 0 && (
            <tr>
               <td colSpan="6">
                  <p style={{ textAlign: 'center' }}>No countries added yet.</p>
               </td>
            </tr>
         )}
         {countries.map((country, index) => (
            <CountryListTableRow
               key={index}
               country={country}
               onConvertSubmit={onConvertSubmit}
               amounts={amounts}
               setAmounts={setAmounts}
               convertedAmounts={convertedAmounts}
            />
         ))}
      </tbody>
   </table>
)

const CountryListTableRow = ({ country, onConvertSubmit, amounts, setAmounts, convertedAmounts }) => (
   <tr>
      <td>
         <p>{country.fullName}</p>
      </td>
      <td>
         <p>{country.population}</p>
      </td>
      <td>
         <CurrencyList currencies={country.currencies} />
      </td>
      <td>
         <p>{country.exchange.rate} Swedish Krona</p>
      </td>
      <td>
         <CurrencyConvertForm onConvertSubmit={onConvertSubmit} amounts={amounts} setAmounts={setAmounts} country={country} />
      </td>
      <td>
         <p>
            {convertedAmounts[country.fullName]} {convertedAmounts[country.fullName] && country.currencies[0].symbol}
         </p>
      </td>
   </tr>
)

const CurrencyConvertForm = ({ onConvertSubmit, amounts, setAmounts, country }) => (
   <form onSubmit={(e) => onConvertSubmit(e, country)}>
      <input
         style={{ marginRight: '10px' }}
         type="number"
         placeholder="SEK"
         value={amounts[country.fullName] || ''}
         onChange={(e) => setAmounts((prevState) => ({ ...prevState, [country.fullName]: e.target.value }))}
         required
      />
      <button type="submit">Convert</button>
   </form>
)

const CurrencyList = ({ currencies }) => (
   <ul className="currency-list">
      {currencies.map((currency, index) => (
         <li key={index}>
            {currency.name}, ({currency.code})
         </li>
      ))}
   </ul>
)
