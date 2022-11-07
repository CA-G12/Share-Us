import { FC, useEffect, useState } from 'react'
import { Dayjs } from 'dayjs'
import { useParams } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import ProfileBio from '../../components/UserProfile'
import ApiService from '../../services/ApiService'
import IUserProfile from '../../interfaces/IUserProfile'
import FilterCards from '../../components/FilterCard'
import IEventDetails from '../../interfaces/IEventDetails'
import EventCardContainer from '../../components/EventCard'
import Navbar from '../../components/Navbar'
import { useAuth } from '../../hooks/useAuth'
import './style.css'
import AddEvent from '../../components/AddEvent'
import { IAddedEventProps } from '../../interfaces'

const Profile:FC<IAddedEventProps> = ({ setIsAdded }) => {
  const auth = useAuth()
  const [userData, setUserData] = useState<IUserProfile | null>(null)
  const [allData, setAllData] = useState<IEventDetails[]>([])
  const [currentStatus, setCurrentStatus] = useState('all')
  const [startTime, setStartTime] = useState<Dayjs|null>(null)
  const [endTime, setEndTime] = useState<Dayjs|null>(null)
  const { followerId } = useParams()
  const isBlocked = auth.user?.blocked?.includes(Number(followerId))
  const isUser = auth.user?.id === Number(followerId)

  useEffect(() => {
    const userInfo = async ():Promise<void> => {
      const user = await ApiService.get(`/api/v1/users/${followerId}`)
      setUserData(user.data.data)
    }
    userInfo()
  }, [followerId])

  const editUserData = async (data:any):Promise<void> => {
    const userInfo = await ApiService.put(`/api/v1/users/${followerId}`, { data })
    setUserData(userInfo.data.data[0])
    auth.setUser(userInfo.data.data[0])
  }

  useEffect(() => {
    const getEvents = async ():Promise<void> => {
      const allEvents = await ApiService.get('/api/v1/events', {
        params: {
          status: currentStatus === 'all' ? '' : currentStatus,
          from: startTime,
          to: endTime,
          userId: followerId,
        },
      })
      setAllData(allEvents.data.data)
    }
    getEvents()
  }, [currentStatus, startTime, endTime, followerId])

  return (
    userData
    && (
    <>
      <Navbar />
      <ProfileBio
        userData={userData}
        editUserData={editUserData}
        allData={allData}
        setUserData={setUserData}

      />
      {isBlocked && (
      <Alert
        severity="error"
        variant="outlined"
        sx={{ width: '40%', margin: ' 2rem auto', color: 'white' }}
      >
        User is blocked!
      </Alert>
      )}
      {!isBlocked && (
      <>
        <FilterCards
          currentStatus={currentStatus}
          setCurrentStatus={setCurrentStatus}
          setStartTime={setStartTime}
          startTime={startTime}
          endTime={endTime}
          setEndTime={setEndTime}
        />
        {
          isUser && <AddEvent setIsAdded={setIsAdded} />
        }
        <EventCardContainer allEvents={allData} followerId={Number(followerId)} />
      </>
      )}

    </>
    )

  )
}

export default Profile
