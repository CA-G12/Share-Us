interface IEventUser {
  username: string;
  profileImg: string;
  id: number;
}

export default interface ICommentsData {
  id: number;
  content: string;
  image: string;
  createdAt: string;
  updatedAt?:string;
  UserId?:number;
  EventId:number;
  User: IEventUser;
}

// export default interface CommentsProps {
//   data:ICommentsData[]
// }
