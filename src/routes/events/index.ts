import EventsController from '../../controllers/EventsController'
import expressWrapper from '../../helpers/expressWrapper'
import express from 'express'
import HashtagController from '../../controllers/HashtagsController'
const router = express.Router()

router.post('/events', expressWrapper(EventsController.store))
router.get('/hashtags', expressWrapper(HashtagController.show))
router.get('/events', expressWrapper(EventsController.index))
router.get('/events/:id', expressWrapper(EventsController.show))
export default router
