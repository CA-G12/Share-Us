import { Socket } from 'socket.io-client'
import { ICurrentUser } from '..'

export default interface IMessagesProps {
  currentUser: ICurrentUser
  socket:Socket,
  realTimeMessages : Object[],
  setMyMessages: Function
  myMessages: Object[]
  onlineUsers?:any[]
}
