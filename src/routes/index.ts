import express from 'express'
import passport from 'passport'
import signup from '../controllers/signup'
import generateToken from '../helpers/generateToken'
import googleSignup from '../auth/GoogleSignup'
googleSignup(passport)
const Router = express.Router()

Router.post('/signup', signup)

Router.get('/', (req, res) => {
  res.send('<a href="v1/signup/google">google</a>')
})

Router.get('/signup/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

Router.get('/signup/google/callback', passport.authenticate('google', { session: false }), async (req:any, res:any) => {
  const userId = req.user.dataValues.id
  const username = req.user.dataValues.username
  const token = await generateToken({ id: userId, username })
  res.json({
    data: req.user,
    token
  })
})
export default Router
