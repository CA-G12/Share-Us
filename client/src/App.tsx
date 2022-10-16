import React, { useEffect } from 'react'
import EventCard from './components/EventCard'
import BasicModal from './components/AddEvent'
import ApiService from './helpers/ApiService'
import { IEvent } from './interfaces'

const App : React.FC = () => {
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
    </div>

  )
}

export default App
