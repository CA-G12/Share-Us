import app from './app'
import config from './config/environment'
import dotenv from 'dotenv'

dotenv.config()
const port = config.port

app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`)
})
