import express from 'express'
import users from './users'
import auth from './auth'
import events from './events'

const Router = express.Router()

Router.use(auth)
Router.use(events)
Router.use(users)
export default Router
