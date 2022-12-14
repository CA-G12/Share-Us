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
import { useFollowing } from '../../hooks/useFollowing'

const FriendCard:FC<IFriendCard> = ({
  image,
  username,
  bio,
  button,
  id,
}) => {
  const navigate = useNavigate()
  const followingHook = useFollowing()

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
      <CardActions sx={{ padding: ' 0 35px' }}>
        <Button
          sx={{
            textTransform: 'capitalize',
            color: 'white',
            margin: '10px',
            padding: '10px',
            fontSize: '1rem',
            backgroundColor: '#2A2A2A',
            '&:hover': {
              backgroundColor: '#333',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          value={followingHook.getBtnContent(id, button)}
          onClick={handleFollow}
          size="small"
        >
          {followingHook.getBtnContent(id, button)}
        </Button>
      </CardActions>
    </Card>
  )
}
export default FriendCard
