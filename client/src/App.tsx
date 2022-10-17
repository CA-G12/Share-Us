/* eslint-disable max-len */
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import BasicModal from './components/AddEvent'
import EventCard from './components/EventCard'
import ApiService from './services/ApiService'
import { IEvent } from './interfaces'
import 'react-toastify/dist/ReactToastify.css'

const App : React.FC = () => {
  // const router = createBrowserRouter([
  //   {
  //     path: '/',
  //     element: <Home />,
  //   },
  //   {
  //     path: 'login',
  //     element: <Login />,
  //   },
  //   {
  //     path: 'sign-up',
  //     element: <SignUp />,
  //   },
  //   {
  //     path: 'profile',
  //     element: <Profile />,
  //   },
  //   {
  //     path: 'search-result',
  //     element: <SearchResult />,
  //   },
  //   {
  //     path: 'event-details',
  //     element: <EventDetails />,
  //   },
  //   {
  //     path: 'Chat',
  //     element: <Chat />,
  //   },
  //   {
  //     path: 'calender',
  //     element: <Calender />,
  //   },
  // ])
  const event: IEvent = {
    name: 'saif',
    description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem',
    img: 'https://cdn.discordapp.com/attachments/956865613425410078/1029018892019974265/pexels-kseniya-budko-9485465_1.png',
    status: 'closed',
    startTime: '12/10/2022',
    profileImage: 'https://cdn.discordapp.com/attachments/956865613425410078/1029018892019974265/pexels-kseniya-budko-9485465_1.png',
    username: 'saif',
  }

  useEffect(() => {
    ApiService.init()
    ApiService.setHeader()
  })

  return (
    <div className="App">
      <BasicModal />
      <EventCard event={event} />
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
