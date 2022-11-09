import express from 'express'
import EventsController from '../../controllers/EventsController'
import expressWrapper from '../../helpers/expressWrapper'
import JoinedController from '../../controllers/JoinedController'
import InterestedController from '../../controllers/InterestedController'
import HashtagController from '../../controllers/HashtagsController'
import SearchResultController from '../../controllers/SearchResultController'
import isAuth from '../../middlewares/isAuth'
import CalendarInterestedController from '../../controllers/CalendarInterestedController'
import CalendarJoinedController from '../../controllers/CalendarJoinedController'
import GoogleCalendar from '../../controllers/GoogleCalendar'

const router = express.Router()
router.get('/search', expressWrapper(expressWrapper(SearchResultController.index)))

router.post('/events', expressWrapper(isAuth), expressWrapper(EventsController.store))
router.get('/hashtags', expressWrapper(HashtagController.show))

router.get('/events', expressWrapper(EventsController.index))
router.get('/events/joined', expressWrapper(isAuth), expressWrapper(CalendarJoinedController.index))

router.get('/events/interested', expressWrapper(isAuth), expressWrapper(CalendarInterestedController.index))
router.get('/events/googleCalendar', expressWrapper(isAuth), expressWrapper(GoogleCalendar))
router.get('/events/:id', expressWrapper(EventsController.show))
router.get('/events/:eventId/joined', expressWrapper(JoinedController.index))
router.get('/events/:eventId/interested', expressWrapper(InterestedController.index))

router.post('/events', expressWrapper(isAuth), expressWrapper(EventsController.store))
router.post('/events/:eventId/joined', expressWrapper(isAuth), expressWrapper(JoinedController.store))
router.post('/events/:eventId/interested', expressWrapper(isAuth), expressWrapper(InterestedController.store))

router.delete('/events/:id', expressWrapper(isAuth), expressWrapper(EventsController.destroy))

export default router
