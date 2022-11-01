import { Socket } from 'socket.io'
import MySocketInterface from './mySocketInterface'
import { User } from '../models'
import { formatDistance, parseISO } from 'date-fns'

class OrdersSocket implements MySocketInterface {
  onlineUsers:any = []

  addNewUser:any = (username:any, socketId:any):any => {
    !this.onlineUsers.find((ele:any) => ele.username === username) &&
      this.onlineUsers.push({ username, socketId })
  }

  removeUser = (socketId:any) => {
    this.onlineUsers = this.onlineUsers.filter((user:any) => user.socketId !== socketId)
  }

  getUser = (username:any) => {
    const user = this.onlineUsers.filter((user:any) => user.username === username)
    return this.onlineUsers.find((user:any) => user.username === username)
  }

  handleConnection (socket: Socket) {
    socket.emit('ping', 'Hi! I am a live socket connection')
    socket.on('newUser', (username) => {
      this.addNewUser(username, socket.id)
    })
    console.log(this.onlineUsers)
    socket.on('followNotification', async (data:any) => {
      const receiverUser:any = await User.findOne({ where: { id: data.receiverId } })
      if (receiverUser.followers.includes(data.senderInfo.id)) {
        const updateNotifications =
        await receiverUser.update({
          notifications:
          [...receiverUser.notifications, { ...data, id: Math.floor(100000 + Math.random() * 900000) }]
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
    // senderId: data.senderInfo.id,
    // senderName: data.senderInfo.username,
    // profileImg: data.senderInfo.profileImg,

    socket.on('disconnect', () => {
      this.removeUser(socket.id)
    })
  }

  middlewareImplementation (socket: Socket, next:any) {
    // Implement your middleware for orders here
    return next()
  }
}

export default OrdersSocket
