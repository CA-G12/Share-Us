import express from 'express'

import auth from './auth'
import events from './events'

const Router = express.Router()

Router.use('/users', auth)
Router.use(events)

export default Router
