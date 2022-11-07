import { Request, Response } from 'express'
import validateComment from '../validation/addComment'
import { Comments, User } from '../db'
import { IUserRequest } from 'interfaces/IUserRequest'
import validateParams from '../validation/paramsId'
import { Message } from '../config/messages'
import CustomError from '../helpers/CustomError'

export default class CommentsController {
  // for getting all data
  public static async index (req: Request, res: Response) {
    const { eventId } = req.params
    const { offset = 1 }:any = req.query
    await validateParams({ id: eventId })
    const allComments = await Comments.findAll({
      where: { EventId: eventId },
      include: {
        model: User,
        attributes: ['id', 'username', 'profileImg']
      },
      offset: 10 * (+offset - 1),
      limit: 10,
      order: [['createdAt', 'desc']]

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
    const commentsAndPublisher = await Comments.findOne({
      where: { UserId: req.user?.id, id: comments.id },
      include: {
        model: User,
        attributes: ['id', 'username', 'profileImg']
      }
    })
    res.json({ message: 'Comment add successfully', data: commentsAndPublisher })
  }

  // for updating new event maybe
  public static async update (req: Request, res: Response) {
    // code here
  }

  // for deleteing an event
  public static async destroy (req: Request, res: Response) {
    // code here
    const { id, eventId } = req.params
    await Promise.all([validateParams({ id }), validateParams({ id: eventId })])

    const deleteComment = await Comments.destroy({
      where: { id, EventId: eventId }
    })
    if (!deleteComment) throw new CustomError(Message.DELETE_FAILED, 400)

    res.json({ message: Message.DELETE_COMMENT, status: 'deleted' })
  }
}
