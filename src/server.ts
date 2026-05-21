import app from "./app"
import config from "./config/env"

app.listen(config.port, () => {
  console.log(`Next Level Web Development Server Running On The Port: ${config.port}`)
})