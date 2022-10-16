/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react'
import { FC } from 'react'
import './style.css'

import {
  Box, Modal, TextField, Button, MenuItem, InputLabel, Select, FormControl,
} from '@mui/material'
import ApiService from '../../helpers/ApiService'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const addEvent = (e:React.FormEvent<HTMLFormElement>): void => {
  e.preventDefault()
  const data = {
    name: e.currentTarget.eventName.value,
    startTime: e.currentTarget.startTime.value,
    endTime: e.currentTarget.endTime.value,
    status: e.currentTarget.status.value,
    longitude: e.currentTarget.longitude.value,
    latitude: e.currentTarget.latitude.value,
    img: e.currentTarget.image.value,
    description: e.currentTarget.description.value,
    hashtag: e.currentTarget.hashtag.value,
  }
  console.log(data)
  ApiService.post('/api/v1/events', { ...data })
    .then((res:object) => console.log(res))
    .catch()
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
        <Box className="container" sx={style}>
          <p>Create an Event</p>
          <h1>Event Details</h1>
          <form onSubmit={addEvent}>
            <TextField
              required
              id="outlined-required"
              label="Event Name"
              variant="outlined"
              size="small"
              fullWidth
              name="eventName"
              sx={{ display: 'block', margin: '20px 0' }}
            />
            <div style={{ display: 'flex', margin: '20px 0' }}>
              <TextField
                sx={{ marginRight: '5px' }}
                required
                id="outlined-required"
                label="Start Time"
                type="datetime-local"
                defaultValue="2022-10-16T10:30"
                variant="outlined"
                size="small"
                name="startTime"
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
                size="small"
                name="endTime"
                defaultValue="2022-10-16T10:30"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <FormControl fullWidth required>

              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="outlined-required"
                label="Status"
                name="status"
                size="small"
              >
                <MenuItem value="in-progress">In-Progress</MenuItem>
                <MenuItem value="upcoming">Upcoming</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </Select>
            </FormControl>

            {/* <TextField
              required
              name="status"
              id="outlined-required"
              label="Status"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ display: 'block', margin: '20px 0' }}
            /> */}
            <div style={{ display: 'flex', margin: '20px 0' }}>
              <TextField
                sx={{ marginRight: '5px' }}
                name="longitude"
                required
                id="outlined-required"
                label="Longitude"
                variant="outlined"
                size="small"
                fullWidth
              />
              <TextField
                name="latitude"
                required
                id="outlined-required"
                label="Latitude"
                variant="outlined"
                size="small"
                fullWidth
              />
            </div>
            <TextField
              required
              name="image"
              id="outlined-required"
              label="Event Picture"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ display: 'block', margin: '20px 0' }}
            />
            <TextField
              required
              name="description"
              id="outlined-required"
              label="Description"
              variant="outlined"
              size="small"
              multiline
              maxRows={4}
              fullWidth
              sx={{ display: 'block', margin: '20px 0' }}
            />
            <TextField
              required
              name="hashtag"
              id="outlined-required"
              label="Hashtag"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ display: 'block', margin: '20px 0' }}
            />

            <Button
              className="submit-btn"
              variant="contained"
              fullWidth
              name="addBtn"
              type="submit"
            >
              Publish Event
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default EventModal
