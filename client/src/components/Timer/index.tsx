import './style.css'
import { FC } from 'react'
import { useTimer } from '../../hooks/useTimer'

interface ITimerProps {
  startTime:string
}

const Timer:FC<ITimerProps> = ({ startTime }) => {
  const future = new Date(startTime)
  const time = useTimer(future)

  return (
    <div className="timer" style={{ color: '#2A2A2A', fontWeight: '600' }}>
      Time left:
      <div>
        <p>
          {time.days}
          d
        </p>
        <p>
          {time.hours}
          h
        </p>
        <p>
          {time.minutes}
          m
        </p>
        <p>
          {time.seconds}
          s
        </p>
      </div>
    </div>
  )
}
export default Timer
