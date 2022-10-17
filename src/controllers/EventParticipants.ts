import { JoinedPeople } from '../models'
import { Request, Response } from 'express'
import { Message } from '../config/messages'
import CustomError from '../helpers/CustomError'

export default class EventParticipants {
  public static async index (req: Request, res:Response) {
    const { eventId } = req.params
    const allJoined = await JoinedPeople.findAll({
      where: { EventId: eventId }
    })
    if (!allJoined) throw new CustomError(Message.ERROR404, 404)
    res.status(200).json({ data: allJoined, message: Message.SUCCESS })
  }

  public static async store (req: Request, res:Response) {
    const { eventId } = req.params
    const { UserId } = req.body

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
      res.status(200).json({ data: destroy, message: Message.NOTJOINED })
    } else {
      const addJoined = await JoinedPeople.create({ UserId, EventId: eventId })
      res.status(200).json({ data: addJoined, message: Message.JOINED })
    }
  }
}
