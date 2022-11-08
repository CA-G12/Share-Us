import {
  Box, Card, CardContent, CardMedia, Typography, Avatar, Button, CardActions,
  DialogActions, Dialog, DialogTitle, IconButton,
} from '@mui/material'
import dayjs from 'dayjs'
import DeleteIcon from '@mui/icons-material/Delete'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EventCardProps } from '../../interfaces'
import { useAuth } from '../../hooks/useAuth'

const EventCard:FC<EventCardProps> = ({ event, handleDelete }) => {
  const navigate = useNavigate()
  const userId = useAuth().user?.id

  const [open, setOpen] = useState(false)
  const handleClickOpen = ():void => setOpen(true)
  const handleClose = ():void => setOpen(false)

  return (
    <Card
      sx={{
        width: 290, maxHeight: 350, margin: '0.5rem 0', position: 'relative',
      }}
      key={event.id}
    >
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
        {' '}
        { userId === event.User.id && (
        <IconButton
          className="delete-event-btn"
          aria-label="delete"
          onClick={handleClickOpen}
        >
          <DeleteIcon />
        </IconButton>
        )}

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure to delete the event?
          </DialogTitle>
          <DialogActions>
            <Button color="primary" onClick={handleClose}>cancel</Button>
            <Button
              color="error"
              onClick={() => { handleClose(); handleDelete(event.id) }}
              autoFocus
            >
              delete
            </Button>
          </DialogActions>
        </Dialog>

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
          onClick={() => navigate(`/users/${event.User?.id}`)}
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
            src={event.User?.profileImg}
            alt="user-image"
            sx={{ width: '30px', height: '30px' }}
          />
          <Typography
            variant="body1"
            sx={{ fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
          >
            {event.User?.username}

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
          onClick={() => navigate(`/events/${event.id}`)}
        >
          Read more
        </Button>
      </CardActions>

    </Card>
  )
}

export default EventCard
