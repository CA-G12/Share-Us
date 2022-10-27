/* eslint-disable react/jsx-props-no-spreading */
import {
  useEffect,
  useState,
  FormEvent,
  FC,
} from 'react'
import './style.css'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { toast } from 'react-toastify'
import {
  Box, Modal, TextField, Button, MenuItem, InputLabel, Select, FormControl,
  Autocomplete, Chip,
} from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import ApiService from '../../services/ApiService'
import schema from '../../validation/addEventValidate'
import AddEventMap from '../AddEventMap'

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

interface IData{
  name?: string,
  description?: string,
  img?: string,
  status?: string,
  startTime?: string,
  endTime?: string,
  longitude?: string,
  latitude?: string,
  hashtag?: Array<string>
}

const EventModal: FC = () => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<IData>({})
  const [startTime, setStartTime] = useState<Dayjs | null>(
    dayjs(),
  )
  const [endTime, setEndTime] = useState<Dayjs | null>(
    dayjs(),
  )
  const [hash, setHash] = useState<Array<string>>([])
  const [showHash, setShowHash] = useState<Array<object>>([])

  useEffect(() => {
    ApiService.get('/api/v1/hashtags')
      .then((res) => {
        setShowHash(res.data.data)
      })
  }, [open])

  useEffect(() => {
    setData({ ...data, hashtag: hash })
  }, [hash])
  useEffect(() => {
    setData({ ...data, startTime: startTime?.toISOString() })
  }, [startTime])

  useEffect(() => {
    setData({ ...data, endTime: endTime?.toISOString() })
  }, [endTime])

  const addEvent = (e:FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    schema.validate(data)
      .then(() => {
        ApiService.post('/api/v1/events', { ...data })
          .then((res) => {
            toast.success(res.data.message)
            setOpen(false)
            setData({})
          })
          .catch((err) => {
            toast.error(err.response.data.message)
          })
      })
      .catch((err) => {
        toast.warning(err.message)
      })
  }

  const handelChange = (e:any) : void => {
    const { target } = e
    const value = target.type === 'checkbox' ? target.checked : target.value
    const { name } = target
    setData({ ...data, [name]: value })
  }

  return (
    <div>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Add Event
      </Button>
      <Modal
        className="box"
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>Create an Event</p>
          <h1>Event Details</h1>
          <form onSubmit={addEvent}>
            <TextField
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
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="outlined-required"
                label="Status"
                name="status"
                size="small"
                onChange={handelChange}
              >
                <MenuItem value="in-progress">In-Progress</MenuItem>
                <MenuItem value="upcoming">Upcoming</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </Select>
            </FormControl>

            <div style={{
              display: 'flex',
              margin: '20px 0',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            >
              <TextField
                sx={{ marginRight: '5px' }}
                name="longitude"
                onChange={handelChange}
                id="outlined-required"
                label="Longitude"
                variant="outlined"
                size="small"
                fullWidth
              />
              <TextField
                name="latitude"
                onChange={handelChange}
                id="outlined-required"
                label="Latitude"
                variant="outlined"
                size="small"
                fullWidth
              />
              <AddEventMap />
            </div>
            <TextField
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
            <Autocomplete
              multiple
              id="tags-outlined"
              options={showHash.map((e:any) => e.title)}
              freeSolo
              onChange={(event, value) => setHash(value)}
              sx={{ display: 'block', margin: '20px 0' }}
              renderTags={
                (value: readonly string[], getTagProps) => (
                  value.map((option: string, index: number) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  )))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={hash}
                  name="hashtag"
                  variant="filled"
                  label="Hashtag"
                  placeholder="Hashtag"
                />
              )}
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
