import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { Event, Hashtag, User } from '../db'
export default class SearchResultController {
  public static async index (req: Request, res: Response):Promise<void> {
    const { category, input } = req.body
    if (category === 'event') {
      const allEvents = await Event.findAll({
        where: {
          name: {
            [Op.iLike]: '%' + input + '%'
          }
        }
      })
      res.json({ event: allEvents })
    } else if (category === 'hashtags') {
      const allHashtags = await Event.findAll({
        include: [{
          model: Hashtag,
          attributes: ['title'],
          where: {
            title: {
              [Op.iLike]: '%' + input + '%'
            }
          }
        }]
      })
      res.json({ hashtags: allHashtags })
    } else if (category === 'user') {
      const allUsers = await User.findAll({
        where: {
          username: {
            [Op.iLike]: '%' + input + '%'
          }
        }
      })
      res.json({ friends: allUsers })
    }
  }
}
