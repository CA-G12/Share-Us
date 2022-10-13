import EventsController from './../../controllers/events/EventsController'
import express from 'express'
const router = express.Router()

router.post('/events', EventsController.store)

export default router