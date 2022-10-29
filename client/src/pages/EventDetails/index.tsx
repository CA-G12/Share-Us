import './style.css'
import { FC } from 'react'
import EventDetailsHeader from '../../components/EventDetailsHeader'
import Navbar from '../../components/Navbar/index'

const EventDetails:FC = () => (
  <>
    <Navbar />
    <div className="event-details-page">
      <EventDetailsHeader />
    </div>
  </>

)

export default EventDetails
