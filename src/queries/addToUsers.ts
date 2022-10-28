import { User } from '../db'

export const UserAttributes = ['id', 'username', 'email', 'bio', 'location',
  'profileImg', 'headerImg', 'followers', 'following', 'blocked', 'notifications',
  'createdAt', 'updatedAt'
]
const addToUsers = async (userId:number, newId:number, usersIds:number[], attribute:string):Promise<any> => {
  usersIds.push(newId)
  return await User.update({ [attribute]: usersIds }, {
    where: { id: userId },
    returning: UserAttributes

  })
}
export default addToUsers
