/* eslint-disable max-len */
import React, { useEffect } from 'react'
import EventCard from './components/EventCard'
import ApiService from './helpers/ApiService'
import { IEvent } from './interfaces'

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
  })

  return (
    <div className="App">
      <EventCard event={event} />
    </div>

  )
}

export default App
