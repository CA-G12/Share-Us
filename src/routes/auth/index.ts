import express from 'express'
import signup from '../../controllers/auth/signup'
import expressWrapper from '../../helpers/expressWrapper'
import signIn from '../../controllers/auth/signin'
import isAuth from '../../middlewares/isAuth'
import verify from '../../controllers/auth/verify'

const Router = express.Router()

Router.post('/signup', expressWrapper(signup))

Router.post('/login', expressWrapper(signIn))

Router.get('/me', expressWrapper(isAuth), expressWrapper(verify))

export default Router
