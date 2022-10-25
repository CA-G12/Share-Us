/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */

import './style.css'

import React, { FC, SyntheticEvent, useState } from 'react'
import {
  Button, Tabs, Tab, Box, Typography, Alert, AlertTitle, CircularProgress,
} from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import CommentsContainer from '../CommentsContainer'
import { IEventDetails } from '../../interfaces'
import ITabPanelProps from '../../interfaces/props/EventDetails'
import AboutEvent from '../AboutEvent'
import ApiService from '../../services/ApiService'
import Timer from '../Timer'

import calculateDuration from './calculateDuration'

const TabPanel = (props: ITabPanelProps):JSX.Element => {
  const {
    children, value, index, ...other
  } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number): object {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
const EventDetailsHeader:FC = ():JSX.Element => {
  // for mui taps
  const [value, setValue] = useState<number>(0)
  const handleChange = (event: SyntheticEvent, newValue: number):void => {
    setValue(newValue)
  }

  const initialDetails = {
    id: 0,
    User: {
      id: 0,
      username: '',
      profileImg: '',
    },
    status: undefined,
    UserId: 0,
    createdAt: '',
    endTime: '',
    startTime: '',
    updatedAt: '',
    description: '',
    name: '',
    img: '',
    latitude: '',
    longitude: '',
    Hashtags: [],
    InterestedPeople: [],
    JoinedPeople: [],
  }

  const [eventInfo, setEventInfo] = useState<IEventDetails>(initialDetails)
  const [error, setError] = useState<boolean | string>(false)
  const [loader, setLoader] = useState<boolean>(true)
  const [join, setJoin] = useState<boolean>(false)
  const [interestedList, setInterestedList] = useState<any>(0)
  const [joinedList, setJoinedList] = useState<any>(0)

  const [interest, setInterest] = useState<boolean>(false)
  const userId = 1

  // just for test, startTime: '2022-10-19T05:00:44.411Z', endTime: '2022-10-21T03:01:48.411Z'
  const resultDuration = calculateDuration(eventInfo.startTime, eventInfo.endTime)

  React.useEffect(() => {
    (async ():Promise<void> => {
      try {
        const eventDetails = await ApiService.get('/api/v1/events/1')
        const { data } = eventDetails.data
        setEventInfo(data)
        const checkInterest = (data.InterestedPeople.filter((ele:any) => ele.User.id === userId))
        if (checkInterest.length) setInterest(true); else setInterest(false)

        const checkJoin = (data.JoinedPeople.filter((ele:any) => ele.User.id === userId))
        if (checkJoin.length) setJoin(true)

        setLoader(false)
      } catch (err) {
        setError('We\'re having some errors in getting the information. We\'re working on it.')
        setLoader(false)
      }
    })()
  }, [])

  const handleJoin = async (UserId:number):Promise<void> => {
    try {
      const addJoin = await ApiService.post('/api/v1/events/1/joined', { UserId })
      if (addJoin.data.message === 'You are joined successfully') {
        setEventInfo({ ...eventInfo, JoinedPeople: [...eventInfo.JoinedPeople, addJoin.data.data] })
        setJoin(true)
      } else if (addJoin.data.message === 'You are not joined anymore') {
        setEventInfo({ ...eventInfo, JoinedPeople: eventInfo.JoinedPeople.filter((ele) => ele.UserId !== userId) })
        setJoin(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleInterest = async (UserId:number):Promise<void> => {
    try {
      const addInterest = await ApiService.post('/api/v1/events/1/interested', { UserId })
      if (addInterest.data.message === 'interested is expressed') {
        setEventInfo({
          ...eventInfo,
          InterestedPeople: [...eventInfo.InterestedPeople, addInterest.data.data],
        })
        setInterest(true)
      } else if (addInterest.data.message === 'You are not interested anymore') {
        setEventInfo({
          ...eventInfo,
          InterestedPeople: eventInfo.InterestedPeople.filter((ele) => ele.UserId !== userId),
        })
        setInterest(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  React.useEffect(() => {
    (async ():Promise<void> => {
      const result = await ApiService.get('/api/v1/events/1/Joined')
      setJoinedList(result.data.data)
    })()
  }, [eventInfo])

  React.useEffect(() => {
    (async ():Promise<void> => {
      const result = await ApiService.get('/api/v1/events/1/interested')
      setInterestedList(result.data.data)
    })()
  }, [eventInfo])

  // formatting start time
  const startTime = new Date(eventInfo.startTime)
  const dateFormat = `${startTime.getHours()}:${startTime.getMinutes()},${startTime.toDateString()}`

  if (loader) {
    return (
      <CircularProgress sx={{ margin: '200px auto', display: 'block' }} />
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ width: '80%', margin: '20px auto' }}>
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    )
  }

  return (
    <div className="event-details-header">
      <div className="image-container">
        <img className="event-cover-img" src={eventInfo.img} alt="headerImage" />
      </div>
      <div className="event-info-container">
        <p className="event-date">
          Date: {dateFormat}
        </p>
        <Timer startTime={eventInfo.startTime} />
        <p className="event-duration">
          Duration: {resultDuration.days !== 0 && (<>{resultDuration.days} days</>)}
          {resultDuration.hours !== 0 && (<>, {resultDuration.hours} hours</>) }
          {resultDuration.minutes !== 0 && (<>, {resultDuration.minutes} minutes</>)}
        </p>
        <p className="event-organizer">
          by: {eventInfo.User.username}
        </p>
        <p className="event-status">{eventInfo.status}</p>
        <h2 className="event-name">{eventInfo.name}</h2>
      </div>
      <div className="event-btns-container">
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="About" {...a11yProps(0)} />
          <Tab label="Comments" {...a11yProps(1)} />
        </Tabs>
        <div className="btn-container">
          <Button
            onClick={() => handleJoin(userId)}
            variant="contained"
            sx={join ? { backgroundColor: 'rgba(111, 255, 116, 1)' }
              : { backgroundColor: 'rgba(111, 255, 116, 0.370)' }}
          >
            <CheckCircleOutlinedIcon className="test" />
            Join
          </Button>

          <Button
            onClick={() => handleInterest(userId)}
            variant="contained"
            sx={interest ? { backgroundColor: 'rgba(111, 186, 255, 1)' }
              : { backgroundColor: 'rgba(111, 186, 255, 0.370)' }}
          >
            <StarBorderIcon className="star-icon" />
            Interest
          </Button>
        </div>
      </div>
      <TabPanel value={value} index={0}>
        <AboutEvent
          description={eventInfo.description}
          Hashtags={eventInfo.Hashtags}
          joinedPeople={joinedList}
          interestedPeople={interestedList}
          longitude={eventInfo.longitude}
          latitude={eventInfo.latitude}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CommentsContainer />
      </TabPanel>
    </div>
  )
}

export default EventDetailsHeader
