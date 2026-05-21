import express, { type Application, type Request, type Response } from 'express'
import globalErrorHandler from './middleware/globalErrorHandler';
const app: Application = express()
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! Assigment publish')
})

app.use(globalErrorHandler);
export default app