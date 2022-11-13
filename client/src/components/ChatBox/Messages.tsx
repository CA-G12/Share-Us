import { Box } from '@mui/system'
import React, {
  FC, useState, useEffect, useRef,
} from 'react'
import {
  Alert, TextField, IconButton, Button, Menu, Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined'
import ChatIcon from '@mui/icons-material/Chat'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { v4 as uuidv4 } from 'uuid'
import { io } from 'socket.io-client'
import { IMessagesProps, IMyMessages, IRealTimeMessages } from '../../interfaces'
import { sx } from './style'
import SingleFriend from './SingleFriend'
import { useAuth } from '../../hooks/useAuth'
import ApiService from '../../services/ApiService'

const socketNotification = io(`${process.env.REACT_APP_BASE_URL}/notifications`)

const Messages:FC<IMessagesProps> = (
  {
    currentUser, socket, realTimeMessages, setMyMessages, myMessages, onlineUsers,
  },
) => {
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const [typing, setTyping] = useState<any>('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [, setIsConnect] = useState<boolean>(false)

  const open = Boolean(anchorEl)
  const auth = useAuth()

  const lastMessageRef = useRef<any>(null)

  const handleOpenEmoji = (event: React.MouseEvent<HTMLButtonElement>):void => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseEmoji = ():void => {
    setAnchorEl(null)
  }

  const onEmojiClick = (event: any):void => {
    setMessage((prev) => prev + event.native)
  }

  const handleSendMessage = ():void => {
    const messageObj = {
      id: uuidv4(),
      message,
      senderName: auth.user?.username,
      senderId: auth.user?.id,
      receiverId: currentUser.id,
      receiverName: currentUser.username,
    }

    socket.emit('sendMessage', messageObj)

    socketNotification.emit('messageNotification', {
      receiverName: currentUser.username,
      senderName: auth.user?.username,
    })

    setMyMessages((prev:IMyMessages[]) => [...prev, { ...messageObj, createdAt: Date.now() }])
    setMessage('')
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>):void => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const isBlocked = (userId:number, userBlocked:number[]):boolean => userBlocked?.includes(userId)

  useEffect(() => {
    socketNotification.on('connect', () => {
      setIsConnect(socketNotification.connected) // true
    })
    if (auth?.user?.username) socketNotification.emit('newUser', auth.user.username)

    socketNotification.on('disconnect', () => {
      setIsConnect(socketNotification.connected)
    })

    return () => {
      socketNotification.off('connect')
      socketNotification.off('disconnect')
    }
  }, [auth.user?.username])

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [realTimeMessages, myMessages, typing])

  const handleTyping = ():void => {
    socket.emit('typing', {
      receiverName: currentUser.username,
      userTyping: auth.user?.username,
      message: `${auth.user?.username} is typing...`,
    })
  }

  const handleEndTyping = ():void => {
    socket.emit('endTyping', {
      receiverName: currentUser.username,
    })
  }
  const [deletedMsg, setDeletedMsg] = useState<any>([])

  useEffect(() => {
    socket.on('typingResponse', (typingResponse) => {
      setTyping(typingResponse)
    })

    socket.on('endTypingResponse', (endTypingResponse) => {
      setTyping(endTypingResponse)
    })

    socket.on('getUnSendMessage', (unSendMessageResponse) => {
      setDeletedMsg((prev:any) => [...unSendMessageResponse, ...prev])
    })
    return () => {
      socket.off('typingResponse')
      socket.off('endTypingResponse')
      socket.off('getUnSendMessage')
    }
  }, [socket])

  const handleUnSendMessage = async (id:number):Promise<void> => {
    const deleted = await ApiService.delete(`/api/v1/chat/messages/${id}`)
    if (deleted.data.msg) {
      setDeletedMsg((prev:any) => [...prev, id])

      socket.emit('unSendMessage', {
        ids: [...deletedMsg, id],
        receiverName: currentUser.username,
      })
    }
  }

  const filterMessages = (arr:any):any => arr.filter((ele:Partial<IRealTimeMessages>) => (
    (ele.senderId === currentUser.id
      && ele.receiverId === auth.user?.id))
      || (ele.senderId === auth.user?.id && ele.receiverId === currentUser.id))
    .filter((ele:any) => !deletedMsg.includes(ele.id)).sort((
      a:Partial<IRealTimeMessages>,
      b:Partial<IRealTimeMessages>,
    ) => dayjs(a.createdAt).diff(b.createdAt))

  if (currentUser.id) {
    return (
      <>
        <Box sx={sx.messagesTitle} onClick={() => navigate(`/users/${currentUser.id}`)}>
          <SingleFriend
            username={currentUser.username}
            profileImg={currentUser.profileImg}
            onlineUsers={onlineUsers}
          />
        </Box>
        <Box className="messages-textField-container">
          <Box className="messages-container">
            {
              filterMessages(realTimeMessages.concat(myMessages))
                .map((ele:Partial<IRealTimeMessages>) => (
                  <div className="message-un-send" key={ele.id}>
                    <p
                      className={
                      auth.user?.id === ele.senderId
                        ? 'me single-message' : 'others single-message'
                    }
                    >
                      {ele.message}
                    </p>
                    { auth.user?.id === ele.senderId
                    && (
                    <button
                      className="unSend un-send-btn"
                      type="button"
                      onClick={() => {
                        handleUnSendMessage(ele?.id || 0)
                      }}
                    >
                      unSend
                    </button>
                    )}
                  </div>

                ))
            }
            {typing && typing.userTyping === currentUser.username
              && <p className="typing-status">{typing.message}</p> }
            <div ref={lastMessageRef} />
          </Box>
          {
            (isBlocked(auth.user.id, currentUser.blocked)
            || isBlocked(currentUser?.id, auth.user?.blocked))
              ? (
                <Alert
                  variant="outlined"
                  severity="error"
                  sx={{ width: '80%', margin: 'auto' }}
                >
                  User is blocked
                </Alert>
              ) : (
                <>
                  <Box
                    className="send-messages-container"
                  >

                    <IconButton
                      className="Emoji-Btn-chat"
                      color="default"
                      aria-label="add to shopping cart"
                      sx={{ width: 'max-content', padding: '0 10px ' }}
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleOpenEmoji}
                    >
                      <EmojiEmotionsOutlinedIcon
                        style={{ width: '32px', height: '32px' }}
                      />
                    </IconButton>

                    <TextField
                      id="outlined-basic"
                      label="Message"
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={(e) => {
                        setMessage(e.target.value)
                      }}
                      onKeyDown={handleEnter}
                      onFocus={handleTyping}
                      onBlur={handleEndTyping}
                      value={message}
                    />
                    <Button
                      variant="text"
                      onClick={handleSendMessage}
                    >
                      send
                    </Button>
                  </Box>
                  <Menu
                    className="chat-emoji-container"
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseEmoji}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                    sx={{ height: '100vh' }}
                  >
                    <Box className="chat-emoji">
                      <Picker
                        style={{ width: '350px' }}
                        data={data}
                        onEmojiSelect={onEmojiClick}
                        perLine={6}
                        theme="light"
                        previewPosition="none"
                      />
                    </Box>
                  </Menu>
                </>
              )
          }
        </Box>

      </>
    )
  }
  return (
    <Box sx={sx.alertBox}>

      <Box sx={{
        border: '1px solid #ddd',
        padding: '1.3rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.8rem',

      }}
      >
        <Box sx={{
          border: '1px solid #ddd',
          borderRadius: '50%',
          width: '4.5rem',
          height: '4.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <ChatIcon sx={{
            fontSize: '2.2rem',
          }}
          />
        </Box>
        <Typography variant="h5" component="h3">
          Your Messages
        </Typography>
        <Typography>
          Chat with your friends and join events
        </Typography>
      </Box>
    </Box>

  )
}

export default Messages
