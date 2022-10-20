import IUserProfile from '../IUserProfile'

export default interface UserProfileProp {
  userData: IUserProfile | null
  getUserData: Function
}
