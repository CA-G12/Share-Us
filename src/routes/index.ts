import signup from '../controllers/signup'
import express from 'express'

const Router = express.Router()

Router.post('/signup', signup)

export default Router
