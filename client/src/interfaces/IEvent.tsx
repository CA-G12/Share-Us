export default interface IEvent {
  name: string;
  description: string;
  img: string;
  status: 'in-progress' | 'closed' | 'upcoming';
  startTime: string;
  profileImage: string;
  username: string;
}
