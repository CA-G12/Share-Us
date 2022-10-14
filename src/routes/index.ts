// import signIn from './auth/SignIn'
import express from 'express'
import googleRouter from './auth/signInGoogle'
import loginRouter from './auth/SignIn'
const Router = express.Router()

Router.get('/', (req, res) => {
  res.send('<a href="auth/google"> Authenticate with google </a>')
})
// login/federated/google

Router.get('/login', (req, res) => {
  console.log(req)
  res.send('<h1> login page </h1>')
})

Router.use(googleRouter)

Router.use(loginRouter)

export default Router
