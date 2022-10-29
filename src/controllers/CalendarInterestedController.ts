import { InterestedPeople, Event } from '../db'
import { Response, Request } from 'express'
import { IUserRequest } from 'interfaces/IUserRequest'
import { Message } from '../config/messages'
import validateParams from '../validation/paramsId'

export default class CalendarInterestedController {
  public static async index (req: IUserRequest, res:Response):Promise<void> {
    const allInterested = await InterestedPeople.findAll({
      include: [{
        model: Event
      }],
      where: { UserId: req.user?.id }
    })
    res.json({ data: allInterested })
  }

  public static async store (req: Request, res:Response) {
    const { eventId } = req.params
    const { UserId } = req.body
    await validateParams({ id: eventId })

    const joined = await InterestedPeople.findOne({
      where: {
        UserId, EventId: eventId
      }
    })
    if (joined) {
      const destroy = await InterestedPeople.destroy({
        where: {
          UserId, EventId: eventId
        }
      })
      res.json({ data: destroy, message: Message.NOT_JOINED_ANYMORE })
    } else {
      const addInterested = await InterestedPeople.create({ UserId, EventId: eventId })
      res.json({ data: addInterested, message: Message.JOINED })
    }
  }
}
