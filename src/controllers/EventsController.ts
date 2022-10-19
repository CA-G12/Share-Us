import { NextFunction, Request, Response } from 'express'
import querySchema from '../validation/addEventValidate'
import { Message } from '../config/messages'
import { Event, Hashtag, HashtagEvent, User } from '../db'
import { Op } from 'sequelize'

export default class EventsController {
  // for getting all data
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

  // for getting just on element of data (like getting just one event may be in event details)
  public static async show (req: Request, res: Response) {
    // code here
  }

  // for storing new data
  public static async store (req: Request, res: Response, next: NextFunction) {

    const data = req.body

    try {
      await querySchema.validateAsync(req.body)

      const hashtagIds = [];

      for(const has of data.hashtag){
        const [row] = await Hashtag.findOrCreate({
          where: { title: has },
          defaults:{
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`
          }
        })
        hashtagIds.push(row.id);
      }

      const event = await Event.create({
        name: data.name,
        description: data.description,
        img: data.img,
        status: data.status,
        startTime: data.startTime,
        endTime: data.endTime,
        longitude: data.longitude,
        latitude: data.latitude,
      })

      event.setHashtags(hashtagIds)

      res.status(200).json({
        message: Message.SUCCESS,
        data: event
      })
    } catch (err:any) {
      console.log(err)
      if (err.details) {
        res
          .status(422)
          .json({ message: Message.VALIDATION_ERROR, error: err.details[0] })
      }
      next(err)
    }
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
