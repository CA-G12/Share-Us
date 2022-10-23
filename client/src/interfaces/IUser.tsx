export default interface IUser {
  id: number
  username: string
  password: string | null
  email: string
  bio?: string | null
  location?: string | null
  profileImg: string
  headerImg: string
  followers?: number[] | null
  following?: number[] | null
  blocked?: number[] | null
  notifications?: string[] | null
  createdAt?: string
  updatedAt?: string
}
