import { Box } from '@mui/system'
import React, {
  FC, useState, useEffect, useRef,
} from 'react'
import {
  Alert, TextField, IconButton, Button, Menu,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { IMessagesProps, IMyMessages, IRealTimeMessages } from '../../interfaces'
import { sx } from './style'
import SingleFriend from './SingleFriend'
import { useAuth } from '../../hooks/useAuth'

const Messages:FC<IMessagesProps> = (
  {
    currentUser, socket, realTimeMessages, setMyMessages, myMessages,
  },
) => {
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const [typing, setTyping] = useState<any>('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
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
      message,
      senderId: auth.user?.id,
      receiverId: currentUser.id,
      receiverName: currentUser.username,
    }
    socket.emit('sendMessage', messageObj)
    setMyMessages((prev:IMyMessages[]) => [...prev, { ...messageObj, createdAt: Date.now() }])
    setMessage('')
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>):void => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

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

  useEffect(() => {
    socket.on('typingResponse', (typingResponse) => {
      setTyping(typingResponse)
    })

    socket.on('endTypingResponse', (endTypingResponse) => {
      setTyping(endTypingResponse)
    })
  }, [socket])

  if (currentUser.id) {
    return (
      <>
        <Box sx={sx.messagesTitle} onClick={() => navigate(`/users/${currentUser.id}`)}>
          <SingleFriend username={currentUser.username} profileImg={currentUser.profileImg} />
        </Box>
        <Box className="messages-textField-container">

          <Box className="messages-container">
            {
            realTimeMessages.concat(myMessages)
              .filter((ele:Partial<IRealTimeMessages>) => (
                ele.senderId === currentUser.id
                && ele.receiverId === auth.user?.id)
                || (ele.senderId === auth.user?.id && ele.receiverId === currentUser.id))
              .sort((
                a:Partial<IRealTimeMessages>,
                b:Partial<IRealTimeMessages>,
              ) => dayjs(a.createdAt).diff(b.createdAt))
              .map((ele:Partial<IRealTimeMessages>) => (
                <p
                  key={ele.id || Math.random()}
                  className={
                    auth.user?.id === ele.senderId
                      ? 'me single-message' : 'others single-message'
                  }
                >
                  {ele.message}
                </p>
              ))
          }
            {typing && typing.userTyping === currentUser.username
              ? <p className="typing-status">{typing.message}</p> : null}
            <div ref={lastMessageRef} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '0 15px' }}>

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
  return (
    <Box sx={sx.alertBox}>
      <Alert
        severity="info"
        variant="outlined"
        sx={sx.alertItem}
      >
        No Messages Opened
      </Alert>
    </Box>

  )
}

export default Messages
