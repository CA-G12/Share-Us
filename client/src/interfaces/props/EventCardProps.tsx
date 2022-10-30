import { IEventDetails } from '..'

export interface CardContainerProps {
  allEvents: IEventDetails[],
  followerId?:number
}

export interface EventCardProps {
  event: IEventDetails
}
