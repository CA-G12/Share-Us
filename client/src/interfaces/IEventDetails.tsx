interface IEventUser {
  username: string;
  profileImg: string;
  id: number;
}

export default interface IEventDetails {
  id: number,
  name: string;
  description: string;
  img: string;
  status?: 'in-progress' | 'closed' | 'upcoming';
  startTime: string;
  endTime: string;
  longitude:string;
  latitude: string;
  placeName:string;
  createdAt: string;
  updatedAt:string;
  User: IEventUser;
  Hashtags:string[] |[];
  InterestedPeople: any[];
  JoinedPeople: any[];
}
