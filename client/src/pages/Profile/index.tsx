import './style.css'

import { FC, useEffect, useState } from 'react'
import ProfileBio from '../../components/Profile'
import ApiService from '../../services/ApiService'
import IUserProfile from '../../interfaces/IUserProfile'

const Profile:FC = () => {
  const [userData, setUserData] = useState<IUserProfile | null>(null)
  const [profile, setProfile] = useState({})
  useEffect(() => {
    ApiService.get('/api/v1/users/2').then(({ data }) => setUserData(data.data))
  }, [])

  const getUserData = (data:any):void => setProfile(data)

  const userId = 2
  useEffect(() => {
    const putData = async ():Promise<void> => {
      const userInfo = await ApiService.put(`/api/v1/users/${userId}`, { profile })

      setUserData(userInfo.data.data[0])
    }
    putData()
  }, [profile])

  return (
    <ProfileBio userData={userData} getUserData={getUserData} />
  )
}

export default Profile
