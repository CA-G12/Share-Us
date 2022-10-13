import { Request, Response } from 'express'
import { Event } from './../models'

const addEvent = async (req: Request, res: Response) => {
  const data = req.body
  if (
    data.name &&
    data.description &&
    data.img &&
    data.status &&
    data.startTime &&
    data.endTime &&
    data.longitude &&
    data.latitude
  ) {
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
    res.status(200).json({
      message: 'inserted successfully'
    })
  }else{
    res.status(400).json({
      message: 'You should fill all the required fields'
    })
  }
  
}

export default addEvent
