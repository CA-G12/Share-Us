import IUserProfile from '../IUserProfile'

export default interface IProfileActionsProp {
  userData : IUserProfile | null
  editUserData: Function
  blockUser: () => void
  followUser: Function
}
