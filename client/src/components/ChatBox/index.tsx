import { Drawer, Button } from '@mui/material'
import { Box } from '@mui/system'
import MenuIcon from '@mui/icons-material/Menu'
import React, {
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
      }
    }
    getChatMessages()
  }, [currentUser])

  useEffect(() => {
    (async ():Promise<void> => {
      if (currentUser.id) {
        const result2 = await ApiService.put(
          '/api/v1/chat/messages/status',
          { senderId: currentUser.id },
        )
        setAsRead(result2.data.data[0])
      }
    })()
  }, [currentUser, realTimeMessages])
  type Anchor = 'top' | 'left' | 'bottom' | 'right';
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent
    | React.MouseEvent) => {
    if (
      event.type === 'keydown'
      && ((event as React.KeyboardEvent).key === 'Tab'
        || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const anchor = 'left'

  return (
    <>
      <Button
        sx={{ width: '10px', height: 'max-content' }}
        onClick={toggleDrawer(anchor, true)}
      >
        <MenuIcon sx={{ color: '#2a2a2a' }} />

      </Button>

      <Box sx={sx.ChatBox} className="chat-box">
        <Box sx={{ width: '100%' }}>
          <Messages
            currentUser={currentUser}
            socket={socket}
            realTimeMessages={realTimeMessages}
            setMyMessages={setMyMessages}
            myMessages={myMessages}
            onlineUsers={onlineUsers}
          />
        </Box>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          <Friends friends={allFriends} setCurrentUser={setCurrentUser} onlineUsers={onlineUsers} />
        </Drawer>
      </Box>
    </>
  )
}

export default ChatBox
