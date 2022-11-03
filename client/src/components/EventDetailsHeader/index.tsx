/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-one-expression-per-line */

import './style.css'

import React, { FC, SyntheticEvent, useState } from 'react'
import {
  Button, Tabs, Tab, Box, Typography, Alert, AlertTitle, CircularProgress,
} from '@mui/material'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import CommentsContainer from '../CommentsContainer'
import { IEventDetails } from '../../interfaces'
import ITabPanelProps from '../../interfaces/props/EventDetails'
import AboutEvent from '../AboutEvent'
import ApiService from '../../services/ApiService'
import Timer from '../Timer'
import calculateDuration from '../../helpers/calculateDuration'
import { useAuth } from '../../hooks/useAuth'
import 'react-toastify/dist/ReactToastify.css'

const TabPanel = (props: ITabPanelProps):any => {
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
const EventDetailsHeader:FC = () => {
  // for mui taps
  const [countForTap, setCountForTap] = useState<number>(0)
  const handleChange = (event: SyntheticEvent, newValue: number):void => {
    setCountForTap(newValue)
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

  const useAuthorization = useAuth()
  const userId = useAuthorization.user?.id
  const idParams = useParams().id
  const navigate = useNavigate()

  const resultDuration = calculateDuration(eventInfo.startTime, eventInfo.endTime)

  React.useEffect(() => {
    (async ():Promise<void> => {
      try {
        const eventDetails = await ApiService.get(`/api/v1/events/${idParams}`)
        const { data } = eventDetails.data
        setEventInfo(data)
        setLoader(false)

        const checkInterest = (data.InterestedPeople.find((ele:any) => ele.User?.id === userId))
        if (checkInterest) setInterest(true); else setInterest(false)
        const checkJoin = (data.JoinedPeople.find((ele:any) => ele.User?.id === userId))
        if (checkJoin) setJoin(true); else setJoin(false)
      } catch (err:any) {
        setError(err.message)
        setLoader(false)
      }
    })()
  }, [userId])

  const handleJoin = async (UserId:number):Promise<void> => {
    try {
      if (userId) {
        const addJoin = await ApiService.post(`/api/v1/events/${idParams}/joined`, { UserId })
        if (addJoin.data.status === 'joined') {
          setEventInfo({
            ...eventInfo,
            JoinedPeople: [...eventInfo.JoinedPeople, addJoin.data.data],
          })
          setJoin(true)
          toast(addJoin.data.message)
        } else if (addJoin.data.status === 'canceled') {
          setEventInfo({
            ...eventInfo,
            JoinedPeople: eventInfo.JoinedPeople.filter((ele) => ele.UserId !== userId),
          })
          setJoin(false)
          toast(addJoin.data.message)
        }
      } else {
        navigate('/login')
      }
    } catch (err:any) {
      toast(err.response.data.message)
    }
  }

  const handleInterest = async (UserId:number):Promise<void> => {
    try {
      if (userId) {
        const addInterest = await
        ApiService.post(`/api/v1/events/${idParams}/interested`, { UserId })
        if (addInterest.data.status === 'interested') {
          setEventInfo({
            ...eventInfo,
            InterestedPeople: [...eventInfo.InterestedPeople, addInterest.data.data],
          })
          setInterest(true)
          toast(addInterest.data.message)
        } else if (addInterest.data.status === 'canceled') {
          setEventInfo({
            ...eventInfo,
            InterestedPeople: eventInfo.InterestedPeople.filter((ele) => ele.UserId !== userId),
          })
          setInterest(false)
          toast(addInterest.data.message)
        }
      } else {
        navigate('/login')
      }
    } catch (err:any) {
      toast(err.response.data.message)
    }
  }

  React.useEffect(() => {
    (async ():Promise<void> => {
      const result = await ApiService.get(`/api/v1/events/${idParams}/Joined`)
      setJoinedList(result.data.data)
    })()
  }, [eventInfo.JoinedPeople])

  React.useEffect(() => {
    (async ():Promise<void> => {
      const result = await ApiService.get(`/api/v1/events/${idParams}/interested`)
      setInterestedList(result.data.data)
    })()
  }, [eventInfo.InterestedPeople])

  const dateFormat = dayjs(new Date(eventInfo.startTime)).format('dddd, MMMM D YYYY')

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
        <Tabs value={countForTap} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="About" {...a11yProps(0)} />
          <Tab label="Comments" {...a11yProps(1)} />
        </Tabs>
        <div className="btn-container">

          <Button
            startIcon={join ? <CancelOutlinedIcon /> : <CheckCircleOutlinedIcon />}
            onClick={() => handleJoin(userId)}
            variant="contained"
            className="join-interest-btn"
            sx={join ? { backgroundColor: '#EEEEEE' }
              : { backgroundColor: 'rgba(111, 255, 116, 0.370)' }}
          >
            {join ? <>cancel</> : <>Join</>}
          </Button>

          <Button
            startIcon={interest ? <CancelOutlinedIcon /> : <StarOutlineIcon />}
            onClick={() => handleInterest(userId)}
            variant="contained"
            className="join-interest-btn"
            sx={interest ? { backgroundColor: '#EEEEEE' }
              : { backgroundColor: 'rgba(111, 186, 255, 0.370)' }}
          >
            {interest ? <>not interested</> : <>interest</>}
          </Button>

        </div>
      </div>
      <TabPanel value={countForTap} index={0}>
        <AboutEvent
          description={eventInfo.description}
          Hashtags={eventInfo.Hashtags}
          joinedPeople={joinedList}
          interestedPeople={interestedList}
          longitude={eventInfo.longitude}
          latitude={eventInfo.latitude}
        />
      </TabPanel>
      <TabPanel value={countForTap} index={1}>
        <CommentsContainer />
      </TabPanel>
    </div>
  )
}

export default EventDetailsHeader
