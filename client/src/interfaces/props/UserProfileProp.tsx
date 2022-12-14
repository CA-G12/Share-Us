import IEventDetails from '../IEventDetails'
import IUserProfile from '../IUserProfile'

export default interface UserProfileProp {
  userData: IUserProfile | null
  editUserData: Function
  setUserData: Function
  allData: IEventDetails[]
}
