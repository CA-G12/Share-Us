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
 interface IOneComment {
  message: string;
  data:ICommentsData;
}

interface IComments {
  message: string;
  data:ICommentsData[];
}

export type { IComments, IOneComment }
