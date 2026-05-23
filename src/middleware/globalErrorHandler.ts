// import type { NextFunction, Request, Response } from "express";
// import AppError from "../utils/AppError";

// const globalErrorHandler = (
//   err: any,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   let statusCode = 500;
//   let message = "Something went wrong";

//   if (err instanceof AppError) {
//     statusCode = err.statusCode;
//     message = err.message;
//   }

//   res.status(statusCode).json({
//     success: false,
//     message,
//     errors: err,
//   });
// };

// export default globalErrorHandler;
import type { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode = 500;

  let message = "Something went wrong";

  let errorDetails: any = [];

  // Zod Error
  if (err.name === "ZodError") {
    statusCode = 400;

    message = "Validation Error";

    errorDetails = err.issues.map((issue: any) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  }

  // AppError
  else if (err.statusCode) {
    statusCode = err.statusCode;

    message = err.message;
  }

  // PostgreSQL Errors
  else if (err.code) {
    statusCode = 400;

    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: errorDetails,
  });
};

export default globalErrorHandler;