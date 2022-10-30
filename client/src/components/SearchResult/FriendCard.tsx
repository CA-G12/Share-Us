import { FC } from 'react'

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { IFriendCard } from '../../interfaces'
import { useAuth } from '../../hooks/useAuth'
import { useFollowing } from '../../hooks/useFollowing'

const FriendCard:FC<IFriendCard> = ({
  image,
  username,
  bio,
  button,
  id,
}) => {
  const navigate = useNavigate()
  const auth = useAuth()
  const followingHook = useFollowing()
  const isInMyFollowing = (userId:number):boolean => auth.user?.following?.includes(userId)
  const isMe = (userId:number):boolean => auth.user?.id === userId
  const isInMyBlocked = (userId:number):boolean => auth.user?.blocked?.includes(userId)
  const handleFollow = async (e:any):Promise<any> => {
    if (e.target.value === button || e.target.value === 'Unfollow') {
      const isDone = await followingHook.followUser(id)
      if (!isDone) {
        navigate('/login')
      }
    } else if (e.target.value === 'View') {
      navigate(`/users/${id}`)
    } else if (e.target.value === 'Unblock') {
      await followingHook.blockUser(id)
    }
  }

  const getBtnContent = ():string => {
    let text = ''
    if (isInMyFollowing(id)) {
      text = 'Unfollow'
    } else if (isMe(id)) {
      text = 'View'
    } else if (isInMyBlocked(id)) {
      text = 'Unblock'
    } else {
      text = button
    }
    return text
  }

  return (
    <Card sx={{
      width: '80%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '0 auto 20px auto',
    }}
    >
      <CardMedia
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          height: '150px',
          width: '150px',
          cursor: 'pointer',
        }}
        component="img"
        alt="Event Image"
        image={image}
        onClick={() => navigate(`/users/${id}`)}
      />
      <CardContent sx={{ flex: '1 1 auto' }}>
        <Typography
          sx={{ cursor: 'pointer' }}
          gutterBottom
          variant="h5"
          component="div"
          onClick={() => navigate(`/users/${id}`)}
        >
          {username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {bio}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{
            color: 'white',
            margin: '10px',
            padding: '10px',
            backgroundColor: '#256D85',
            '&:hover': {
              backgroundColor: '#256D85',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          value={getBtnContent()}
          onClick={handleFollow}
          size="small"
        >
          {getBtnContent()}
        </Button>
      </CardActions>
    </Card>
  )
}
export default FriendCard
