import './style.css'

import { FC } from 'react'
import { useAuth } from '../../helpers/useAuth'

const Home:FC = () => {
  const auth = useAuth()

  return (
    <div>
      Home page
      {auth.user?.username}
      {auth.user && <button type="button" onClick={auth.signOut}>logout</button>}
    </div>
  )
}

export default Home
