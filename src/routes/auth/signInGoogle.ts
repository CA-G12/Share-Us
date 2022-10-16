import express from 'express'
import passport from 'passport'
import dotenv from 'dotenv'
import { User } from '../../db'
import generateToken from '../../middlewares/generateToken'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

dotenv.config()
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL } = process.env

const Router = express.Router()

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID!,
  clientSecret: GOOGLE_CLIENT_SECRET!,
  callbackURL: GOOGLE_REDIRECT_URL,
  scope: ['profile', 'email']
},
async (request:any, accessToken:any, refreshToken:any, profile:any, done:any) => {
  console.log(profile._json)
  const { email }:any = profile._json

  try {
    const user = await User.findOne({
      attributes: ['id', 'username', 'email', 'profileImg'],
      where: {
        email
      }
    })
    if (!user) {
      return done(null, false, { message: 'can not found user' })
    } else {
      done(null, profile._json)
    }
  } catch (error) {
    done(error)
  }
}))

Router.get('/auth/google',
  passport.authenticate('google'))

Router.get('/oauth2/redirect/google', (req, res, next) => {
  passport.authenticate('google', async (err, user, info) => {
    if (err) { return next(err) }
    if (!user) {
      const { message } = info
      return res.send({ success: false, message })
    }
    const { sub, email, name, picture } = user
    console.log('++++++++++++++++', user)
    const token = await generateToken({ sub, email })
    return res.status(200)
      .json({
        success: true,
        message: 'authentication succeeded',
        user: { sub, name, email, picture },
        token
      })
  })(req, res, next)
})

// Router.post('/login', (req, res, next) => {
//   passport.authenticate('local', async (err, user, info) => {
//     if (err) { return next(err) }
//     if (!user) {
//       const { message } = info
//       return res.send({ success: false, message })
//     }
//     const { id, email } = user
//     const token = await generateToken({ id, email })
//     return res.cookie('token', token).send({ success: true, message: 'authentication succeeded', user })
//   })(req, res, next)
// })

export default Router
