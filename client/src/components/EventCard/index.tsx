import { FC } from 'react'
import './style.css'
import {
  Box, Card, CardContent, CardMedia, Typography, Avatar, Button, CardActions,
} from '@mui/material'
import { EventCardProps } from '../../interfaces'

const EventCard:FC<EventCardProps> = ({ event }) => (
  <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      component="img"
      height="220"
      image={event.img}
      alt="green iguana"
    />
    <Box className="status-date">
      <Typography className="event-status">{event.status}</Typography>
      <Typography className="event-date">{event.startTime}</Typography>
    </Box>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {event.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {event.description}
      </Typography>
    </CardContent>
    <CardActions sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Avatar aria-label="recipe" src={event.profileImage} alt="user-image" />
        <Typography variant="body1">{event.username}</Typography>
      </Box>
      <Button sx={{ alignSelf: 'flex-end' }}>Read more</Button>
    </CardActions>

  </Card>
)

export default EventCard
