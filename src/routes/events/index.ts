import EventsController from '../../controllers/EventsController'
import expressWrapper from '../../helpers/expressWrapper'
import express from 'express'
import EventParticipantsController from '../../controllers/EventParticipantsController'
import SearchResultController from '../../controllers/SearchResultController'
import isAuth from '../../middlewares/isAuth'
import CalendarInterestedController from '../../controllers/CalendarInterestedController'
const router = express.Router()
router.get('/search', expressWrapper(expressWrapper(SearchResultController.index)))

router.get('/events', expressWrapper(EventsController.index))
router.get('/events/joined', expressWrapper(isAuth), expressWrapper(EventParticipantsController.index))
router.get('/events/interested', expressWrapper(isAuth), expressWrapper(CalendarInterestedController.index))
router.get('/events/:id', expressWrapper(EventsController.show))

router.post('/events', expressWrapper(EventsController.store))
router.post('/events/:eventId/joined', expressWrapper(isAuth), expressWrapper(EventParticipantsController.store))
router.post('/events/:eventId/interested', expressWrapper(CalendarInterestedController.store))

export default router
