import { FC } from 'react'
import { initializeApp } from 'firebase/app'
import {
  getAuth, signInWithPopup, GoogleAuthProvider,
} from 'firebase/auth'
import { Button } from '@mui/material'

import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as GoogleLogo } from
  '../../assets/icons/logo-google.svg'
import { useAuth } from '../../hooks/useAuth'

interface prop{
  label: string
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEAUREMENT_ID,
}
const app = initializeApp(firebaseConfig)
const googleAuth = getAuth(app)

const GoogleAuth: FC<prop> = ({ label }) => {
  const navigate = useNavigate()
  const auth = useAuth()

  const signInGoogle = async ():Promise<void> => {
    try {
      const result:any = await signInWithPopup(googleAuth, new GoogleAuthProvider())
      const {
        displayName, email, uid, photoURL,
      } = result.user

      // eslint-disable-next-line no-underscore-dangle
      const { oauthExpireIn, refreshToken, oauthAccessToken } = result._tokenResponse

      if (email && displayName && uid) {
        await auth.googleAuthenticate({
          email,
          password: uid,
          username: displayName,
          refreshToken,
          oauthAccessToken,
          oauthExpireIn,
          profileImg: photoURL,
        })
        navigate('/home')
      }
    } catch (error) {
      toast.error('Failed to sign in with Google')
    }
  }
  return (
    <Button
      onClick={signInGoogle}
      className="google-btn"
      variant="outlined"
      fullWidth
    >
      <GoogleLogo width={20} />
      <p>
        {label}
        {' '}
        with Google
      </p>
    </Button>
  )
}
export default GoogleAuth
