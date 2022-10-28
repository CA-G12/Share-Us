import {
  Box, Card, CardContent, CardMedia, Typography, Avatar, Button, CardActions,
} from '@mui/material'
import dayjs from 'dayjs'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { EventCardProps } from '../../interfaces'

const EventCard:FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate()

  return (
    <Card sx={{ width: 250, maxHeight: 350, margin: '0.5rem 0' }} key={event.id}>
      <CardMedia
        component="img"
        height="150"
        image={event.img}
        alt="green iguana"
      />
      <Box className="status-date">
        <Typography
          className={`event-status ${event.status}`}
          sx={{ fontSize: 12 }}
        >
          {event.status}

        </Typography>
        <Typography
          className="event-date"
          sx={{
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          {dayjs(event.startTime).format('MMM D, YYYY h:mm A')}

        </Typography>
      </Box>
      <CardContent>
        <Typography
          gutterBottom
          variant="h2"
          component="div"
          sx={{ fontSize: 15, fontWeight: 700 }}
        >
          {event.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12 }}>
          {event.description}
        </Typography>
      </CardContent>
      <CardActions sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}
      >
        <Box
          onClick={() => navigate(`/users/${event.User.id}`)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            cursor: 'pointer',
          }}
        >
          <Avatar
            aria-label="recipe"
            src={event.User.profileImg}
            alt="user-image"
            sx={{ width: '30px', height: '30px' }}
          />
          <Typography
            variant="body1"
            sx={{ fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
          >
            {event.User.username}

          </Typography>
        </Box>
        <Button
          sx={{
            fontSize: 10,
            color: '#181818',
            fontWeight: 600,
            textTransform: 'capitalize',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
          onClick={() => navigate(`/event/${event.id}`)}
        >
          Read more
        </Button>
      </CardActions>

    </Card>
  )
}

export default EventCard
