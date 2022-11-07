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
import { useNavigate } from 'react-router-dom'
import { IEventCard } from '../../interfaces'

const getStatusClassName = (status :string |undefined):string => {
  if (status === 'in-progress') {
    return 'green'
  } if (status === 'upcoming') {
    return 'orange'
  } if (status === 'closed') {
    return 'red'
  }
  return 'transparent'
}
const EventCard:FC<IEventCard> = ({
  image,
  eventname,
  startTime,
  status,
  Hashtags,
  button,
  description,
  id,
}) => {
  const navigate = useNavigate()
  return (
    <Card sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '27vh',
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
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ padding: '0.5rem 0' }}
        >
          {description}
        </Typography>
        <Typography
          className={getStatusClassName(status)}
          gutterBottom
          variant="body2"
          component="div"
        >
          {status}
        </Typography>
        <Box sx={{ display: 'flex' }}>
          { Hashtags?.map((ele:any) => (
            <Typography
              key={ele.id}
              sx={{
                padding: '3px',
                margin: '5px 5px 5px 0',
                backgroundColor: ele.color,
                borderRadius: '5px',
              }}
              variant="body2"
              color="text.secondary"
            >
              {`# ${ele.title}`}
            </Typography>
          ))}
        </Box>
      </CardContent>
      <CardActions>
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
          size="small"
          onClick={() => navigate(`/events/${id}`)}
        >
          {button}
        </Button>
      </CardActions>
    </Card>
  )
}
export default EventCard
