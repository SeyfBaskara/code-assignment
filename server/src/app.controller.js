import AppService from './app.service.js'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
   const { username, password } = req.body
   const service = new AppService()

   try {
      const user = await service.getUser(username)

      if (!user || password !== user.password) {
         res.status(403).json({ message: 'Invalid username or password' })
         return
      }

      const token = jwt.sign(user, 'access-token-secret')
      res.json({ token })
   } catch (error) {
      console.log('Login error', error)
   }
}

export const getCountryByName = async (req, res) => {
   const { name } = req.params
   const service = new AppService()

   try {
      const country = await service.getCountryByName(name)
      const currencies = formatCurrencyObjects(country[0].currencies)

      const baseCurrency = 'SEK'
      const targetCurrency = currencies[0].code

      const exchange = await service.getExchangeRate(baseCurrency, targetCurrency)

      const responseData = {
         commonName: country[0].name.common,
         fullName: country[0].name.official,
         population: country[0].population,
         currencies,
         exchange,
      }

      res.json(responseData)
   } catch (error) {
      console.log('Get country by name error', error)
   }
}

export const convertCurrency = async (req, res) => {
   const { from, to, amount } = req.params
   const service = new AppService()

   try {
      const convertedAmount = await service.convertCurrency(from, to, amount)

      res.json({ convertedAmount })
   } catch (error) {
      console.log('Convert currency error', error)
   }
}

// serve as utility function
function formatCurrencyObjects(currencies) {
   return Object.keys(currencies).map((currencyCode) => {
      const currencyDetails = currencies[currencyCode]
      return {
         code: currencyCode,
         name: currencyDetails.name,
         symbol: currencyDetails.symbol,
      }
   })
}
