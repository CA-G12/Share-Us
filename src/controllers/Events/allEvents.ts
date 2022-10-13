import { Event } from '../../models'
import { Request, Response } from 'express'
import { Op } from 'sequelize'

const allEvents = async (req: Request, res: Response) => {
  const { status, from, to } = req.query

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
    where: whereObj
  }).then((result) => res.json(result))
}

export default allEvents
