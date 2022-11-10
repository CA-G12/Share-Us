import './style.css'
import {
  useState, FC,
} from 'react'

import { Paper, Typography } from '@mui/material'
import Map from '../Map'
import JoinedPeopleModel from '../JoinedInterestedPeopleModel.tsx'
import IPropsAboutEvent from '../../interfaces/props/AboutEvent'

const AboutEvent:FC < IPropsAboutEvent > = ({
  description, Hashtags, joinedPeople, interestedPeople, longitude,
  latitude, placeName,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [listPeople, setListPeople] = useState<any>([])
  const [modalTitle, setModalTitle] = useState<string>('')
  const handleOpen = ():void => setOpen(true)
  const handleClose = ():void => setOpen(false)

  return (
    <div className="about-event">
      <div className="description-container">
        <Typography
          component="span"
          variant="h3"
          sx={{ fontSize: '1.4rem', fontWeight: 600, padding: '1rem 0' }}
        >
          Description

        </Typography>
        <Typography component="span" variant="body1">
          {description}
        </Typography>
        <div className="hashtag-container">
          {
        Hashtags
        && Hashtags.map((ele: any) => (
          <Paper
            key={ele.id}
            elevation={0}
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
          <Typography
            component="span"
            variant="h3"
            sx={{ fontSize: '1.4rem', fontWeight: 600, padding: '1rem 0' }}
          >
            Participants

          </Typography>
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
              Interested
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
          <Map longitude={longitude} latitude={latitude} placeName={placeName} />
        </div>
      </div>
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
