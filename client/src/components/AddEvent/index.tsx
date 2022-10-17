/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  useEffect,
  useState,
  FormEvent,
  FC,
} from 'react'
import './style.css'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import {
  Box, Modal, TextField, Button, MenuItem, InputLabel, Select, FormControl,
} from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import ApiService from '../../services/ApiService'

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

const EventModal: FC = () => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({})
  const [startTime, setStartTime] = useState<Dayjs | null>(
    dayjs(),
  )
  const [endTime, setEndTime] = useState<Dayjs | null>(
    dayjs(),
  )

  useEffect(() => {
    setData({ ...data, startTime: startTime?.toISOString() })
  }, [startTime])

  useEffect(() => {
    setData({ ...data, endTime: endTime?.toISOString() })
  }, [endTime])

  const addEvent = (e:FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log(data)
    ApiService.post('/api/v1/events', { ...data })
      .then((res:object) => console.log(res))
      .catch()
  }

  const handelChange = (e:any) => {
    const { target } = e
    const value = target.type === 'checkbox' ? target.checked : target.value
    const { name } = target
    setData({ ...data, [name]: value })
  }

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
              onChange={handelChange}
              id="outlined-required"
              label="Event Name"
              variant="outlined"
              size="small"
              fullWidth
              name="name"
              sx={{ display: 'block', margin: '20px 0' }}
            />
            <div style={{ display: 'flex', margin: '20px 0' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Start Time"
                  value={startTime}
                  onChange={setStartTime}
                  renderInput={(params) => (
                    <TextField
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...params}
                    />
                  )}
                />
                <DateTimePicker
                  label="End Time"
                  value={endTime}
                  onChange={setEndTime}
                // eslint-disable-next-line react/jsx-props-no-spreading
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <FormControl fullWidth required>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="outlined-required"
                label="Status"
                name="status"
                size="small"
                value="in-progress"
              >
                <MenuItem value="in-progress" selected>In-Progress</MenuItem>
                <MenuItem value="upcoming">Upcoming</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </Select>
            </FormControl>

            <div style={{ display: 'flex', margin: '20px 0' }}>
              <TextField
                sx={{ marginRight: '5px' }}
                name="longitude"
                required
                onChange={handelChange}
                id="outlined-required"
                label="Longitude"
                variant="outlined"
                size="small"
                fullWidth
              />
              <TextField
                name="latitude"
                required
                onChange={handelChange}
                id="outlined-required"
                label="Latitude"
                variant="outlined"
                size="small"
                fullWidth
              />
            </div>
            <TextField
              required
              onChange={handelChange}
              name="img"
              id="outlined-required"
              label="Event Picture"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ display: 'block', margin: '20px 0' }}
            />
            <TextField
              required
              onChange={handelChange}
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
              onChange={handelChange}
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
