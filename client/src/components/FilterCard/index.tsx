/* eslint-disable no-unused-vars */
import { FC } from 'react'
import './style.css'
import { Typography, TextField } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { EventFilterProp } from '../../interfaces'

const FilterCards:FC<EventFilterProp> = ({
  setCurrentStatus, currentStatus, setStartTime,
  startTime, endTime, setEndTime,
}) => {
  const handleFromChange = (value:any):void => {
    setStartTime(value.toISOString())
  }

  const handleToChange = (value:any):void => {
    setEndTime(value.toISOString())
  }

  const handleFilterEvents = (e:any):void => {
    setCurrentStatus(e.target.value)
  }

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
              value={startTime}
              onChange={handleFromChange}
            // eslint-disable-next-line react/jsx-props-no-spreading
              renderInput={(params) => <TextField {...params} />}
            />
            <DateTimePicker
              label="To"
              value={endTime}
              onChange={handleToChange}
            // eslint-disable-next-line react/jsx-props-no-spreading
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className="event-lists">
          <ul>
            <button className={currentStatus === 'all' ? 'black' : 'transparent'} type="button" value="all" onClick={handleFilterEvents}>All events</button>
            <button className={currentStatus === 'in-progress' ? 'green' : 'transparent'} type="button" value="in-progress" onClick={handleFilterEvents}>In-progress</button>
            <button className={currentStatus === 'upcoming' ? 'orange' : 'transparent'} type="button" value="upcoming" onClick={handleFilterEvents}>Upcoming</button>
            <button className={currentStatus === 'closed' ? 'red' : 'transparent'} type="button" value="closed" onClick={handleFilterEvents}>Closed</button>
          </ul>
        </div>
      </div>

    </div>

  )
}

export default FilterCards
