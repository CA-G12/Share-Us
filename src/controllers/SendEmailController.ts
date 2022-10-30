import { Event } from '../db'
import { Request, Response } from 'supertest'

export default class sendEmailController {
  public static async index (req: Request, res: Response):Promise<void> {
    const eventToStart = await Event.findAll({
      where: {
        startTime
      }
    })
  }
}
