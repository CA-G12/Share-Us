import IUserProfile from '../IUserProfile'

export default interface IEditProfile {
  editUserData: Function
  userData: IUserProfile | null
}
