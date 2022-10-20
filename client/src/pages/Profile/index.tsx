import './style.css'

import { FC, useEffect, useState } from 'react'
import ProfileBio from '../../components/Profile'
import ApiService from '../../services/ApiService'
import IUserProfile from '../../interfaces/IUserProfile'

const Profile:FC = () => {
  const [userData, setUserData] = useState<IUserProfile | null>(null)
  useEffect(() => {
    ApiService.get('api/v1/users/2').then(({ data }) => setUserData(data.data))
  }, [])
  return (
    <ProfileBio userData={userData} />

  )
}

export default Profile
