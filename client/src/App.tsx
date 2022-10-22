/* eslint-disable max-len */
import React, { useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import BasicModal from './components/AddEvent'
import ApiService from './services/ApiService'
import 'react-toastify/dist/ReactToastify.css'

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
      <BasicModal />
      {/* <EventCard event={event} /> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>

  )
}

export default App
