import express, { Request, Response } from 'express'
import signup from '../controllers/signup'
import expressWrapper from '../helpers/expressWrapper'
import signIn from '../controllers/signin'
import checkUser from '../middlewares/checkUser'
import eventsRouter from './events'
import { Comments, User } from '../models/index'

const Router = express.Router()

Router.post('/signup', expressWrapper(signup))

// Login local strategy

Router.post('/login', expressWrapper(signIn))

Router.get('/hi', expressWrapper(checkUser))

Router.get('/events/:eventId/comments', expressWrapper(async (req: Request, res: Response) => {
  const { eventId } = req.params
  const allComments = await Comments.findAll({
    where: { EventId: eventId },
    include: {
      model: User,
      attributes: ['id', 'username', 'profileImg']
    }
  })
  res.json({ message: 'Comments received successfully', data: allComments })
}))

Router.post('/events/:eventId/comments'
  , expressWrapper(async (req: Request, res: Response) => {
    const { eventId } = req.params
    const { image, content } = req.body
    const comments = await Comments.create(
      { image, UserId: 1, EventId: eventId, content }
    )
    const commentsAndPublisher = await Comments.findOne({
      where: { UserId: 1 },
      include: {
        model: User,
        attributes: ['id', 'username', 'profileImg']
      }
    })
    res.json({ message: 'Comment add successfully', data: commentsAndPublisher })
  }))

Router.use(eventsRouter)

export default Router
