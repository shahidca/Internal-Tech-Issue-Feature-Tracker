import jwt, { type JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import AppError from "../utils/AppError";
import type { NextFunction, Request, Response } from "express";
import config from "../config/env";

dotenv.config();
const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError("Unauthorized access", 401);
  }

  try {
    const decoded = jwt.verify(
      token,
      config.jwt_secret as string
    )as JwtPayload;

    req.user = decoded ;

    next();
  } catch (error) {
    next(new AppError("Invalid or expired token!!", 401));
  }
};

export default verifyToken;