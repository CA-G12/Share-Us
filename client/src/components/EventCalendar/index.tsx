import {
  FC, useState, useEffect, ReactElement,
} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import './style.css'
import { useNavigate } from 'react-router-dom'
import ApiService from '../../services/ApiService'
import SideBarCalendar from './SideBarCalendar'

const EventCalendar:FC = () => {
  const [joinedEvents, setJoinedEvents] = useState([])
  const [interestedEvents, setInterestedEvents] = useState([])
  const navigate = useNavigate()

  const handleEventClick = (clickInfo:any):any => {
    const eventId = clickInfo?.event?.extendedProps.eventId
    if (window.confirm(`Are you sure you want to go to the event '${clickInfo.event.title}'`)) {
      navigate(`/event/${eventId}`)
    }
  }
  const renderEventContent = (eventInfo:any):ReactElement => {
    const status = eventInfo?.event.extendedProps.status
    const type = eventInfo?.event.extendedProps.type
    return (
      <div style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: 'auto',
      }}
      >
        <h3 style={{ textTransform: 'capitalize', fontSize: '0.8rem' }}>{type}</h3>
        <p className="calendar-event-info">{eventInfo.timeText}</p>
        <p
          className="calendar-event-info"
          style={{ fontSize: '1rem', fontWeight: 500 }}
        >
          {eventInfo.event.title}

        </p>
        <p className={`event-status ${status}`}>{status}</p>
      </div>
    )
  }

  useEffect(() => {
    const allJoined = async ():Promise<void> => {
      const joined = await ApiService.get('/events/joined')
      const init = joined.data.data.map((ele:any) => ({
        id: ele.id,
        title: ele.Event.name,
        start: ele.Event.startTime,
        status: ele.Event.status,
        eventId: ele.EventId,
        type: 'joined',
      }))
      setJoinedEvents(init)
    }
    allJoined()

    const allInterested = async ():Promise<void> => {
      const interested = await ApiService.get('/events/interested')
      const init = interested.data.data.map((ele:any) => ({
        id: ele.id,
        title: ele.Event.name,
        start: ele.Event.startTime,
        status: ele.Event.status,
        eventId: ele.EventId,
        type: 'interested',
      }))
      setInterestedEvents(init)
    }
    allInterested()
  }, [])

  return (
    <div className="demo-app">
      <div className="demo-app-sidebar">
        <SideBarCalendar joinedEvents={joinedEvents} interestedEvents={interestedEvents} />
      </div>
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          selectable
          selectMirror
          dayMaxEvents
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          events={joinedEvents.concat(interestedEvents)}
        />
      </div>
    </div>

  )
}

export default EventCalendar
