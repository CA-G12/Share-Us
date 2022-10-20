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
  },
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
}

export const AuthContext = createContext<IAuthContext>(initContext)

export const useProvideAuth = ():IAuthContext => {
  const [user, setUser] = useState<IUser | null>(null)
  const signIn = async (payload:object): Promise<object> => {
    try {
      const userInfo = await ApiService.post('/users/login', payload)
      if (userInfo.status === 200) {
        setUser(userInfo.data.user)
        JwtService.setToken(userInfo.data.token)
      }
      return { isLogged: true }
    } catch (err:any) {
      setUser(null)
      return { isLogged: false, error: err }
    }
  }
  const signUp = async (payload:object):Promise<object> => {
    try {
      const userInfo = await ApiService.post('/users/signup', payload)
      if (userInfo.status === 200) {
        setUser(userInfo.data.data)
        JwtService.setToken(userInfo.data.token)
      }
      return { isLogged: true }
    } catch (err) {
      setUser(null)
      return { isLogged: false, error: err }
    }
  }
  const signOut = ():void => {
    JwtService.destroyToken()
    setUser(null)
  }

  useEffect(() => {
    const getUser = async ():Promise<void> => {
      try {
        const userInfo = await ApiService.get('/users/me')
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
    user, signIn, signUp, signOut,
  }
}
export const AuthProvider = ({ children }: IAuthContextProps):React.ReactElement => {
  const auth = useProvideAuth()
  return (
    <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
  )
}
export const useAuth = ():any => useContext(AuthContext)
