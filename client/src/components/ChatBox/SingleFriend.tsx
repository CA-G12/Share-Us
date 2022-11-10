import { FC } from 'react'
import {
  Avatar, Stack, Typography,
} from '@mui/material'
import StyledBadge from './StyledBadge'
import { sx } from './style'
import { IUser } from '../../interfaces'

const SingleFriend:FC<Partial<IUser>> = ({ username, profileImg, onlineUsers }) => (
  <Stack direction="row" spacing={2} sx={sx.stackFriend}>
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant={onlineUsers?.find((ele) => ele.username === username) ? 'dot' : 'standard'}
    >
      <Avatar alt="user" src={profileImg} />
    </StyledBadge>
    <Typography sx={{ overflowWrap: 'wrap', wordBreak: 'break-all' }}>{username}</Typography>
  </Stack>
)

export default SingleFriend
