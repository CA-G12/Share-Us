import { FC } from 'react';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import './style.css';
import {
  Box, Card, CardContent, CardMedia, Button, Typography, CardHeader, Avatar,
} from '@mui/material';

const EventCard:FC = () => (

  <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      component="img"
      height="220"
      image="https://cdn.discordapp.com/attachments/956865613425410078/1029018892019974265/pexels-kseniya-budko-9485465_1.png"
      alt="green iguana"
    />
    <Box className="status-date">
      <Typography className="event-status">In Progress</Typography>
      <Typography className="event-date">12/10/2022</Typography>
    </Box>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Lizard
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
      </Typography>
    </CardContent>
    <CardHeader
      avatar={(
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src="https://cdn.discordapp.com/attachments/956865613425410078/1029018892019974265/pexels-kseniya-budko-9485465_1.png" alt="user-image" />
        )}
      action={(
        <IconButton aria-label="settings">
          <Button size="small">Read More</Button>
        </IconButton>
        )}
      title="Shrimp"
    />
  </Card>
);

export default EventCard;
