import './style.css'

import { FC, useEffect, useState } from 'react'
import EventCard from '../../components/EventCard'
import FilterCards from '../../components/FilterCard'
import ApiService from '../../services/ApiService'
import IEventDetails from '../../interfaces/IEventDetails'

const Home:FC = () => {
  const [data, setData] = useState<IEventDetails[]>([])

  useEffect(() => {
    ApiService.get('/api/v1/events').then((res) => setData(res.data.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <FilterCards setData={setData} />
      <EventCard event={data} />
    </>

  )
}

export default Home
