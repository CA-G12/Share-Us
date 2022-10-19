import express from 'express'
import EventsController from '../../controllers/EventsController'
import expressWrapper from '../../helpers/expressWrapper'
import HashtagController from '../../controllers/HashtagsController'
import EventParticipantsController from '../../controllers/EventParticipantsController'
const router = express.Router()

router.post('/events', expressWrapper(EventsController.store))
router.get('/hashtags', expressWrapper(HashtagController.show))

router.get('/events', expressWrapper(EventsController.index))
router.get('/events/:id', expressWrapper(EventsController.show))
router.get('/events/:eventId/joined', expressWrapper(EventParticipantsController.index))
router.post('/events/:eventId/joined', expressWrapper(EventParticipantsController.store))

export default router
