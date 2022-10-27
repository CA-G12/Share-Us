import { User } from '../db'
import { UserAttributes } from './addToUsers'
const deleteFromUsers = async (userId:number, filteredId:number, usersIds:number[], attribute:string):Promise<any> => {
  return await User.update({ [attribute]: usersIds.filter((ele:number) => ele !== filteredId) }, {
    where: { id: userId },
    returning: UserAttributes
  })
}
export default deleteFromUsers
