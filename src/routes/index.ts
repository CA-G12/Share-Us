import express from 'express'
import signup from '../controllers/signup'
import expressWrapper from '../helpers/expressWrapper'
import signIn from '../controllers/signin'
import checkUser from '../middlewares/checkUser'

const Router = express.Router()

Router.post('/signup', expressWrapper(signup))

// Login local strategy

Router.post('/login', expressWrapper(signIn))

Router.get('/hi', expressWrapper(checkUser))

export default Router
