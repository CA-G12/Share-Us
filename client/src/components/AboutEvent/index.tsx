import './style.css'
import {
  useState, FC,
} from 'react'

import { Paper } from '@mui/material'
import Map from '../Map'
import JoinedPeopleModel from '../JoinedInterestedPeopleModel.tsx'
import IPropsAboutEvent from '../../interfaces/props/AboutEvent'

const AboutEvent:FC < IPropsAboutEvent > = ({
  description, Hashtags, joinedPeople, interestedPeople, longitude,
  latitude,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [listPeople, setListPeople] = useState<any>([])
  const [modalTitle, setModalTitle] = useState<string>('')
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
            <button
              type="button"
              onClick={() => {
                setListPeople(interestedPeople)
                setModalTitle('Interested People')
                handleOpen()
              }}
            >
              <span>{interestedPeople.length}</span>
              interested
            </button>
            <button
              type="button"
              onClick={() => {
                setListPeople(joinedPeople)
                setModalTitle('Joined People')
                handleOpen()
              }}
            >
              <span>{joinedPeople.length}</span>
              Joined
            </button>
          </div>
        </div>
        <div className="map-container">
          <Map longitude={longitude} latitude={latitude} />
          <p>Event Location</p>
        </div>
      </div>
      {/* listPeople */}
      <JoinedPeopleModel
        title={modalTitle}
        listPeople={listPeople}
        handleClose={handleClose}
        open={open}
      />
    </div>
  )
}

export default AboutEvent
