import IUser from './IUser'

export default interface IAuthContext {
  user: IUser | null
  setUser: Function | null
  signIn: Function
  signUp: Function
  signOut: Function
}
