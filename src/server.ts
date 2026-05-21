import app from "./app"
import config from "./config/env"
import { initDbIssues } from "./database/issues"
import { initDbUser } from "./database/users"

const server = () =>{
  initDbUser()
  initDbIssues()
  app.listen(config.port, () => {
  console.log(`Next Level Web Development Server Running On The Port: ${config.port}`)
})
}
server()