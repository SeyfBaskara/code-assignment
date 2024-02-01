import './App.css'
import React from 'react'
import Login from './components/Login'
import CountryInfoPanel from './components/CountryInfoPanel'

function App() {
   const [isAuthenticated, setIsAuthenticated] = React.useState(false)

   React.useEffect(() => {
      const token = localStorage.getItem('token')
      if (token) {
         setIsAuthenticated(true)
      }
   }, [])

   return <>{!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <CountryInfoPanel />}</>
}

export default App
