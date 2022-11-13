import { FC } from 'react'
import {
  Avatar, Stack, Typography, Badge,
} from '@mui/material'
import StyledBadge from './StyledBadge'
import { sx } from './style'
import { IUser } from '../../interfaces'

const SingleFriend:FC<Partial<IUser>> = ({
  username, profileImg, onlineUsers, sent,
}) => (
  <Stack direction="row" spacing={2} sx={sx.stackFriend}>
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant={onlineUsers?.find((ele) => ele.username === username) ? 'dot' : 'standard'}
    >
      <Avatar alt="user" src={profileImg} />
    </StyledBadge>
    <Typography
      className="friends-name"
      sx={{ overflowWrap: 'wrap', wordBreak: 'break-all' }}
    >
      {username}

    </Typography>
    {sent?.length !== 0
    && (
    <Badge
      color="error"
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      badgeContent={
      sent?.length

}
      className="count-unread-friends"
    />

    )}

  </Stack>
)

export default SingleFriend
