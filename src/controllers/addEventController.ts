import { NextFunction, Request, Response } from 'express'
import querySchema from './../validation/addEventValidate'
import { Event } from './../models'
import { Message } from './../config/messages'

const addEvent = async (req: Request, res: Response, next: NextFunction) => {
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
      .json({ message: Message.VALIDATION_ERROR, error: err.details[0]})
    }
    next(err)
  }
}

export default addEvent
