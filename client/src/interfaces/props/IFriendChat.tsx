import IUser from '../IUser'

export default interface IFriendChatProps{
  friends:IUser[]
  onlineUsers:any[]
  setCurrentUser:Function
}
