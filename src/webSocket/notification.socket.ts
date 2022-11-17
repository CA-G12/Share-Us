import { Socket } from 'socket.io'
import MySocketInterface from './mySocketInterface'
import { v4 as uuidv4 } from 'uuid'
import { User } from '../models'
import { formatDistance, parseISO } from 'date-fns'

class NotificationSocket implements MySocketInterface {
  onlineUsers:any = []

  addNewUser:any = (username:any, socketId:any):any => {
    !this.onlineUsers.find((ele:any) => ele.username === username) &&
      this.onlineUsers.push({ username, socketId })
  }

  removeUser = (socketId:any) => {
    this.onlineUsers = this.onlineUsers.filter((user:any) => user.socketId !== socketId)
  }

  getUser = (username:any) => {
    return this.onlineUsers.find((user:any) => user.username === username)
  }

  handleConnection (socket: Socket) {
    socket.on('newUser', (username) => {
      this.addNewUser(username, socket.id)
    })

    socket.on('followNotification', async (data:any) => {
      const receiverUser:any = await User.findOne({ where: { id: data.receiverId } })
      if (receiverUser?.followers?.includes(data.senderInfo.id)) {
        await receiverUser.update({
          notifications:
          [...receiverUser.notifications, { ...data, id: uuidv4() }]
        })
        const receiver = this.getUser(data.receiverName)
        if (receiver?.socketId) {
          socket.to(receiver.socketId).emit('getNotification', {
            senderInfo: {
              id: data.senderInfo.id,
              senderName: data.senderInfo.username,
              profileImg: data.senderInfo.profileImg
            },
            message: data.message,
            createdAt: formatDistance(parseISO(data.createdAt), new Date(), { addSuffix: true }),
            status: 'unread'
          })
        }
      }
    })

    socket.on('commentsNotification', async (data:any) => {
      const receiverUser:any = await User.findOne({ where: { id: data.receiverId } })
      await receiverUser.update({
        notifications:
          [...receiverUser.notifications, { ...data, id: uuidv4() }]
      })
      const receiver = this.getUser(data.receiverName)
      if (receiver?.socketId) {
        socket.to(receiver.socketId).emit('getNotification', {
          senderInfo: {
            id: data.senderInfo.id,
            senderName: data.senderInfo.username,
            profileImg: data.senderInfo.profileImg
          },
          message: data.message,
          createdAt: formatDistance(parseISO(data.createdAt), new Date(), { addSuffix: true }),
          status: 'unread',
          eventId: data.eventId
        })
      }
    })

    socket.on('messageNotification', (data:any) => {
      const receiver = this.getUser(data.receiverName)
      if (receiver?.socketId) {
        socket.to(receiver.socketId).emit('getMessageNotification', {
          counter: 1,
          receiver: data.receiverName,
          senderName: data.senderName
        })
      }
    })

    socket.on('disconnect', () => {
      this.removeUser(socket.id)
    })
  }

  middlewareImplementation (socket: Socket, next:any) {
    // Implement your middleware for orders here
    return next()
  }
}

export default NotificationSocket
