import { InterestedPeople, User } from '../models'
import { Request, Response } from 'express'
import { Message } from '../config/messages'
import CustomError from '../helpers/CustomError'
import validateParams from '../validation/paramsId'
export default class InterestedController {
  public static async index (req: Request, res:Response):Promise<void> {
    const { eventId } = req.params
    await validateParams({ id: eventId })
    const allInterestedPeople = await InterestedPeople.findAll({
      include: {
        model: User,
        attributes: ['id', 'username', 'profileImg']
      },
      where: { EventId: eventId }
    })
    if (!allInterestedPeople) throw new CustomError(Message.NOT_FOUND, 404)
    res.json({ data: allInterestedPeople, message: Message.SUCCESS })
  }

  public static async store (req: Request, res:Response) {
    const { eventId } = req.params
    const { UserId } = req.body
    await validateParams({ id: eventId })

    const Interested = await InterestedPeople.findOne({
      where: {
        UserId, EventId: eventId
      }
    })
    if (Interested) {
      const destroy = await InterestedPeople.destroy({
        where: {
          UserId, EventId: eventId
        }
      })
      res.json({ data: destroy, message: Message.NOT_INTERESTED_ANYMORE, status: 'canceled' })
    } else {
      const addJoined = await InterestedPeople.create({ UserId, EventId: eventId })
      res.json({ data: addJoined, message: Message.INTERESTED, status: 'interested' })
    }
  }
}
