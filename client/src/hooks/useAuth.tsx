import React, {
  createContext, useContext, useState, useEffect,
} from 'react'
import { IAuthContext, IUser, IAuthContextProps } from '../interfaces'
import ApiService from '../services/ApiService'
import JwtService from '../services/JwtService'

const initContext = {
  user: {
    id: 0,
    username: '',
    password: '',
    email: '',
    profileImg: '',
    headerImg: '',
    refreshToken: '',
  },
  setUser: () => {},
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
  googleAuthenticate: () => {},
}

export const AuthContext = createContext<IAuthContext>(initContext)

export const useProvideAuth = ():IAuthContext => {
  const [user, setUser] = useState<IUser | null>(null)
  const signIn = async (payload:object): Promise<object> => {
    try {
      const userInfo = await ApiService.post('/api/v1/login', payload)
      if (userInfo.status === 200) {
        setUser(userInfo.data.user)
        JwtService.setToken(userInfo.data.token)
        ApiService.setHeader()
      }
      return { isLogged: true }
    } catch (err:any) {
      setUser(null)
      return { isLogged: false, error: err }
    }
  }

  const googleAuthenticate = async (payload:object):Promise<object> => {
    try {
      const googleUser = await ApiService.post('/api/v1/googleRegister', payload)
      if (googleUser.status === 200) {
        setUser(googleUser.data.data)
        JwtService.setToken(googleUser.data.token)
        ApiService.setHeader()
      }
      return { isLogged: true }
    } catch (err) {
      setUser(null)
      return { isLogged: false, error: err }
    }
  }

  const signUp = async (payload:object):Promise<object> => {
    try {
      const userInfo = await ApiService.post('/api/v1/signup', payload)
      if (userInfo.status === 200) {
        setUser(userInfo.data.data)
        JwtService.setToken(userInfo.data.token)
        ApiService.setHeader()
      }
      return { isLogged: true }
    } catch (err) {
      setUser(null)
      return { isLogged: false, error: err }
    }
  }
  const signOut = ():void => {
    JwtService.destroyToken()
    ApiService.setHeader()
    setUser(null)
  }

  useEffect(() => {
    const getUser = async ():Promise<void> => {
      try {
        const userInfo = await ApiService.get('/api/v1/users/me')
        if (userInfo.status === 200) {
          setUser(userInfo.data.data)
        }
      } catch (err:any) {
        setUser(null)
      }
    }
    getUser()
  }, [])
  return {
    user, signIn, signUp, signOut, setUser, googleAuthenticate,
  }
}
export const AuthProvider = ({ children }: IAuthContextProps):React.ReactElement => {
  const auth = useProvideAuth()
  return (
    <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
  )
}
export const useAuth = ():any => useContext(AuthContext)
