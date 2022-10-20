import signup from '../controllers/signup'
import expressWrapper from '../helpers/expressWrapper'
import express from 'express'
import events from './events'
import users from './users'
import signIn from '../controllers/signin'
import checkUser from '../middlewares/checkUser'

const Router = express.Router()

Router.post('/signup', expressWrapper(signup))

Router.use(events)
Router.use(users)

Router.post('/login', expressWrapper(signIn))

Router.get('/hi', expressWrapper(checkUser))

export default Router
