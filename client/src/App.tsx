import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom'

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
      path: 'users/:followerId',
      element: <Profile />,
    },
    {
      path: 'search-result',
      element: <SearchResult />,
    },
    {
      path: 'event/:id',
      element: <EventDetails />,
    },
    {
      path: 'chat',
      element: <Chat />,
    },
    {
      path: 'calendar',
      element: <Calender />,
    },
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>

  )
}

export default App
