import './style.css'

import { FC, useEffect, useState } from 'react'
import { Dayjs } from 'dayjs'
import { useParams } from 'react-router-dom'
import ProfileBio from '../../components/Profile'
import ApiService from '../../services/ApiService'
import IUserProfile from '../../interfaces/IUserProfile'
import FilterCards from '../../components/FilterCard'
import IEventDetails from '../../interfaces/IEventDetails'
import EventCard from '../../components/EventCard'
import Navbar from '../../components/Navbar'

const Profile:FC = () => {
  const [userData, setUserData] = useState<IUserProfile | null>(null)
  const [allData, setAllData] = useState<IEventDetails[]>([])
  const [currentStatus, setCurrentStatus] = useState('all')
  const [startTime, setStartTime] = useState<Dayjs|null>(null)
  const [endTime, setEndTime] = useState<Dayjs|null>(null)
  const { followerId } = useParams()

  useEffect(
    () => {
      ApiService.get('/api/v1/users/1')
        .then((res) => setUserData(res.data.data))
    },
    [],
  )

  const getUserData = async (data:any):Promise<void> => {
    try {
      const userInfo = await ApiService.put('/api/v1/users/1', { data })
      setUserData(userInfo.data.data[0])
    } catch (err:any) {
      setUserData(null)
    }
  }

  useEffect(() => {
    const getEvents = async ():Promise<void> => {
      try {
        const allEvents = await ApiService.get('/api/v1/events', {
          params: {
            status: currentStatus === 'all' ? '' : currentStatus,
            from: startTime,
            to: endTime,
            userId: 1,
          },
        })
        setAllData(allEvents.data.data)
      } catch (err) {
        setAllData([])
      }
    }
    getEvents()
  }, [currentStatus, startTime, endTime])

  return (
    <>
      <Navbar />
      <ProfileBio
        userData={userData}
        getUserData={getUserData}
        allData={allData}
        setUserData={setUserData}
      />
      {userData?.blocked?.includes(Number(followerId))
        ? <p>User is blocked</p>
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
