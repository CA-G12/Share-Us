import * as React from 'react'
import { FC } from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import {
  Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Button,
} from '@mui/material'
import { toast } from 'react-toastify'
import './style.css'

const GCalendar: FC<{getEventDataForCalendar:Function, disabled: boolean}> = (
  { getEventDataForCalendar, disabled },
) => {
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = ():void => {
    setOpen(true)
  }

  const handleClose = ():void => {
    setOpen(false)
  }

  return (
    <div>
      <Button
        startIcon={<CalendarMonthIcon />}
        variant="contained"
        onClick={handleClickOpen}
        disabled={disabled}
        sx={{
          backgroundColor: '#FFE5E5',
          width: 'fitContent',
        }}
      >
        Add to Google Calendar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do You want to add this event to your Google calendar?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            sx={{ backgroundColor: '#F5F5F5', width: '130px' }}
            onClick={() => {
              handleClose()
              getEventDataForCalendar() // handle event data from the details page
              toast.success('Added Successfully')
            }}
            autoFocus
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default GCalendar
