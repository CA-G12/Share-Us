import React, { FC } from 'react'
import './style.css'
import TextField from '@mui/material/TextField'
import dayjs from 'dayjs'
import { Typography } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

const FilterCards:FC = () => {
  const [value, setValue] = React.useState(dayjs('2022-08-18T21:11:54'))
  const handleChange = (newValue:any):void => setValue(newValue)

  return (
    <div className="big-container">
      <Typography variant="h3" gutterBottom>
        Explore events
      </Typography>
      <div className="filter-container">
        <div className="date">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="From"
              value={value}
              onChange={handleChange}
            // eslint-disable-next-line react/jsx-props-no-spreading
              renderInput={(params) => <TextField {...params} />}
            />
            <DateTimePicker
              label="To"
              value={value}
              onChange={handleChange}
            // eslint-disable-next-line react/jsx-props-no-spreading
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className="event-lists">
          <ul>
            <li>All events</li>
            <li>In-progress</li>
            <li>Upcoming</li>
            <li>Closed</li>
          </ul>
        </div>
      </div>

    </div>

  )
}

export default FilterCards
