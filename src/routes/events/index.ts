import EventsController from '../../controllers/EventsController'
import express from 'express'
import HashtagController from '../../controllers/HashtagsController'
const router = express.Router()

router.post('/events', EventsController.store)
router.get('/events', EventsController.index)
router.get('/hashtags', HashtagController.show)

export default router
