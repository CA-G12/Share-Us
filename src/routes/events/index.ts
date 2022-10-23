import EventsController from '../../controllers/EventsController'
import expressWrapper from '../../helpers/expressWrapper'
import express from 'express'
import EventParticipantsController from '../../controllers/EventParticipantsController'
import SearchResultController from '../../controllers/SearchResultController'

const router = express.Router()
router.get('/search', expressWrapper(expressWrapper(SearchResultController.index)))

router.get('/events', expressWrapper(EventsController.index))
router.get('/events/:id', expressWrapper(EventsController.show))
router.get('/events/:eventId/joined', expressWrapper(EventParticipantsController.index))

router.post('/events', expressWrapper(EventsController.store))
router.post('/events/:eventId/joined', expressWrapper(EventParticipantsController.store))

export default router
