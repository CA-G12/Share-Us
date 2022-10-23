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

Router.use(eventsRouter)

export default Router
