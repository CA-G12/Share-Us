import React, {
  createContext, useContext,
} from 'react'
import { useAuth } from './useAuth'
import ApiService from '../services/ApiService'

interface IFollowingContext {
  followUser?:Function,
  blockUser?:Function,
  getButtonContent?:Function,
}
export const FollowingContext = createContext<IFollowingContext>({})

export const useProviderFollowing = ():any => {
  const auth = useAuth()
  const followUser = async (id:number):Promise<boolean> => {
    if (auth.user) {
      const follow = await ApiService.patch(`/api/v1/users/following/${id}`, {})
      await auth.setUser(follow?.data?.authUser[0])
      return true
    }
    return false
  }
  const blockUser = async (id: number): Promise<boolean> => {
    if (auth.user) {
      const block = await ApiService.patch(`/api/v1/users/blocked/${id}`, {})
      await auth.setUser(block.data.authUser[0])
      return true
    }
    return false
  }
  const isInMyFollowing = (userId:number):boolean => auth.user?.following?.includes(userId)
  const isMe = (userId:number):boolean => auth.user?.id === userId
  const isInMyBlocked = (userId:number):boolean => auth.user?.blocked?.includes(userId)

  const getBtnContent = (id:number, button:string):string => {
    let text = ''
    if (isInMyFollowing(id)) {
      text = 'Unfollow'
    } else if (isMe(id)) {
      text = 'View'
    } else if (isInMyBlocked(id)) {
      text = 'Unblock'
    } else {
      text = button
    }
    return text
  }
  return { followUser, blockUser, getBtnContent }
}
export const FollowingProvider = ({ children }:any):React.ReactElement => {
  const followingUtil = useProviderFollowing()
  return (
    <FollowingContext.Provider
      value={followingUtil}
    >
      {children}
    </FollowingContext.Provider>
  )
}
export const useFollowing = ():any => useContext(FollowingContext)
