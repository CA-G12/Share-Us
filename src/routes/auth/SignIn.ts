/* eslint-disable no-undef */
import express from 'express'

import passport from 'passport'
import { User } from '../../db'
import generateToken from '../../middlewares/generateToken'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
const Router = express.Router()

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}
, async (username: any, password: any, done: any) => {
  try {
    const user = await User.findOne({
      attributes: ['id', 'username', 'email', 'profileImg'],
      where: {
        email: username
      }
    })
    if (!user) {
      return done(null, false, { message: 'can not found user' })
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
      return res.send({ success: false, message })
    }
    const { id, email } = user
    const token = await generateToken({ id, email })
    return res.cookie('token', token).send({ success: true, message: 'authentication succeeded', user })
  })(req, res, next)
})

export default Router
