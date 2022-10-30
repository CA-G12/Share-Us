import React, {
  createContext, useContext,
} from 'react'
import { useAuth } from './useAuth'
import ApiService from '../services/ApiService'

export const FollowingContext = createContext<any>({})

export const useProviderFollowing = ():any => {
  const auth = useAuth()
  const followUser = async (id:number):Promise<boolean> => {
    if (auth.user) {
      const follow = await ApiService.patch(`/users/following/${id}`, {})
      await auth.setUser(follow?.data?.authUser[0])
      return true
    }
    return false
  }
  const blockUser = async (id: number): Promise<boolean> => {
    if (auth.user) {
      const block = await ApiService.patch(`/users/blocked/${id}`, {})
      await auth.setUser(block.data.authUser[0])
      return true
    }
    return false
  }
  return { followUser, blockUser }
}
export const ContextProvider = ({ children }:any):React.ReactElement => {
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
