import { Grid } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useAuth } from '../../hooks/useAuth'
import { IUser } from '../../interfaces'
import ApiService from '../../services/ApiService'
import Friends from './Friends'
import Messages from './Messages'
import { sx } from './style'
import './style.css'

const socket = io(`${process.env.REACT_APP_BASE_URL}/chat`)

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
  const [realTimeMessages, setRealTimeMessages] = useState<any[]>([])
  const [myMessages, setMyMessages] = useState<any[]>([])

  const [currentUser, setCurrentUser] = useState<IUser>(friendsInit)
  const [, setIsConnect] = useState<boolean>(false)
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

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnect(socket.connected) // true
      console.log(socket.connected)
    })
    if (auth?.user?.username) {
      socket.emit('newUser', auth.user.username)
    }

    socket.on('disconnect', () => {
      setIsConnect(socket.connected)
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [auth.user?.username])

  useEffect(() => {
    socket.on('getMessages', (message) => {
      setRealTimeMessages((prev) => [...prev, message])
    })
  }, [])

  useEffect(() => {
    const getChatMessages = async ():Promise<void> => {
      const oldMessages = await ApiService.get(`/api/v1/chat/${currentUser.id}`)
      setMyMessages([])
      setRealTimeMessages(() => oldMessages.data.data)
    }
    getChatMessages()
  }, [currentUser])

  return (
    <Grid container sx={sx.ChatBox} justifyContent="center">
      <Grid xs={3} item>
        <Friends friends={allFriends} setCurrentUser={setCurrentUser} />
      </Grid>
      <Grid xs={9} item sx={{ position: 'relative' }}>
        <Messages
          currentUser={currentUser}
          socket={socket}
          realTimeMessages={realTimeMessages}
          setMyMessages={setMyMessages}
          myMessages={myMessages}
        />
      </Grid>
    </Grid>
  )
}

export default ChatBox
