import type { Response } from "express";

const sendResponse = <T>(res: Response, data: {
  success: boolean;
  message: string;
  error?: any
  data?: T;
  statusCode: number;
}) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    error: data.error,
    data: data.data,
  });
};

export default sendResponse;