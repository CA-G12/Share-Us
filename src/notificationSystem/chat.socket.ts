import { Socket } from 'socket.io'
import MySocketInterface from './mySocketInterface'
import { Chat } from '../models'
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
    socket.on('sendMessage', async (message) => {
      try {
        const newMessage = await Chat.create(message)
        const receiver = this.getUser(message.receiverName)
        if (receiver?.socketId) {
          console.log(receiver)

          socket.to(receiver.socketId).emit('getMessages', newMessage)
        }
      } catch (err) {
        console.log(err)
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

export default ChatSocket
