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
  Box,
} from '@mui/material'
import dayjs from 'dayjs'

interface cardData{
  image?: string
  eventname?: string
  startTime?: string
  status?: string
  Hashtags?: any
  button?: string
  description?: string
}

const EventCardHandler:FC<cardData> = ({
  image,
  eventname,
  startTime,
  status,
  Hashtags,
  button,
  description,
}) => (
  <Card sx={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  }}
  >
    <CardMedia
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '40%',
      }}
      component="img"
      alt="Event Image"
      image={image}
    />
    <CardContent sx={{ flex: '1 1 auto' }}>
      <Typography gutterBottom variant="h5" component="div">
        {eventname}
      </Typography>
      <Typography gutterBottom variant="body2" component="div">
        { `Date: ${dayjs(startTime).format('DD/MM/YYYY')}`}
        { ` | Time: ${dayjs(startTime).format('HH:mm:ss a')}`}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
      <Typography
        className={status === 'in-progress'
          ? 'green' : status === 'upcoming'
            ? 'orange' : status === 'closed'
              ? 'red' : 'transparent'}
        gutterBottom
        variant="body2"
        component="div"
      >
        {status}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        { Hashtags?.map((ele:any) => (
          <Typography
            sx={{
              padding: '3px',
              margin: '5px 5px 5px 0',
              backgroundColor: 'lightblue',
              borderRadius: '5px',
            }}
            variant="body2"
            color="text.secondary"
          >
            {`# ${ele.Hashtags}`}
          </Typography>
        ))}
      </Box>
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
export default EventCardHandler
