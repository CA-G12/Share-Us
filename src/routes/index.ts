import express from 'express'
import EventsController from '../controllers/EventsController'
const Router = express.Router()

Router.get('/events', EventsController.index)
export default Router
