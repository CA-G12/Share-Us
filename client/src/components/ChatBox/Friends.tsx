import {
  Divider, Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'
import { IFriendChatProps } from '../../interfaces'
import SingleFriend from './SingleFriend'
import { sx } from './style'

const Friends:FC<IFriendChatProps> = ({ friends, setCurrentUser, onlineUsers }) => (
  <Box sx={sx.allFriends}>
    <Box sx={sx.inputSearchBox}>
      <Typography>
        Messages
      </Typography>
    </Box>
    {
        friends?.map((ele) => (
          <Box key={ele.id}>
            <Box onClick={() => setCurrentUser(ele)}>
              <SingleFriend
                profileImg={ele.profileImg}
                username={ele.username}
                onlineUsers={onlineUsers}
              />
            </Box>
            <Divider />
          </Box>

        ))
      }
  </Box>

)

export default Friends
