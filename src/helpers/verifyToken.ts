import { verify } from 'jsonwebtoken'
import config from '../config/environment'

const verifyToken = (token:string):Promise<any> =>
  new Promise((resolve, reject) => {
    verify(token, config.secretKey, (err, decoded) => {
      if (err) {
        reject(err)
      } else {
        resolve(decoded)
      }
    })
  })

export default verifyToken
