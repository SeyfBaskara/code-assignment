import axios from 'axios'

const baseUrl = 'http://localhost:5000'

export const login = async (username, password) => {
   const res = await axios.post(`${baseUrl}/login`, { username, password })
   return res.data
}

export const getCountryByName = async (name, bearerToken) => {
   const headers = bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}
   const res = await axios.get(`${baseUrl}/countries/${name}`, { headers })
   return res.data
}

export const convertCurrency = async (from, to, amount, bearerToken) => {
   const headers = bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}
   const res = await axios.get(`${baseUrl}/convert/${from}/${to}/${amount}`, { headers })
   return res.data
}
