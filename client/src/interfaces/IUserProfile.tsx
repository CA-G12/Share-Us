export default interface IUserProfile {
  username: string,
  bio: string,
  location: string,
  headerImg: string
  profileImg: string
  followers: number[]
  following: number[]
  blocked: number[]
}
