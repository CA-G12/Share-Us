import app from './app'
import config from './config/environment'
import corn from 'node-cron'
import dotenv from 'dotenv'
import sendEmail from './helpers/sendingEmail'
dotenv.config()
const port = config.port

corn.schedule('*/15 * * * * *', function () {
  // console.log('runs in every 5 seconds')
  // sendEmail('shams.khodary@gmail.com', 'test', 'test')
})

app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`)
})
