import { User } from '../db'
import deleteFromUsers from './deleteFromUsers'
const unBlock = async (userId:number, blockId:number, blocked:number[]):Promise<any> => {
  const authUser = await deleteFromUsers(userId, blockId, blocked, 'blocked')
  const updated = await User.findOne({ where: { id: blockId }, attributes: { exclude: ['password'] } })
  return { authUser, updated }
}
export default unBlock
