interface IEventUser {
  username: string;
  profileImg: string;
  id: number;
}

export default interface IEventDetails {
  name: string;
  description: string;
  img: string;
  status: 'in-progress' | 'closed' | 'upcoming';
  startTime: string;
  endTime: string;
  longitude:string;
  latitude: string;
  createdAt: string;
  updatedAt:string;
  User: IEventUser;
}
