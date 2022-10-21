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

const Profile:FC = () => {
  const [userData, setUserData] = useState<IUserProfile | null>(null)
  const [profileInfo, setProfileInfo] = useState({})
  const [allData, setAllData] = useState<IEventDetails[]>([])
  const [currentStatus, setCurrentStatus] = useState('all')
  const [startTime, setStartTime] = useState<Dayjs|null>(null)
  const [endTime, setEndTime] = useState<Dayjs|null>(null)
  const { id } = useParams()

  useEffect(() => {
    const getEvents = async ():Promise<void> => {
      try {
        const allEvents = await ApiService.get('/api/v1/events', {
          params: {
            status: currentStatus === 'all' ? '' : currentStatus,
            from: startTime,
            to: endTime,
            userId: id,
          },
        })
        setAllData(allEvents.data.data)
      } catch (err) {
        setAllData([])
      }
    }
    getEvents()
  }, [currentStatus, startTime, endTime, id])

  useEffect(() => {
    const getUserDate = async ():Promise<void> => {
      try {
        const userInfo = await ApiService.get(`/api/v1/users/${id}`)
        setUserData(userInfo.data.data)
      } catch (err:any) {
        setUserData(null)
      }
    }
    getUserDate()
  }, [id])

  const getUserData = (data:any):void => setProfileInfo(data)

  useEffect(() => {
    const putData = async ():Promise<void> => {
      try {
        const userInfo = await ApiService.put(`/api/v1/users/${id}`, { profileInfo })
        console.log(userInfo.data.data)

        setUserData(userInfo.data.data[0])
      } catch (err:any) {
        setUserData(null)
      }
    }
    putData()
  }, [profileInfo, id])

  return (
    <>
      <ProfileBio userData={userData} getUserData={getUserData} />
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

  )
}

export default Profile
