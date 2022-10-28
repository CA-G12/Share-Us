import { User } from '../db'
const getAllUsers = async (userIds:number[], excludedAttributes:string[]):Promise<any> => {
  return await User.findAll({ where: { id: userIds }, attributes: { exclude: excludedAttributes } })
}
export default getAllUsers
