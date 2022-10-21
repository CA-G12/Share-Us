import { FC } from 'react'
import './style.css'
import {
  Box, Card, CardContent, CardMedia, Typography, Avatar, Button, CardActions,
} from '@mui/material'
import dayjs from 'dayjs'
import { EventCardProps } from '../../interfaces'

const EventCard:FC<EventCardProps> = ({ event }) => (
  <div className="card-container">
    {!event.length ? (
      <Typography sx={{ margin: 'auto' }}>
        No Events Found
      </Typography>
    ) : event.map((evt) => (
      <Card sx={{ width: 250, maxHeight: 350, margin: '0.5rem 0' }} key={evt.id}>
        <CardMedia
          component="img"
          height="150"
          image={evt.img}
          alt="green iguana"
        />
        <Box className="status-date">
          <Typography
            className={`event-status ${evt.status}`}
            sx={{ fontSize: 12 }}
          >
            {evt.status}

          </Typography>
          <Typography
            className="event-date"
            sx={{
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {dayjs(evt.startTime).format('MMM D, YYYY h:mm A')}

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
          >
            Read more
          </Button>
        </CardActions>

      </Card>
    ))}

  </div>

)

export default EventCard
