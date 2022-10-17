import React, { FC } from 'react'
import './style.css'
import dayjs from 'dayjs'
import { Typography, TextField } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { EventFilterProp } from '../../interfaces'

const FilterCards:FC<EventFilterProp> = ({ setData }) => {
  const [value, setValue] = React.useState(dayjs('2022-08-18T21:11:54'))
  const handleChange = (newValue:any):void => setValue(newValue)

  const handleFilterEvents = (e:any):void => { setData('success', e.target) }

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
            <button type="button" onClick={handleFilterEvents}>All events</button>
            <button type="button" onClick={handleFilterEvents}>In-progress</button>
            <button type="button" onClick={handleFilterEvents}>Upcoming</button>
            <button type="button" onClick={handleFilterEvents}>Closed</button>
          </ul>
        </div>
      </div>

    </div>

  )
}

export default FilterCards
