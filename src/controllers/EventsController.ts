import { Event } from '../models'
import { NextFunction, Request, Response } from 'express'
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

      return await Event.findAll({
        where: whereObj,
        order: [
          ['startTime', 'ASC']
        ]
      }).then((result) => res.json(result))
    } catch (err) {
      next(err)
    }
  }
}
