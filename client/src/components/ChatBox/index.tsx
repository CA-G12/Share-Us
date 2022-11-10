import { Grid } from '@mui/material'
import {
  FC, useContext, useEffect, useState,
} from 'react'
import { io } from 'socket.io-client'
import { StartChat } from '../../context/startChat'
import { useAuth } from '../../hooks/useAuth'
import {
  IMyMessages, IUser, IRealTimeMessages, ICurrentUser,
} from '../../interfaces'
import ApiService from '../../services/ApiService'
import Friends from './Friends'
import Messages from './Messages'
import { sx } from './style'
import './style.css'

const socket = io(`${process.env.REACT_APP_BASE_URL}/chat`)

const ChatBox:FC<{setAsRead: Function }> = ({ setAsRead }) => {
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
  const [realTimeMessages, setRealTimeMessages] = useState<IRealTimeMessages[]>([])
  const [myMessages, setMyMessages] = useState<IMyMessages[]>([])
  const [onlineUsers, setOnlineUsers] = useState<any[]>([])

  const [currentUser, setCurrentUser] = useState<ICurrentUser>(friendsInit)
  const [, setIsConnect] = useState<boolean>(false)
  const { startChat } = useContext(StartChat)

  const auth = useAuth()

  useEffect(() => {
    const getFriends = async ():Promise<void> => {
      if (auth.user) {
        const friends = await ApiService.get('/api/v1/users/chatted')

        const isExist = friends.data.data.find((ele:any) => ele.id === startChat.id)

        if (startChat.username && !isExist) {
          setAllFriends([startChat, ...friends.data.data])
        } else {
          setAllFriends(friends.data.data)
        }
        setCurrentUser(startChat)
      }
    }
    getFriends()
  }, [auth.user, startChat])

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnect(socket.connected) // true
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
      setAllFriends((prev) => {
        const isExist = prev.find((ele) => ele.id === message?.sender.id)
        if (!isExist) {
          return [message?.sender, ...prev]
        }
        return prev
      })

      setRealTimeMessages((prev) => [...prev, message])
    })

    socket.on('onlineUsers', (message) => {
      setOnlineUsers(message)
    })
    return () => {
      socket.off('getMessages')
      socket.off('onlineUsers')
    }
  }, [])

  useEffect(() => {
    const getChatMessages = async ():Promise<void> => {
      if (currentUser.id) {
        const oldMessages = await ApiService.get(`/api/v1/chat/messages/${currentUser.id}`)
        setMyMessages([])
        setRealTimeMessages(() => oldMessages.data.data)

        const updateStatus = await ApiService.put(
          '/api/v1/chat/messages/status',
          { senderId: currentUser.id },
        )
        if (setAsRead) setAsRead(updateStatus.data.data[0])
      }
    }
    getChatMessages()
  }, [currentUser])

  return (
    <Grid container sx={sx.ChatBox} justifyContent="center">
      <Grid xs={3} item>
        <Friends friends={allFriends} setCurrentUser={setCurrentUser} onlineUsers={onlineUsers} />
      </Grid>
      <Grid xs={9} item sx={{ position: 'relative' }}>
        <Messages
          currentUser={currentUser}
          socket={socket}
          realTimeMessages={realTimeMessages}
          setMyMessages={setMyMessages}
          myMessages={myMessages}
          onlineUsers={onlineUsers}
        />
      </Grid>
    </Grid>
  )
}

export default ChatBox
