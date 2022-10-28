/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import { FC } from 'react'

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material'

interface cardData{
  image?: string
  username?: string
  bio?: string
  button?: string
}

const FriendCardHandler:FC<cardData> = ({
  image,
  username,
  bio,
  button,
}) => (
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
      }}
      component="img"
      alt="Event Image"
      image={image}
    />
    <CardContent sx={{ flex: '1 1 auto' }}>
      <Typography gutterBottom variant="h5" component="div">
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
        size="small"
      >
        {button}
      </Button>
    </CardActions>
  </Card>
)
export default FriendCardHandler
