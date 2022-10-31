import app from './app'
import config from './config/environment'

const port = config.port

app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`)
})
