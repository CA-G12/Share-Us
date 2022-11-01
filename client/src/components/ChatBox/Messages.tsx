import { Box } from '@mui/system'
import { FC } from 'react'
import {
  Alert, TextField,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { IMessagesProps } from '../../interfaces'
import { sx } from './style'
import SingleFriend from './SingleFriend'

const Messages:FC<IMessagesProps> = ({ currentUser }) => {
  const navigate = useNavigate()

  if (currentUser.id) {
    return (
      <>
        <Box sx={sx.messagesTitle} onClick={() => navigate(`/users/${currentUser.id}`)}>
          <SingleFriend username={currentUser.username} profileImg={currentUser.profileImg} />
        </Box>
        <Box sx={{ display: 'grid', placeItems: 'center' }}>
          <TextField
            id="outlined-basic"
            label="Message"
            variant="outlined"
            size="small"
            sx={sx.messageTextField}
          />
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
