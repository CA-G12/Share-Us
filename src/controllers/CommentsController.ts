import { Request, Response } from 'express'
import validateComment from '../validation/addComment'
import { Comments, User } from '../db'
import { IUserRequest } from 'interfaces/IUserRequest'
import validateParams from '../validation/paramsId'

export default class CommentsController {
  // for getting all data
  public static async index (req: Request, res: Response) {
    const { eventId } = req.params
    await validateParams({ id: eventId })
    const allComments = await Comments.findAll({
      where: { EventId: eventId },
      include: {
        model: User,
        attributes: ['id', 'username', 'profileImg']
      }
    })
    res.json({ message: 'Comments received successfully', data: allComments })
  }

  // for getting just on element of data
  //  (like getting just one event may be in event details)
  public static async show (req: Request, res: Response) {
  // code here
  }

  // for storing new data
  public static async store (req: IUserRequest, res: Response) {
    const { eventId } = req.params
    const { image, content } = req.body

    await Promise.all([validateParams({ id: eventId }), validateComment({ image, content })])
    const comments = await Comments.create(
      { image, UserId: req.user?.id, EventId: eventId, content }
    )
    res.json({ message: 'Comment add successfully', data: comments })
  }

  // for updating new event maybe
  public static async update (req: Request, res: Response) {
    // code here
  }

  // for deleteing an event
  public static async destroy (req: Request, res: Response) {
    // code here
  }
}
