import express from 'express'

import auth from './auth'
import events from './events'
import comments from './comments'
import followingSystem from './FollowingSystem'

const Router = express.Router()

Router.use(events)
Router.use(auth)
Router.use(comments)
Router.use(followingSystem)

export default Router
