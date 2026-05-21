import express, { type Application, type Request, type Response } from 'express'
import globalErrorHandler from './middleware/globalErrorHandler';
import { AuthRoutes } from './modules/auth/auth.route';
const app: Application = express()
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Next Level Web Development & Assignment 02",
    data: {
      name: "Md. Shahid Hossain",
      email: "mdshahidca123@gmail.com",
      age: 23
    }
  })
})

app.use("/api/auth", AuthRoutes);




app.use(globalErrorHandler);

export default app