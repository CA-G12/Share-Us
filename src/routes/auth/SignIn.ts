/* eslint-disable no-undef */
import express from 'express'

import passport from 'passport'
import { User } from '../../db'
import generateToken from '../../middlewares/generateToken'
import validateSignIn from '../../validation/signIn'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
const Router = express.Router()

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

Router.post('/login', (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) { return next(err) }
    if (!user) {
      const { message } = info
      return res.status(422).json({ success: false, message })
    }
    const { id, email, username, profileImg } = user
    const token = await generateToken({ id, email })
    return res.status(200)
      .json({
        success: true,
        message: 'authentication succeeded',
        user: { id, username, email, profileImg },
        token
      })
  })(req, res, next)
})

export default Router
