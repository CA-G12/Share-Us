import { FC } from 'react'
import {
  Avatar, Stack, Typography,
} from '@mui/material'
import StyledBadge from './StyledBadge'
import { sx } from './style'
import { IUser } from '../../interfaces'

const SingleFriend:FC<Partial<IUser>> = ({ username, profileImg }) => (
  <Stack direction="row" spacing={2} sx={sx.stackFriend}>
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
    >
      <Avatar alt="user" src={profileImg} />
    </StyledBadge>
    <Typography>{username}</Typography>
  </Stack>
)

export default SingleFriend
