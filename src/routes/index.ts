import express from 'express'
import users from './users'
import auth from './auth'
import events from './events'
import followingSystem from './FollowingSystem'
const Router = express.Router()

Router.use(auth)
Router.use(events)
Router.use(users)
Router.use(followingSystem)
export default Router
