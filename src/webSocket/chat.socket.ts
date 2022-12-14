import { Socket } from 'socket.io'
import MySocketInterface from './mySocketInterface'
import { Chat, User } from '../models'
// import { formatDistance, parseISO } from 'date-fns'

class ChatSocket implements MySocketInterface {
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
    console.log(this.onlineUsers)

    socket.on('typing', (message) => {
      const receiver = this.getUser(message.receiverName)
      if (receiver?.socketId) {
        socket.to(receiver.socketId).emit('typingResponse', message)
      }
    })

    socket.on('endTyping', (message) => {
      const receiver = this.getUser(message.receiverName)
      if (receiver?.socketId) {
        socket.to(receiver.socketId).emit('endTypingResponse', '')
      }
    })

    socket.on('sendMessage', async (message) => {
      try {
        const newMessage = await Chat.create(message)
        const newMessageWithSender = await Chat.findOne({
          where: { id: newMessage.id },
          include: {
            model: User,
            attributes: ['id', 'username', 'profileImg', 'blocked'],
            as: 'sender'
          }
        })

        const receiver = this.getUser(message.receiverName)
        if (receiver?.socketId) {
          socket.to(receiver.socketId).emit('getMessages', newMessageWithSender)
        }
      } catch (err) {
        console.log(err)
      }
    })

    socket.on('unSendMessage', (message) => {
      const receiver = this.getUser(message.receiverName)
      if (receiver?.socketId) {
        socket.to(receiver.socketId).emit('getUnSendMessage', message.ids)
      }
    })

    socket.emit('onlineUsers', this.onlineUsers)
    socket.on('disconnect', () => {
      this.removeUser(socket.id)
    })
  }

  middlewareImplementation (socket: Socket, next:any) {
    // Implement your middleware for orders here
    return next()
  }
}

export default ChatSocket
