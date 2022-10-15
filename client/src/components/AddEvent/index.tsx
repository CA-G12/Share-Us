/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react'
import { FC } from 'react'
import './style.css'

import {
  Box, Modal, TextField, Button,
} from '@mui/material'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const EventModal: FC = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Add Event
      </Button>
      <Modal
        className="box"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>Create an Event</p>
          <h1>Event Details</h1>

          <TextField
            required
            id="outlined-required"
            label="Event Name"
            variant="outlined"
            fullWidth
            sx={{ display: 'block', margin: '20px 0' }}
          />
          <div style={{ display: 'flex', margin: '20px 0' }}>
            <TextField
              required
              id="outlined-required"
              label="Start Time"
              type="datetime-local"
              defaultValue="2022-10-16T10:30"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="End Time"
              type="datetime-local"
              variant="outlined"
              defaultValue="2022-10-16T10:30"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <TextField
            required
            id="outlined-required"
            label="Status"
            variant="outlined"
            fullWidth
            sx={{ display: 'block', margin: '20px 0' }}
          />
          <div style={{ display: 'flex', margin: '20px 0' }}>
            <TextField
              required
              id="outlined-required"
              label="Longitude"
              variant="outlined"
              fullWidth
              sx={{ display: 'block' }}
            />
            <TextField
              required
              id="outlined-required"
              label="Latitude"
              variant="outlined"
              fullWidth
              sx={{ display: 'block' }}
            />
          </div>
          <TextField
            required
            id="outlined-required"
            label="Event Picture"
            variant="outlined"
            fullWidth
            sx={{ display: 'block', margin: '20px 0' }}
          />
          <TextField
            required
            id="outlined-required"
            label="Description"
            variant="outlined"
            multiline
            maxRows={4}
            fullWidth
            sx={{ display: 'block', margin: '20px 0' }}
          />
          <TextField
            required
            id="outlined-required"
            label="Hashtag"
            variant="outlined"
            fullWidth
            sx={{ display: 'block', margin: '20px 0' }}
          />

          <Button href="#" className="submit-btn" variant="contained" fullWidth>
            Publish Event
          </Button>
        </Box>
      </Modal>
    </div>
  )
}
export default EventModal
