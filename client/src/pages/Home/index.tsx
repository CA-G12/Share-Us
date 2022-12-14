import './style.css'

import { FC, useEffect, useState } from 'react'
import { Dayjs } from 'dayjs'
import FilterCards from '../../components/FilterCard'
import ApiService from '../../services/ApiService'
import IEventDetails from '../../interfaces/IEventDetails'
import Navbar from '../../components/Navbar'
import EventCardContainer from '../../components/EventCard'
import AddEvent from '../../components/AddEvent'
import { IAddedEventProps } from '../../interfaces'

const Home:FC<IAddedEventProps> = ({ setIsAdded, isAdded }) => {
  const [data, setData] = useState<IEventDetails[]>([])
  const [currentStatus, setCurrentStatus] = useState('all')
  const [startTime, setStartTime] = useState<Dayjs|null>(null)
  const [endTime, setEndTime] = useState<Dayjs|null>(null)

  useEffect(() => {
    const getEvents = async ():Promise<void> => {
      const allEvents = await ApiService.get('/api/v1/events', {
        params: {
          status: currentStatus === 'all' ? '' : currentStatus,
          from: startTime,
          to: endTime,
        },
      })
      setData(allEvents.data.data)
    }
    getEvents()
  }, [currentStatus, startTime, endTime, isAdded])

  return (
    <>
      <Navbar />
      <FilterCards
        currentStatus={currentStatus}
        setCurrentStatus={setCurrentStatus}
        setStartTime={setStartTime}
        startTime={startTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />
      <AddEvent setIsAdded={setIsAdded} />
      <EventCardContainer allEvents={data} />
    </>

  )
}

export default Home
