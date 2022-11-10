import { Request, Response } from 'express'
import querySchema from '../validation/addEventValidate'
import filterQuerySchema from '../validation/filterEventValidate'
import { Message } from '../config/messages'
import { Event, User, JoinedPeople, Hashtag, InterestedPeople } from '../db'
import { Op } from 'sequelize'
import CustomError from '../helpers/CustomError'
import IBetweenFromAndTo from 'interfaces/IFilterEvents'
import { IUserRequest } from 'interfaces/IUserRequest'
import validateParams from '../validation/paramsId'

export default class EventsController {
  // for getting all data
  public static async index (req: Request, res: Response):Promise<void> {
    const { status } = req.query
    const userId = req.query?.userId as string

    const from = req.query?.from as string
    const to = req.query?.to as string

    await filterQuerySchema.validate({ status, from, to })

    const whereObj: {
      status?: string;
      [Op.or]?: [
        { startTime: IBetweenFromAndTo },
        { endTime: IBetweenFromAndTo }
      ];
      UserId?: string
    } = {}

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
      ]
    }
    if (userId) {
      whereObj.UserId = userId
    }

    const allEvents = await Event.findAll({
      attributes: ['name', 'img', 'description', 'startTime', 'status', 'placeName', 'id'],
      include: [{
        model: User,
        attributes: ['username', 'profileImg', 'id']
      }],
      where: whereObj,
      order: [
        ['startTime', 'DESC']
      ]
    })
    res.json({ message: Message.SUCCESS, data: allEvents })
  }

  // for getting just on element of data
  // (like getting just one event may be in event details)
  public static async show (req: Request, res: Response) {
    const { id } = req.params
    const eventDetails:any = await Event.findOne({
      include: [{
        model: User,
        attributes: ['username', 'id']
      }, {
        model: Hashtag, as: 'Hashtags'
      },
      {
        model: JoinedPeople,
        include: [{ model: User, attributes: ['username', 'id', 'profileImg'] }]
      },
      {
        model: InterestedPeople,
        include: [{ model: User, attributes: ['username', 'id', 'profileImg'] }]
      }
      ],
      where: {
        id
      }
    })

    if (!eventDetails) throw new CustomError(Message.NOT_FOUND, 404)
    res.status(200).json({
      message: Message.SUCCESS,
      data: eventDetails.dataValues
    })
  }

  // for storing new data
  public static async store (req: IUserRequest, res: Response) {
    await querySchema.validateAsync(req.body)
    const {
      name,
      description,
      img,
      status,
      startTime,
      endTime,
      longitude,
      latitude,
      placeName,
      hashtag = []
    } = req.body

    await querySchema.validateAsync(req.body)
    const hashtagIds = []
    const hashtagsColor = ['0E5E6F', '001253', '937DC2', '790252', '2B4865', '2E0249', '570A57', 'A91079']

    for (const has of hashtag) {
      const [row] = await Hashtag.findOrCreate({
        where: { title: has },
        defaults: {
          color: `#${hashtagsColor[Math.floor(Math.random() * hashtagsColor.length)]}`
        }
      })
      hashtagIds.push(row.id)
    }

    const event = await Event.create({
      name,
      description,
      img,
      status,
      startTime,
      endTime,
      longitude,
      latitude,
      placeName,
      UserId: req.user?.id
    })

    event.setHashtags(hashtagIds)

    res.json({
      message: Message.ADDED,
      data: event
    })
  }

  // for updating new event maybe
  public static async update (req: Request, res: Response) {
    // code here
  }

  // for deleteing an event
  public static async destroy (req: Request, res: Response) {
    // code here
    const { id } = req.params
    await validateParams({ id })
    const deleteEvent = await Event.destroy({
      where: { id }
    })
    if (!deleteEvent) throw new CustomError(Message.DELETE_FAILED, 400)
    res.json({ message: Message.DELETE_EVENT, status: 'deleted' })
  }
}
