import app from './app'
import config from './config/environment'
import changeStatus from './cronJobs/changeStatus'

const port = config.port

changeStatus()
app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`)
})
