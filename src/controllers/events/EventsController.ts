import { NextFunction, Request, Response } from 'express'
import querySchema from './../../validation/addEventValidate'
import { Event } from './../../models'
import { Message } from './../../config/messages'

export default class EventsController {
  // for getting all data
  public static async index (req: Request, res: Response) {
    // code here
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
      const event = await Event.create({
        name: data.name,
        description: data.description,
        img: data.img,
        status: data.status,
        startTime: data.startTime,
        endTime: data.endTime,
        longitude: data.longitude,
        latitude: data.latitude
      })
      res.json({
        message: Message.SUCCESS,
        data: event
      })
    } catch (err:any) {
      if (err.details[0]) {
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
