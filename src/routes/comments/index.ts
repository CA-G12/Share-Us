import express from 'express'
import expressWrapper from '../../helpers/expressWrapper'
import CommentsController from '../../controllers/CommentsController'

const router = express.Router()
router.get('/events/:eventId/comments'
  , expressWrapper(CommentsController.index))
router.post('/events/:eventId/comments'
  , expressWrapper(CommentsController.store))
router.get('/events/:eventId/comments/:id',
  expressWrapper(CommentsController.show))
router.put('/events/:eventId/comments/:id'
  , expressWrapper(CommentsController.update))
router.delete('/events/:eventId/comments/:id'
  , expressWrapper(CommentsController.destroy))

export default router
