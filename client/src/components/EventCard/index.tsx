import { Alert } from '@mui/material'
import { FC } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { IEventDetails } from '../../interfaces'
import { CardContainerProps } from '../../interfaces/props/EventCardProps'
import EventCard from './EventCard'
import './style.css'

const EventCardContainer:FC<CardContainerProps> = ({ allEvents, followerId }) => {
  const auth = useAuth()
  const isInFollowing = (id:number):boolean => auth.user?.following?.includes(id)
  const isMe = (id:number):boolean => auth.user?.id === id
  const isUserProfile = (id:number):boolean => id === followerId
  const filteredEvents = (events:IEventDetails[]):IEventDetails[] => events
    .filter((evt) => isInFollowing(evt?.User?.id)
    || isMe(evt?.User?.id)
    || isUserProfile(evt?.User?.id))

  return (
    <div className="card-container">
      {
        auth.user
        && (!filteredEvents(allEvents).length
          ? (<Alert severity="error" variant="filled">No Events Found</Alert>)
          : filteredEvents(allEvents)
            .map((evt:any) => <EventCard event={evt} key={evt.id} />))
      }
      {
        !auth.user
        && (!allEvents.length
          ? (<Alert severity="error" variant="filled">No Events Found</Alert>)
          : allEvents
            .map((evt:any) => <EventCard event={evt} key={evt.id} />))
      }
    </div>

  )
}

export default EventCardContainer
