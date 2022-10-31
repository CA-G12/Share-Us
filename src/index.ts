import reminderEmail from './cornJobs/ReminderEmail'
import app from './app'
import config from './config/environment'
const port = config.port

reminderEmail()
app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`)
})
