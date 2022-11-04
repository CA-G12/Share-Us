import { Box } from '@mui/system'
import { FC, useState } from 'react'
import {
  Alert, TextField,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { IMessagesProps } from '../../interfaces'
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
  const auth = useAuth()

  const handleEnter = (e:any):any => {
    if (e.key === 'Enter') {
      const messageObj = {
        message,
        senderId: auth.user?.id,
        receiverId: currentUser.id,
        receiverName: currentUser.username,
      }
      socket.emit('sendMessage', messageObj)

      setMyMessages((prev:any) => [...prev, { ...messageObj, createdAt: Date.now() }])
      setMessage('')
    }
  }

  if (currentUser.id) {
    return (
      <>
        <Box sx={sx.messagesTitle} onClick={() => navigate(`/users/${currentUser.id}`)}>
          <SingleFriend username={currentUser.username} profileImg={currentUser.profileImg} />
        </Box>
        <Box>

          <Box className="messages-container">
            {
            realTimeMessages.concat(myMessages)
              .filter((ele:any) => (
                ele.senderId === currentUser.id
                && ele.receiverId === auth.user?.id)
                || (ele.senderId === auth.user?.id && ele.receiverId === currentUser.id))
              .sort((a:any, b:any) => dayjs(a.createdAt).diff(b.createdAt))
              .map((ele:any) => (
                <p
                  key={Math.random()}
                  className={
                    auth.user?.id === ele.senderId
                      ? 'me single-message' : 'others single-message'
                  }
                >
                  {ele.message}
                </p>
              ))
          }
          </Box>
          <Box sx={{ display: 'grid', placeItems: 'center' }}>
            <TextField
              id="outlined-basic"
              label="Message"
              variant="outlined"
              size="small"
              sx={sx.messageTextField}
              onChange={(e) => { setMessage(e.target.value) }}
              onKeyDown={handleEnter}
              value={message}
            />
          </Box>
        </Box>

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
