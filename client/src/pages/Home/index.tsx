import './style.css'

import { FC, useEffect, useState } from 'react'
import { Dayjs } from 'dayjs'
import EventCard from '../../components/EventCard'
import FilterCards from '../../components/FilterCard'
import ApiService from '../../services/ApiService'
import IEventDetails from '../../interfaces/IEventDetails'
import { useAuth } from '../../hooks/useAuth'

const Home:FC = () => {
  const [data, setData] = useState<IEventDetails[]>([])
  const [currentStatus, setCurrentStatus] = useState('all')
  const [startTime, setStartTime] = useState<Dayjs|null>(null)
  const [endTime, setEndTime] = useState<Dayjs|null>(null)
  const auth = useAuth()

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
      {auth.user && (
      <p>
        {auth.user?.username}
        {' '}
        <button type="button" onClick={auth.signOut}>logout</button>
      </p>
      )}
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
