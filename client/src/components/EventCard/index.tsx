import { Grid } from '@mui/material'
import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../../hooks/useAuth'
import { IEventDetails } from '../../interfaces'
import { CardContainerProps } from '../../interfaces/props/EventCardProps'
import NoData from '../NoData'
import EventCard from './EventCard'
import './style.css'
import ApiService from '../../services/ApiService'

const EventCardContainer:FC<CardContainerProps> = ({ allEvents, followerId }) => {
  const auth = useAuth()
  const isInFollowing = (id:number):boolean => auth.user?.following?.includes(id)
  const isMe = (id:number):boolean => auth.user?.id === id
  const isUserProfile = (id:number):boolean => id === followerId
  const filteredEvents = (events:IEventDetails[]):IEventDetails[] => events
    .filter((evt) => isInFollowing(evt?.User?.id)
    || isMe(evt?.User?.id)
    || isUserProfile(evt?.User?.id))

  const [deletedId, setDeletedId] = useState<number | null>()
  const handleDelete = async (id:number):Promise<void> => {
    const deletedEvent = await ApiService.delete(`/api/v1/events/${id}`)
    if (deletedEvent.data.status === 'deleted') {
      setDeletedId(id)
      toast(deletedEvent.data.message)
    }
  }

  return (
    <div className="card-container" key={Math.random() * 99999}>
      <Grid container spacing={2}>
        {
        auth.user
        && (!filteredEvents(allEvents).length
          ? (
            <Grid item xs={12}>
              <NoData />
            </Grid>
          )
          : filteredEvents(allEvents).filter((evt:any) => evt.id !== deletedId)
            .map((evt:any) => (
              <Grid item xs={3} key={evt.id}>
                <EventCard event={evt} handleDelete={handleDelete} />
              </Grid>
            )))
      }
        {
        !auth.user
        && (!allEvents.length
          ? (
            <NoData error="No events found" />
          )
          : allEvents.filter((evt:any) => evt.id !== deletedId)
            .map((evt:any) => (
              <Grid item xs={3}>
                <EventCard event={evt} key={evt.id} handleDelete={handleDelete} />
              </Grid>
            )))
      }
      </Grid>
    </div>

  )
}

export default EventCardContainer
