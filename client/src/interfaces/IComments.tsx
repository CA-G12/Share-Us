interface IEventUser {
  username: string;
  profileImg: string;
  id: number;
}

interface ICommentsData {
  id: number;
  content: string;
  image: string;
  createdAt: string;
  updatedAt:string;
  UserId:number;
  EventId:number;
  User: IEventUser;
}

export default interface IComments {
  message: string;
  data:ICommentsData[];
}
