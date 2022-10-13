import express from 'express'
import addEvent from './event'
const Router = express.Router()

Router.use(addEvent)

export default Router
