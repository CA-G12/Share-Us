import { Response } from 'express'
import { Op } from 'sequelize'

import { IUserRequest } from '../interfaces/IUserRequest'
import { Chat } from '../db'
import { Message } from '../config/messages'
import validateParams from '../validation/paramsId'

export default class ChatMessages {
  public static async index (req:IUserRequest, res:Response) {
    const { receiverId } = req.params
    await validateParams({ id: receiverId })
    const senderId = req.user?.id
    const allMessages = await Chat.findAll({
      where: {
        [Op.or]:
       [{ senderId, receiverId }, { senderId: receiverId, receiverId: senderId }]
      }
    })
    res.json({ data: allMessages, message: Message.SUCCESS })
  }

  public static async destroy (req:IUserRequest, res:Response) {
    const { id } = req.params
    await validateParams({ id })
    const deleted = await Chat.destroy({ where: { id } })
    res.json({ msg: deleted })
  }
}
