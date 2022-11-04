import { Response } from 'express'
import { Op } from 'sequelize'

import { IUserRequest } from '../interfaces/IUserRequest'
import { Chat } from '../db'
import { Message } from '../config/messages'

export default class ChatMessages {
  public static async index (req:IUserRequest, res:Response) {
    const { receiverId } = req.params
    const senderId = req.user?.id
    console.log(senderId, receiverId)
    const allMessages = await Chat.findAll({
      where: {
        [Op.or]:
       [{ senderId, receiverId }, { senderId: receiverId, receiverId: senderId }]
      }
    })
    res.json({ data: allMessages, message: Message.SUCCESS })
  }
}
