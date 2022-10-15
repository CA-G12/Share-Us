import { Event, User } from '../db'
import { NextFunction, Request, Response } from 'express'
import { Message } from '../config/message'
import { Op } from 'sequelize'

export default class EventsController {
  public static async index (req: Request, res: Response, next: NextFunction) {
    const { status, from, to } = req.query
    try {
      const whereObj: {status?: string, [Op.or]? : symbol} = {}
      if (status) {
        whereObj.status = status as string
      }
      if (from && to) {
        whereObj[Op.or] = [
          {
            startTime: {
              [Op.and]: {
                [Op.gte]: from,
                [Op.lte]: to
              }
            }
          },
          {
            endTime: {
              [Op.and]: {
                [Op.gte]: from,
                [Op.lte]: to
              }
            }
          }
        ] as any
      }

      const allEvents = await Event.findAll({
        attributes: ['name', 'img', 'description', 'status', 'startTime'],
        include: [{ model: User, attributes: ['username', 'profileImg', 'id'] }],
        where: whereObj,
        order: [
          ['startTime', 'ASC']
        ]
      })
      res.json({ message: Message.SUCCESS, data: allEvents })
    } catch (err) {
      next(err)
    }
  }
}
