import { Socket } from 'socket.io-client'
import IUser from '../IUser'

export default interface IMessagesProps {
  currentUser: IUser
  socket:Socket,
  realTimeMessages : Object[],
  setMyMessages: Function
  myMessages: Object[]
  onlineUsers?:any[]
}
