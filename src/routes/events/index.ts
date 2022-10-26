import EventsController from '../../controllers/EventsController'
import expressWrapper from '../../helpers/expressWrapper'
import express from 'express'
import EventParticipantsController from '../../controllers/EventParticipantsController'
import isAuth from '../../middlewares/isAuth'
const router = express.Router()

router.get('/events', expressWrapper(EventsController.index))
router.get('/events/joined', expressWrapper(isAuth), expressWrapper(EventParticipantsController.index))
router.get('/events/:id', expressWrapper(EventsController.show))

router.post('/events', expressWrapper(EventsController.store))
router.post('/events/:eventId/joined', expressWrapper(EventParticipantsController.store))

export default router
