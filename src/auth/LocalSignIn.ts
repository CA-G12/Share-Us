import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import validateSignIn from '../validation/validateSignin'
import { User } from '../db'
import bcrypt from 'bcrypt'

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}
, async (email: any, password: any, done: any) => {
  try {
    await validateSignIn({ email, password })
    const user = await User.findOne({
      attributes: ['id', 'password', 'username', 'email', 'profileImg'],
      where: {
        email
      }
    })
    if (!user) {
      return done(null, false, { message: 'email not exist' })
    }
    const verified = await bcrypt.compare(password, user.password)
    verified
      ? done(null, user)
      : done(null, false, { message: 'password not match' })
  } catch (error) {
    done(error)
  }
}))

export default passport
