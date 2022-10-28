import express from 'express'
import expressWrapper from '../../helpers/expressWrapper'
import CommentsController from '../../controllers/CommentsController'
import isAuth from '../../middlewares/isAuth'

const router = express.Router()
router.get('/events/:eventId/comments'
  , expressWrapper(CommentsController.index))

router.get('/events/:eventId/comments/:id',
  expressWrapper(CommentsController.show))

router.post('/events/:eventId/comments', expressWrapper(isAuth)
  , expressWrapper(CommentsController.store))
router.put('/events/:eventId/comments/:id', expressWrapper(isAuth)
  , expressWrapper(CommentsController.update))
router.delete('/events/:eventId/comments/:id', expressWrapper(isAuth)
  , expressWrapper(CommentsController.destroy))

export default router
