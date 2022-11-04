import { Grid } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { IUser } from '../../interfaces'
import ApiService from '../../services/ApiService'
import Friends from './Friends'
import Messages from './Messages'
import { sx } from './style'

const ChatBox:FC = () => {
  const friendsInit = {
    id: 0,
    username: '',
    password: '',
    email: '',
    profileImg: '',
    headerImg: '',
    bio: '',
    location: '',
    followers: [0],
    following: [0],
    blocked: [0],
    notifications: [''],
    createdAt: '',
    updatedAt: '',
  }
  const [allFriends, setAllFriends] = useState<IUser[]>([friendsInit])
  const [currentUser, setCurrentUser] = useState<IUser>(friendsInit)
  const auth = useAuth()

  useEffect(() => {
    const getFriends = async ():Promise<void> => {
      if (auth.user) {
        const friends = await ApiService.get(`/api/v1/users/${auth.user?.id}/following`)
        setAllFriends(friends.data.data)
      }
    }
    getFriends()
  }, [auth.user])

  return (
    <Grid container sx={sx.ChatBox} justifyContent="center">
      <Grid xs={3} item>
        <Friends friends={allFriends} setCurrentUser={setCurrentUser} />
      </Grid>
      <Grid xs={9} item sx={{ position: 'relative' }}>
        <Messages currentUser={currentUser} />
      </Grid>
    </Grid>
  )
}

export default ChatBox
