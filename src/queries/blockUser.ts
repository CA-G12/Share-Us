import { User } from '../db'
import { Message } from '../config/messages'
import CustomError from '../helpers/CustomError'
import getFromUsers from './getFromUsers'
import { UserAttributes } from './addToUsers'
const blockUser = async (userId:number, blockId:number, blocked:number[]):Promise<any> => {
  const { followers: myFollowers, following: myFollowing } = await getFromUsers(userId, ['followers', 'following'])
  const { followers: hisFollowers, following: hisFollowing } = await getFromUsers(blockId, ['following', 'followers'])

  if (!myFollowers || !myFollowing || !hisFollowing || !hisFollowers) {
    throw new CustomError(Message.VALIDATION_ERROR, 422)
  }

  blocked?.push(blockId)
  const authUser = await User.update(
    {
      blocked,
      followers: myFollowers?.filter((ele:number) => ele !== blockId),
      following: myFollowing?.filter((ele:number) => ele !== blockId)
    },
    { where: { id: userId }, returning: UserAttributes })
  const updated = await User.update({
    following: hisFollowing?.filter((ele:number) => ele !== Number(userId)),
    followers: hisFollowers?.filter((ele:number) => ele !== Number(userId))
  }, { where: { id: blockId }, returning: UserAttributes })
  return { updated, authUser }
}
export default blockUser
