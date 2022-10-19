import { Dayjs } from 'dayjs'

export default interface EventFilterProp {
  setCurrentStatus: Function
  setStartTime: Function
  setEndTime: Function
  startTime: Dayjs | null
  endTime: Dayjs |null
  currentStatus: string
}
