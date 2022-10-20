import IUserProfile from '../IUserProfile'

export default interface IEditProfile {
  getUserData: Function
  userData: IUserProfile | null
}
