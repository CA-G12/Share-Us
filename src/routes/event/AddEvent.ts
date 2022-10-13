import express from 'express'
import addEvent from './../../controllers/addEventController'
const Router = express.Router()

Router.post('/addEvent', addEvent)

export default Router