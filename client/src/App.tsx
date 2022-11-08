import React, { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  LandingPage,
  Login,
  SignUp,
  Home,
  Profile,
  SearchResult,
  EventDetails,
  Calender,
  Chat,
  ErrorPage,
} from './pages'
import { useAuth } from './hooks/useAuth'

const App: React.FC = () => {
  const auth = useAuth()
  const [isAdded, setIsAdded] = useState<boolean>(false)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/home',
      element: <Home isAdded={isAdded} setIsAdded={setIsAdded} />,
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
      element: <Profile isAdded={isAdded} setIsAdded={setIsAdded} />,
    },
    {
      path: 'search',
      element: <SearchResult />,
    },
    {
      path: 'events/:id',
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
    {
      path: '*',
      element: <ErrorPage />,
    },
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
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
