import express from 'express'
import events from './event'
const Router = express.Router()

Router.use(events)

export default Router
