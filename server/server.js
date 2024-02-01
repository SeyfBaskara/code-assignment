import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { getCountryByName, login, convertCurrency } from './src/app.controller.js'
import { auth } from './src/middleware.js'

const app = express()
const port = 5000
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => res.send('Testing route!'))

app.post('/login', login)
app.get('/countries/:name', auth, getCountryByName)
app.get('/convert/:from/:to/:amount', auth, convertCurrency)

app.listen(port, () => console.log(`Server listening on port ${port}!`))
