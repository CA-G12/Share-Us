import EventsController from '../../controllers/EventsController'
import express from 'express'
import EventParticipants from '../../controllers/EventParticipants'
import expressWrapper from '../../helpers/expressWrapper'
const router = express.Router()

router.post('/events', EventsController.store)
router.get('/events', EventsController.index)

router.post('/events/:eventId/joined', expressWrapper(EventParticipants.store))
router.get('/events/:eventId/joined', expressWrapper(EventParticipants.index))

export default router
