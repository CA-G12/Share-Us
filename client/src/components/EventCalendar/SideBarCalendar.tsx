import { FC, ReactElement } from 'react'
import { formatDate } from '@fullcalendar/react'
import ICalendarProp from '../../interfaces/props/ICalendarProp'

const SideBarCalendar: FC<ICalendarProp> = ({
  joinedEvents,
  interestedEvents,
}): ReactElement => (
  <>
    <div className="demo-app-sidebar-section">
      <h2>
        All Joined Events (
        {joinedEvents.length}
        )
      </h2>
      <ul>
        {joinedEvents.map((ele) => (
          <li
            key={ele.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '3px',
              listStyle: 'circle',
            }}
          >
            <b>
              {formatDate(ele.start, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </b>
            <b>{ele.title}</b>
            <span className={`event-status ${ele.status}`}>{ele.status}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="demo-app-sidebar-section">
      <h2>
        All Interested Events (
        {interestedEvents.length}
        )
      </h2>
      <ul>
        {interestedEvents.map((e) => (
          <li
            key={e.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '3px',
              listStyle: 'circle',
            }}
          >
            <b>
              {formatDate(e.start, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </b>
            <b>{e.title}</b>
            <span className={`event-status ${e.status}`}>{e.status}</span>
          </li>
        ))}
      </ul>
    </div>
  </>
)

export default SideBarCalendar
