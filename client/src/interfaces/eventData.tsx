export default interface eventData {
  name: string;
  description: string;
  img: string;
  status: 'in-progress' | 'closed' | 'upcoming';
  startTime: string;
  profileImage: string;
  username: string;
// eslint-disable-next-line semi, no-extra-semi
};
