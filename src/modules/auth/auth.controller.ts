
import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const signupUser = async (req: Request, res: Response) => {
      console.log(req)
      const result = await AuthServices.signupUserFromDB(req.body);
  try {   
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: result.rows[0],
  });
  } catch (error: any) {
      sendResponse(res, {
            success: false,
            statusCode: 500,
            message: error.message, 
            error: error.details          
      })
  }
};

const loginUser = async (req: Request, res: Response) => {
  const result = await AuthServices.loginUserFromDB(req.body);

  try {
    sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Login successful",
    data: result,
  });
  } catch (error: any) {
    sendResponse(res, {
    success: false,
    statusCode: 500,
    message: error.message,
    error: error.details
  });
  }
};

export const AuthControllers = {
  signupUser,
  loginUser,
};