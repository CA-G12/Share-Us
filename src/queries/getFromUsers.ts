import { User } from '../db'
const getFromUsers = async (id:number, attributes:string[]):Promise<any> => {
  return await User.findOne({ where: { id }, attributes })
}
export default getFromUsers
