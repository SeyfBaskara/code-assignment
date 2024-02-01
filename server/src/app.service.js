import axios from 'axios'

const ACCESS_KEY = 'f7df072c8bbfd4a2095709d2f48db068'

export default class AppService {
   async getCountryByName(name) {
      try {
         if (!name) {
            throw new Error('Invalid input: Name is required.')
         }

         const { data } = await axios.get(`https://restcountries.com/v3/name/${name}`)

         if (!data || !data.length) {
            throw new Error('Invalid response data: No country found for the specified name.')
         }

         return data
      } catch (error) {
         console.error('Error getting country by name:', error)
      }
   }

   async getRates() {
      try {
         const response = await axios.get('http://data.fixer.io/api/latest', {
            params: {
               access_key: ACCESS_KEY,
            },
         })

         const { rates } = response.data

         if (!rates) {
            throw new Error('Invalid response data: Rates not available.')
         }

         return rates
      } catch (error) {
         console.error('Error getting rates:', error)
      }
   }

   async getExchangeRate(baseCurrency, targetCurrency) {
      try {
         if (!baseCurrency || !targetCurrency) {
            throw new Error('Invalid input: Base and currency code are required.')
         }

         const rates = await this.getRates()

         if (!rates || !rates[baseCurrency] || !rates[targetCurrency]) {
            throw new Error('Invalid response data: Rates not available for the specified baseCurrency or currency code.')
         }

         const exchangeRate = rates[baseCurrency] / rates[targetCurrency]

         const responseExchangeData = {
            baseCurrency,
            targetCurrency,
            rate: exchangeRate.toFixed(2),
         }

         return responseExchangeData
      } catch (error) {
         console.error('Error getting exchange rate:', error)
      }
   }

   async convertCurrency(baseCurrency, targetCurrency, amount) {
      try {
         if (!baseCurrency || !targetCurrency || !amount) {
            throw new Error('Invalid input: Base and currency code, and amount are required.')
         }

         const rates = await this.getRates()

         if (!rates || !rates[baseCurrency] || !rates[targetCurrency]) {
            throw new Error('Invalid response data: Rates not available for the specified baseCurrency or currency code.')
         }

         const convertedAmount = (rates[targetCurrency] / rates[baseCurrency]) * amount

         if (!convertedAmount) {
            throw new Error('Invalid response data: Converted amount not available.')
         }

         return convertedAmount.toFixed(2)
      } catch (error) {
         console.error('Error converting currency:', error)
      }
   }

   async getUser(username) {
      return {
         username,
         password: 'password',
      }
   }
}
