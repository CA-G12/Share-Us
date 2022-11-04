import express from 'express'
import users from './users'
import auth from './auth'
import events from './events'
import comments from './comments'
import chat from './chat'
import followingSystem from './FollowingSystem'

const Router = express.Router()

Router.use(events)
Router.use(auth)
Router.use(users)
Router.use(comments)
Router.use(followingSystem)
Router.use(chat)
export default Router
