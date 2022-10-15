import { Strategy as GoogleStrategy } from 'passport-google-oauth2'
import { User } from '../db'
import config from '../config/environment'

const googleSignup = (passport: any) => {
  passport.use(new GoogleStrategy({
    clientID: config.clientId,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackUrl,
    passReqToCallback: true
  }, async (_req:any, _accessToken: any, __refreshToken:any, _profile:any, done: any) => {
    try {
      const userExist = await User.findOne({ where: { username: _profile.displayName } })
      if (userExist) {
        return done(null, userExist)
      }
      const user = await User.create({
        username: _profile.displayName,
        email: _profile.email,
        profileImg: _profile.picture
      })

      return done(null, user)
    } catch (error) {
      return done(error, false)
    }
  }))
}

export default googleSignup
