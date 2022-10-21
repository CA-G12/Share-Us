import express from 'express'
import expressWrapper from '../../helpers/expressWrapper'
import isAuth from '../../middlewares/isAuth'
import Auth from '../../controllers/Auth'

const Router = express.Router()

Router.post('/signup', expressWrapper(Auth.signUp))

Router.post('/login', expressWrapper(Auth.signIn))

Router.get('/me', expressWrapper(isAuth), expressWrapper(Auth.verifyMe))

export default Router
