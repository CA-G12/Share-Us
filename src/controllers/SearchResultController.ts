import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { Event, Hashtag, User } from '../db'
export default class SearchResultController {
  public static async index (req: Request, res: Response):Promise<void> {
    const { category, input } = req.query
    if (category === 'event') {
      const allEvents = await Event.findAll({
        where: {
          name: {
            [Op.iLike]: '%' + input + '%'
          }
        },
        include: [{
          model: Hashtag
        }]
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
    } else if (category === 'friends') {
      const allUsers = await User.findAll({
        where: {
          username: {
            [Op.iLike]: '%' + input + '%'
          }
        }
      })
      res.json({ friends: allUsers })
    } else {
      const allEventsWithoutCategory = await Event.findAll({
        include: [{
          model: Hashtag
        }]
      })
      res.json({ AllEvent: allEventsWithoutCategory })
    }
  }
}
