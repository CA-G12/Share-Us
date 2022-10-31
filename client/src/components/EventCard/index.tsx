import { Alert, Grid } from '@mui/material'
import { FC } from 'react'
import { CardContainerProps } from '../../interfaces/props/EventCardProps'
import EventCard from './EventCard'
import './style.css'

const EventCardContainer:FC<CardContainerProps> = ({ allEvents }) => (
  <div className="card-container">
    { !allEvents.length ? (<Alert severity="error" variant="filled">No Events Found</Alert>
    )
      : allEvents.map((evt) => <EventCard event={evt} key={evt.id} />)}
  </div>

)

export default EventCardContainer
