import {
  Divider, Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { FC, useState } from 'react'
import { IFriendChatProps } from '../../interfaces'
import SingleFriend from './SingleFriend'
import { sx } from './style'
import { useAuth } from '../../hooks/useAuth'

const Friends:FC<IFriendChatProps> = ({ friends, setCurrentUser, onlineUsers }) => {
  const [readMessages, setReadMessages] = useState<number[]>([])
  const userId = useAuth().user.id
  return (
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
            <Box onClick={() => {
              setReadMessages([...readMessages, ele.id])
              setCurrentUser(ele)
            }}
            >
              <SingleFriend
                profileImg={ele.profileImg}
                username={ele.username}
                onlineUsers={onlineUsers}
                sent={readMessages.includes(ele.id)
                  ? [] : ele.sent?.filter((msg:any) => msg.receiverId === userId)}
              />
            </Box>
            <Divider />
          </Box>
        )) : <Typography textAlign="center" m="10px">No chatting</Typography>
    }

    </Box>

  )
}

export default Friends
