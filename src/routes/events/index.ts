import EventsController from '../../controllers/EventsController'
import express from 'express'
import EventParticipantsController from '../../controllers/EventParticipantsController'
import expressWrapper from '../../helpers/expressWrapper'
const router = express.Router()

router.post('/events', EventsController.store)
router.get('/events', EventsController.index)

router.post('/events/:eventId/joined', expressWrapper(EventParticipantsController.store))
router.get('/events/:eventId/joined', expressWrapper(EventParticipantsController.index))

export default router
