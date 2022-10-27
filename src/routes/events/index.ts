import EventsController from '../../controllers/EventsController'
import expressWrapper from '../../helpers/expressWrapper'
import express from 'express'
import JoinedController from '../../controllers/JoinedController'
import InterestedController from '../../controllers/InterestedController'

const router = express.Router()

router.get('/events', expressWrapper(EventsController.index))
router.get('/events/:id', expressWrapper(EventsController.show))
router.get('/events/:eventId/joined', expressWrapper(JoinedController.index))
router.get('/events/:eventId/interested', expressWrapper(InterestedController.index))

router.post('/events', expressWrapper(EventsController.store))
router.post('/events/:eventId/joined', expressWrapper(JoinedController.store))
router.post('/events/:eventId/interested', expressWrapper(InterestedController.store))

export default router
