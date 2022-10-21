import React, { useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import ApiService from './services/ApiService'

import {
  Login, SignUp, Home, Profile, SearchResult, EventDetails, Calender, Chat,
} from './pages'

const App : React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'sign-up',
      element: <SignUp />,
    },
    {
      path: 'users/:id',
      element: <Profile />,
    },
    {
      path: 'search-result',
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
