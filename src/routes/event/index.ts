import EventsController from '../../controllers/EventsController'
import express from 'express'
const router = express.Router()

router.post('/events', EventsController.store)
router.get('/events', EventsController.index)

export default router