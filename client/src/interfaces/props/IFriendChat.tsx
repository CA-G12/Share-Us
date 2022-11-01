import IUser from '../IUser'

export default interface IFriendChatProps{
  friends:IUser[],
  setCurrentUser:Function
}
