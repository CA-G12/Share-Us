/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
import './style.css'
import { useState, FC } from 'react'
import { Paper } from '@mui/material'
import Map from '../Map'
import JoinedPeopleModel from '../JoinedPeopleModel.tsx'
import IPropsAboutEvent from '../../interfaces/props/AboutEvent'
// eslint-disable-next-line no-undef
const AboutEvent:FC < IPropsAboutEvent > = ({
  description, Hashtags, joinedPeople, interestedPeople, longitude, latitude,
}): JSX.Element => {
  console.log(Hashtags)
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = ():void => setOpen(true)
  const handleClose = ():void => setOpen(false)

  return (
    <div className="about-event">
      <div className="description-container">
        <h3>description</h3>
        <p>
          {description}
        </p>
        <div className="hashtag-container">
          {
        Hashtags
        && Hashtags.map((ele: any) => (
          <Paper
            key={ele.id}
            elevation={1}
            variant="outlined"
            className="hashtag-label"
            sx={{ backgroundColor: ele.color }}
          >
            {ele.title}
          </Paper>
        ))
      }
        </div>
      </div>

      <div className="participants-map">
        <div className="participants-container">
          <h3>Participants</h3>
          <div>
            <button>
              <span>{interestedPeople.length}</span>
              interested
            </button>
            <button onClick={handleOpen}>
              <span>{joinedPeople.length}</span>
              Joined
            </button>
          </div>
        </div>
        <div className="map-container">
          <Map longitude={longitude} latitude={latitude} />
          <p>Location: London</p>
        </div>
      </div>
      <JoinedPeopleModel joinedPeople={joinedPeople} handleClose={handleClose} open={open} />
    </div>
  )
}

export default AboutEvent
