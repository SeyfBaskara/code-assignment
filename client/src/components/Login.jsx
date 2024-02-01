import React from 'react'
import * as API from '../api'

const Login = ({ setIsAuthenticated }) => {
   const [username, setUsername] = React.useState('')
   const [password, setPassword] = React.useState('')

   const loginHandler = async (e) => {
      e.preventDefault()
      try {
         const data = await API.login(username, password)
         localStorage.setItem('token', data.token)
         setIsAuthenticated(true)
      } catch (error) {
         alert('Make sure you have entered the password: "password" :)')
         console.error('User login error:', error)
      }
   }

   return (
      <form onSubmit={loginHandler} className="login-form">
         <h3>Login</h3>
         <CustomInput
            label="Username:"
            type="username"
            required
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            tabIndex={1}
         />
         <CustomInput
            label="Password:"
            type="password"
            required
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            tabIndex={2}
         />
         <button type="submit" tabIndex={3}>
            Login
         </button>
      </form>
   )
}

export default Login

const CustomInput = ({ label, ...rest }) => (
   <div>
      <label htmlFor={rest.id}>{label}</label>
      <input {...rest} style={{ width: '95%', marginTop: '5px' }} />
   </div>
)
