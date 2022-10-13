import { payloadType } from 'interfaces/payload'
import * as jwt from 'jsonwebtoken'
import config from '../config/environment'

const generateToken = (payload: payloadType) => new Promise((resolve, reject) => {
  const secretKey = config.secretKey || 'secret'
  jwt.sign(payload, secretKey, (err, token) => {
    if (err) {
      reject(err)
    } else {
      resolve(token)
    }
  })
})

export default generateToken
