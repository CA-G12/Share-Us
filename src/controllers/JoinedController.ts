import { JoinedPeople, User } from '../models'
import { Request, Response } from 'express'
import { Message } from '../config/messages'
import CustomError from '../helpers/CustomError'
import validateParams from '../validation/paramsId'
export default class JoinedController {
  public static async index (req: Request, res:Response):Promise<void> {
    const { eventId } = req.params
    await validateParams({ id: eventId })
    const allJoined = await JoinedPeople.findAll({
      include: {
        model: User,
        attributes: ['id', 'username', 'profileImg']
      },
      where: { EventId: eventId }
    })
    if (!allJoined) throw new CustomError(Message.NOT_FOUND, 404)
    res.json({ data: allJoined, message: Message.SUCCESS })
  }

  public static async store (req: Request, res:Response) {
    const { eventId } = req.params
    const { UserId } = req.body
    await validateParams({ id: eventId })

    const joined = await JoinedPeople.findOne({
      where: {
        UserId, EventId: eventId
      }
    })
    if (joined) {
      const destroy = await JoinedPeople.destroy({
        where: {
          UserId, EventId: eventId
        }
      })
      res.json({ data: destroy, message: Message.NOT_JOINED_ANYMORE })
    } else {
      const addJoined = await JoinedPeople.create({ UserId, EventId: eventId })
      res.json({ data: addJoined, message: Message.JOINED })
    }
  }
}
