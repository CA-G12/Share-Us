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
    <Box sx={sx.friendsTitle}>
      <Typography>
        Friends
      </Typography>
    </Box>
    {
      friends.length
        ? friends?.map((ele) => (
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
        )) : <Typography textAlign="center" m="10px">No chatting</Typography>
    }

  </Box>

)

export default Friends
