import type { Response } from "express";


const sendResponse = <T>(res: Response, data: {
  success: boolean;
  message: string;
  data?: T;
  statusCode: number;
}) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;