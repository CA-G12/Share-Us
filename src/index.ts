import app from './app'
import environment from './config/environment'

const port = environment.port

app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`)
})
