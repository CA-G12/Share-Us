import IUser from './IUser'

export default interface IRealTimeMessages {
  id: number
  message:string
  senderId:number
  receiverId: number
  receiverName: string
  createdAt: string
  updatedAt: string
  sender?:Partial<IUser>
}
