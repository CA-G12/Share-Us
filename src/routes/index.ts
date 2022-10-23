import express from 'express'

import auth from './auth'
import events from './events'
import followingSystem from './FollowingSystem'

const Router = express.Router()

Router.use(auth)
Router.use(events)
Router.use(followingSystem)

export default Router
