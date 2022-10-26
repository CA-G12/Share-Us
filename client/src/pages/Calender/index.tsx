import './style.css'

import { FC } from 'react'

import Navbar from '../../components/Navbar/Navbar'
import EventCalendar from '../../components/EventCalendar'

const Calender:FC = () => (
  <>
    <Navbar />
    <EventCalendar />
  </>
)

export default Calender
