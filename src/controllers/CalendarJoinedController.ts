import { JoinedPeople, Event } from '../db'
import { Response } from 'express'
import { IUserRequest } from 'interfaces/IUserRequest'
import { Message } from '../config/messages'
import CustomError from '../helpers/CustomError'

export default class CalendarJoinedController {
  public static async index (req: IUserRequest, res:Response):Promise<void> {
    const allJoined = await JoinedPeople.findAll({
      include: [{
        model: Event
      }],
      where: { UserId: req.user?.id }
    })
    if (!allJoined) throw new CustomError(Message.NOT_FOUND, 404)
    res.json({ data: allJoined, message: Message.SUCCESS })
  }
}
