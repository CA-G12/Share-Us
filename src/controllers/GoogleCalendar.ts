import { Response } from 'express'
import { google } from 'googleapis'
import { User } from '../db'
// import validateParams from '../validation/paramsId'
import { IUserRequest } from '../interfaces/IUserRequest'
import config from '../config/environment'
const Credentials = async (req:IUserRequest, res:Response):Promise<void> => {
  const oauth2Client = new google.auth.OAuth2(
    config.GOOGLE_CALENDAR_CLIENT_ID,
    config.GOOGLE_CALENDAR_CLIENT_SECRET
  )
  const user = req.user
  const { id } = req.params
  console.log(id)
  // await validateParams({ id })

  const accessToken = await User.findOne({
    where: {
      id: user?.id
    },
    attributes: ['oauthAccessToken', 'refreshToken', 'oauthExpireIn']
  })

  oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/calendar',
    include_granted_scopes: true
  })
  oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      console.log(tokens.refresh_token)
    }
    console.log(tokens.access_token)
  })

  // access_token , refresh_token , expiry_date
  oauth2Client.setCredentials({
    access_token: accessToken?.oauthAccessToken,
    refresh_token: accessToken?.refreshToken
    // expiry_date: accessToken?.oauthExpireIn
  })
  const calendar = google.calendar({ version: 'v3' })

  calendar.events.insert({
    auth: oauth2Client,
    calendarId: 'primary',
    requestBody: {
      summary: req.body.summary,
      description: req.body.description,
      start: {
        dateTime: req.body.startTime,
        timeZone: 'Asia/Jerusalem'
      },
      end: {
        dateTime: req.body.endTime,
        timeZone: 'Asia/Jerusalem'
      }
    }
  }, function (err:any, event:any) {
    if (err) {
      console.error('Something went wrong' + err)
      res.json({ msg: err })
    } else {
      console.log('Event Added')
      res.json({ msg: 'add successflly!' })
    }
  })
}
// export const GetEventId = async (req:Request, res:Response):Promise<void> => {
//   const { id } = req.params
//   console.log(id)
//   const checkAdded = await Event.findOne({
//     where: {
//       id
//     }
//   })
//   console.log(checkAdded?.Event?.isAdded, 'eventsssssssssssss')
//   res.json({ msg: 'event' })
// }

export default Credentials
