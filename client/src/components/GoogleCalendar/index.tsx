import * as React from 'react'
import { FC } from 'react'
import Button from '@mui/material/Button'
import {
  Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions,
} from '@mui/material'
import { toast } from 'react-toastify'

const GCalendar: FC<{getEventDataForCalendar:Function}> = ({ getEventDataForCalendar }) => {
  const [open, setOpen] = React.useState(false)
  // const [openOnce, setOpenOnce] = React.useState(true)
  const handleClickOpen = ():void => {
    setOpen(true)
  }

  const handleClose = ():void => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Google Calendar
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
            sx={{ backgroundColor: '#EEEEEE' }}
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
