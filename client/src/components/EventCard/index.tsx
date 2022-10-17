import { FC } from 'react'
import './style.css'
import {
  Box, Card, CardContent, CardMedia, Typography, Avatar, Button, CardActions,
} from '@mui/material'
import { EventCardProps } from '../../interfaces'

const EventCard:FC<EventCardProps> = ({ event }) => (
  <div className="card-container">
    {event.map((evt) => (
      <Card sx={{ width: 250, maxHeight: 350, margin: '0.5rem 0' }}>
        <CardMedia
          component="img"
          height="150"
          image={evt.img}
          alt="green iguana"
        />
        <Box className="status-date">
          <Typography className="event-status" sx={{ fontSize: 12 }}>{evt.status}</Typography>
          <Typography
            className="event-date"
            sx={{
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {evt.startTime}

          </Typography>
        </Box>
        <CardContent>
          <Typography
            gutterBottom
            variant="h2"
            component="div"
            sx={{ fontSize: 15, fontWeight: 700 }}
          >
            {evt.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12 }}>
            {evt.description}
          </Typography>
        </CardContent>
        <CardActions sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
        >
          <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
          }}
          >
            <Avatar
              aria-label="recipe"
              src={evt.User.profileImg}
              alt="user-image"
              sx={{ width: '30px', height: '30px' }}
            />
            <Typography
              variant="body1"
              sx={{ fontSize: 13, fontWeight: 500 }}
            >
              {evt.User.username}

            </Typography>
          </Box>
          <Button sx={{
            fontSize: 10,
            color: 'black',
            fontWeight: 600,
            textTransform: 'capitalize',
          }}
          >
            Read more
          </Button>
        </CardActions>

      </Card>
    ))}

  </div>

)

export default EventCard
