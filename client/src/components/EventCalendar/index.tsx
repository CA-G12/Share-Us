import { FC, useState, useEffect } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
// import { Box } from '@mui/material'
import './style.css'
import ApiService from '../../services/ApiService'

let eventGuid = 0
const todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

// eslint-disable-next-line no-plusplus
export const createEventId = ():string => String(eventGuid++)

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: `${todayStr}T12:00:00`,
  },
  {
    id: createEventId(),
    title: 'swimming',
    start: '2022-10-24',
  },
]

const EventCalendar:FC = () => {
  const [currentEvents, setCurrentEvents] = useState([])
  const [initialEvents, setInitialEvents] = useState([])

  const handleDateSelect = (selectInfo:any):void => {
    const title = window.prompt('Please enter a new title for your event')
    const calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      })
    }
  }

  const handleEventClick = (clickInfo:any):void => {
    if (window.confirm(`Are you sure you want to delete 
    the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  const handleEvents = (events:any):void => {
    setCurrentEvents(events)
  }

  const renderEventContent = (eventInfo:any):any => (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )

  const renderSidebarEvent = (event:any):any => (
    <li key={event.id}>
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
  )
  useEffect(() => {
    const allJoined = async ():Promise<void> => {
      try {
        const calendar = await ApiService.get('/events/joined')
        const init = calendar.data.data.map((ele:any) => ({
          id: ele.id,
          title: ele.Event.name,
          start: ele.Event.startTime,
        }))
        setInitialEvents(init)
      } catch (err) {
        setInitialEvents([])
      }
    }
    allJoined()
  }, [])
  console.log(currentEvents)

  return (
    <div className="demo-app">
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <h2>
            All Events (
            {currentEvents.length}
            )
          </h2>
          <ul>
            {currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
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
          editable
          selectable
          selectMirror
          dayMaxEvents
          initialEvents={initialEvents}
            // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents}
        />
      </div>
    </div>

  )
}

export default EventCalendar
