import './style.css'

import { FC, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import EventCard from '../../components/EventCard'
import FilterCards from '../../components/FilterCard'
import ApiService from '../../services/ApiService'
import IEventDetails from '../../interfaces/IEventDetails'

const Home:FC = () => {
  const [data, setData] = useState<IEventDetails[]>([])
  const [currentStatus, setCurrentStatus] = useState('all')
  const [startTime, setStartTime] = useState(dayjs('2022-01-10T21:11:54'))
  const [endTime, setEndTime] = useState(dayjs('2022-01-20T21:11:54'))

  useEffect(() => {
    ApiService.get('/api/v1/events', {
      params: {
        status: currentStatus === 'all' ? '' : currentStatus,
        from: startTime,
        to: endTime,
      },
    }).then((res) => setData(res.data.data))
      .catch((err) => console.log(err))
  }, [currentStatus, startTime, endTime])

  return (
    <>
      <FilterCards
        currentStatus={currentStatus}
        setCurrentStatus={setCurrentStatus}
        setStartTime={setStartTime}
        startTime={startTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />
      <EventCard event={data} />
    </>

  )
}

export default Home
