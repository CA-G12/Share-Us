/* eslint-disable react/jsx-one-expression-per-line */
import './style.css'
import { useState, FC, useEffect } from 'react'

function time(this: any, end : string):any {
  const timeDuration = Date.parse(end) - Date.now()
  this.calculateDays = ():number => (Math.floor(timeDuration / (1000 * 60 * 60 * 24)))
  this.calculateHours = ():number => (Math.floor((timeDuration / (1000 * 60 * 60)) % 24))
  this.calculateMin = ():number => (Math.floor((timeDuration / 1000 / 60) % 60))
  this.calculateSeconds = ():number => (Math.floor((timeDuration / 1000) % 60))
}
interface ITimerProps {
  startTime:string
}

const Timer:FC<ITimerProps> = ({ startTime }) => {
  // const deadline = 'December, 31, 2022'
  const initialTime = new (time as any)(startTime)

  const [days, setDays] = useState(() => initialTime.calculateDays())
  const [hours, setHours] = useState(() => initialTime.calculateHours())
  const [minutes, setMinutes] = useState(() => initialTime.calculateMin())
  const [seconds, setSeconds] = useState(() => initialTime.calculateSeconds())

  const getTime = (endTime:string):void => {
    const updateTime = new (time as any)(startTime)

    setDays(() => updateTime.calculateDays(endTime))
    setHours(() => updateTime.calculateHours(endTime))
    setMinutes(() => updateTime.calculateMin(endTime))
    setSeconds(() => updateTime.calculateSeconds(endTime))
  }

  useEffect(() => {
    const interval = setInterval(() => getTime(startTime), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="timer" style={{ color: '#2A2A2A', fontWeight: '600' }}>
      Time left:
      <div>
        <p>{days}d</p> <p>{hours}h </p><p>{minutes}m </p><p>{seconds}s</p>
      </div>
    </div>
  )
}

export default Timer
