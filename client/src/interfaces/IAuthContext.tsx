import IUser from './IUser'

export default interface IAuthContext {
  user: IUser | null
  signIn: Function
  signUp: Function
  signOut: Function
}
