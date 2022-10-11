import { FC } from 'react';
import './style.css';
import {
  Box, Card, CardContent, CardMedia, Typography, Avatar, Button, CardActions,
} from '@mui/material';
import { cardProps } from '../../interfaces';

const EventCard:FC<cardProps> = ({ eventData }) => (
  <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      component="img"
      height="220"
      image={eventData.img}
      alt="green iguana"
    />
    <Box className="status-date">
      <Typography className="event-status">{eventData.status}</Typography>
      <Typography className="event-date">{eventData.startTime}</Typography>
    </Box>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {eventData.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {eventData.description}
      </Typography>
    </CardContent>
    <CardActions sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Avatar aria-label="recipe" src={eventData.profileImage} alt="user-image" />
        <Typography variant="body1">{eventData.username}</Typography>
      </Box>
      <Button sx={{ alignSelf: 'flex-end' }}>Read more</Button>
    </CardActions>

  </Card>
);

export default EventCard;
