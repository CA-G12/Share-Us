import React, { useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom'
import ApiService from './services/ApiService'

import {
  Login, SignUp, Home, Profile, SearchResult, EventDetails, Calender, Chat,
} from './pages'
import { useAuth } from './hooks/useAuth'

const App : React.FC = () => {
  const auth = useAuth()
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'login',
      element: auth.user ? <Navigate to="/" replace /> : <Login />,

    },
    {
      path: 'sign-up',
      element: auth.user ? <Navigate to="/" replace /> : <SignUp />,
    },
    {
      path: 'profile',
      element: <Profile />,
    },
    {
      path: 'search',
      element: <SearchResult />,
    },
    {
      path: 'event-details',
      element: <EventDetails />,
    },
    {
      path: 'Chat',
      element: <Chat />,
    },
    {
      path: 'calender',
      element: <Calender />,
    },
    {
      path: 'search',
      element: <SearchResult />,
    },
  ])

  useEffect(() => {
    ApiService.init()
    ApiService.setHeader()
  }, [])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>

  )
}

export default App
