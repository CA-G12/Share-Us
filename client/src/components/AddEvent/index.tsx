/* eslint-disable react/jsx-props-no-spreading */
import {
  useEffect,
  useState,
  FC,
} from 'react'
import './style.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { toast } from 'react-toastify'
import {
  Box, Modal, TextField, Button, MenuItem, InputLabel, Select, FormControl,
  Autocomplete, Chip,
} from '@mui/material'
import {
  useFormik,
} from 'formik'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import schema from '../../validation/addEventValidate'
import ApiService from '../../services/ApiService'
import AddEventMap from '../AddEventMap'
import { useAuth } from '../../hooks/useAuth'
import IAddEventInitialValues from '../../interfaces/IAddEventInitialValues'

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

const AddEvent: FC = () => {
  const [open, setOpen] = useState(false)
  const [showHash, setShowHash] = useState<Array<object>>([])
  const auth = useAuth()

  useEffect(() => {
    ApiService.get('/hashtags')
      .then((res) => {
        setShowHash(res.data.data)
      })
  }, [open])

  const formik = useFormik({
    initialValues: IAddEventInitialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      ApiService.post('/events', { ...values })
        .then((res) => {
          toast.success(res.data.message)
          formik.resetForm()
          setOpen(false)
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    },
  })

  const handleLon = (e:any) => formik.setFieldValue('longitude', e)
  const handleLat = (e:any) => formik.setFieldValue('latitude', e)
  const handlePlaceName = (e:any) => formik.setFieldValue('placeName', e)

  return (
    <div className="container">
      {
        auth.user && (
          <Button
            sx={{
              '&:hover': {
                backgroundColor: '#2A2A2A',
                border: 0,
              },
              fontSize: '0.8rem',
              backgroundColor: '#2A2A2A',
              boxShadow: ' 0px 1px 4px #2a2a2a',
              borderRadius: '8px',
              color: '#ececec',
              border: '0',
              textTransform: 'capitalize',
              padding: '0.4rem 0.8rem',
              cursor: 'pointer',
              height: '35px',
            }}
            variant="outlined"
            onClick={() => setOpen(true)}
          >
            Add Event
          </Button>
        )
      }

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
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="outlined-required"
              label="Event Name"
              variant="outlined"
              size="small"
              fullWidth
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{ display: 'block', margin: '20px 0' }}
            />
            <div style={{ display: 'flex', margin: '20px 0' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Start Time"
                  value={formik.values.startTime}
                  onChange={
                    (e:any) => formik.setFieldValue('startTime', e.toISOString())
                  }
                  renderInput={(params) => (
                    <TextField
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...params}
                    />
                  )}
                />
                <DateTimePicker
                  label="End Time"
                  value={formik.values.endTime}
                  onChange={
                    (e:any) => formik.setFieldValue('endTime', e.toISOString())
                  }
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
                value={formik.values.status}
                onChange={formik.handleChange}
                error={formik.touched.status && Boolean(formik.errors.status)}
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
                disabled
                sx={{ marginRight: '5px' }}
                name="longitude"
                value={formik.values.longitude}
                error={formik.touched.longitude && Boolean(formik.errors.longitude)}
                helperText={formik.touched.longitude && formik.errors.longitude}
                id="outlined-required"
                label="Longitude"
                variant="outlined"
                size="small"
                fullWidth
              />
              <TextField
                disabled
                name="latitude"
                value={formik.values.latitude}
                error={formik.touched.latitude && Boolean(formik.errors.latitude)}
                helperText={formik.touched.latitude && formik.errors.latitude}
                id="outlined-required"
                label="Latitude"
                variant="outlined"
                size="small"
                fullWidth
              />
              <AddEventMap setLon={handleLon} setLat={handleLat} setPlaceName={handlePlaceName} />
            </div>

            <TextField
              name="placeName"
              value={formik.values.placeName}
              error={formik.touched.placeName && Boolean(formik.errors.placeName)}
              helperText={formik.touched.placeName && formik.errors.placeName}
              id="outlined-required"
              label="Place Name"
              variant="outlined"
              size="small"
              fullWidth
            />
            <TextField
              value={formik.values.img}
              onChange={formik.handleChange}
              error={formik.touched.img && Boolean(formik.errors.img)}
              helperText={formik.touched.img && formik.errors.img}
              name="img"
              id="outlined-required"
              label="Event Picture"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ display: 'block', margin: '20px 0' }}
            />
            <TextField
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
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
              onChange={(e: any, value) => {
                formik.setFieldValue('hashtag', [...value])
              }}
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
                  value={formik.values.hashtag}
                  name="hashtag"
                  variant="filled"
                  label="Hashtag"
                  placeholder="Hashtag"
                />
              )}
            />
            <span>{formik.touched.hashtag && formik.errors.hashtag}</span>

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

export default AddEvent
