import express from 'express'

import auth from './auth'

const Router = express.Router()

Router.use('/users', auth)

export default Router
