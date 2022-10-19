import React, {
  createContext, useContext, useState, useEffect,
} from 'react'
import ApiService from '../services/ApiService'
import JwtService from '../services/JwtService'

interface IUser {
  username: string,
  password: string
}
interface IAuthContext {
  user:object
  signIn: Function
  signUp: Function
  signOut: Function
}

 interface IAuthContextProps {
  children: React.ReactNode,
}
const initContext = {
  user: {
    username: 'saif',
    password: '',
  },
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
}
// const initUser = {
//   username: 'saif',
//   password: '',
// }

export const AuthContext = createContext<IAuthContext>(initContext)

export const useProvideAuth = ():any => {
  const [user, setUser] = useState<IUser | null>(null)
  const signIn = async (payload:any): Promise<any> => {
    try {
      const userInfo = await ApiService.post('/api/v1/login', payload)
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
  const signUp = async (payload:any):Promise<any> => {
    try {
      const userInfo = await ApiService.post('/api/v1/signup', payload)
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
  const signOut = ():any => {
    JwtService.destroyToken()
    setUser(null)
  }

  useEffect(() => {
    const getUser = async ():Promise<void> => {
      try {
        const userInfo = await ApiService.get('/api/v1/verify')
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
export const AuthProvider = ({ children }: IAuthContextProps):any => {
  const auth = useProvideAuth()
  return (
    <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
  )
}
export const useAuth = ():any => useContext(AuthContext)
