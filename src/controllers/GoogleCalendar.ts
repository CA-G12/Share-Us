import { Response } from 'express'
import { google } from 'googleapis'
import { JoinedPeople, User } from '../db'
import { IUserRequest } from '../interfaces/IUserRequest'
import config from '../config/environment'
import querySchema from '../validation/googleCalendarValidate'

const Credentials = async (req:IUserRequest, res:Response):Promise<void> => {
  const oauth2Client = new google.auth.OAuth2(
    config.GOOGLE_CALENDAR_CLIENT_ID,
    config.GOOGLE_CALENDAR_CLIENT_SECRET
  )
  const user = req.user
  const { eventId } = req.body

  await JoinedPeople.update({ isAddedToCalendar: true }, {
    where: {
      UserId: user?.id,
      EventId: eventId
    }
  })

  const accessToken = await User.findOne({
    where: {
      id: user?.id
    },
    attributes: ['oauthAccessToken', 'refreshToken', 'oauthExpireIn']
  })

  // access_token , refresh_token , expiry_date
  oauth2Client.setCredentials({
    access_token: accessToken?.oauthAccessToken,
    refresh_token: accessToken?.refreshToken
    // expiry_date: accessToken?.oauthExpireIn
  })

  const calendar = google.calendar({ version: 'v3' })
  const { summary, description, startTime, endTime } = req.body
  querySchema.validate(req.body)
  calendar.events.insert({
    auth: oauth2Client,
    calendarId: 'primary',
    requestBody: {
      summary,
      description,
      start: {
        dateTime: startTime,
        timeZone: 'Asia/Jerusalem'
      },
      end: {
        dateTime: endTime,
        timeZone: 'Asia/Jerusalem'
      }
    }
  }, function (err:any, event:any) {
    if (err) {
      res.json({ msg: err })
    } else {
      res.json({ msg: 'add successflly!' })
    }
  })
}

export default Credentials
