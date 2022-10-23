import './style.css'

import { FC, useEffect, useState } from 'react'
import { Dayjs } from 'dayjs'
import { useParams } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import ProfileBio from '../../components/Profile'
import ApiService from '../../services/ApiService'
import IUserProfile from '../../interfaces/IUserProfile'
import FilterCards from '../../components/FilterCard'
import IEventDetails from '../../interfaces/IEventDetails'
import EventCard from '../../components/EventCard'
import Navbar from '../../components/Navbar'
import { useAuth } from '../../hooks/useAuth'

const Profile:FC = () => {
  const auth = useAuth()
  const [userData, setUserData] = useState<IUserProfile | null>(null)
  const [allData, setAllData] = useState<IEventDetails[]>([])
  const [currentStatus, setCurrentStatus] = useState('all')
  const [startTime, setStartTime] = useState<Dayjs|null>(null)
  const [endTime, setEndTime] = useState<Dayjs|null>(null)
  const { followerId } = useParams()

  useEffect(
    () => {
      console.log(followerId)

      ApiService.get(`/users/${followerId}`)
        .then((res) => setUserData(res.data.data))
    },
    [followerId],
  )

  const getUserData = async (data:any):Promise<void> => {
    try {
      const userInfo = await ApiService.put(`/users/${followerId}`, { data })
      setUserData(userInfo.data.data[0])
    } catch (err:any) {
      setUserData(null)
    }
  }

  useEffect(() => {
    const getEvents = async ():Promise<void> => {
      try {
        const allEvents = await ApiService.get('/events', {
          params: {
            status: currentStatus === 'all' ? '' : currentStatus,
            from: startTime,
            to: endTime,
            userId: followerId,
          },
        })
        setAllData(allEvents.data.data)
      } catch (err) {
        setAllData([])
      }
    }
    getEvents()
  }, [currentStatus, startTime, endTime, followerId])

  return (
    <>
      <Navbar />
      <ProfileBio
        userData={userData}
        getUserData={getUserData}
        allData={allData}
        setUserData={setUserData}
      />
      {auth.user?.blocked?.includes(Number(followerId))
        ? (
          <Alert
            severity="error"
            variant="filled"
            sx={{ width: '40%', margin: ' 2rem auto' }}
          >
            User is blocked!
          </Alert>
        )
        : (
          <>
            <FilterCards
              currentStatus={currentStatus}
              setCurrentStatus={setCurrentStatus}
              setStartTime={setStartTime}
              startTime={startTime}
              endTime={endTime}
              setEndTime={setEndTime}
            />

            <EventCard event={allData} />
          </>
        )}

    </>

  )
}

export default Profile
