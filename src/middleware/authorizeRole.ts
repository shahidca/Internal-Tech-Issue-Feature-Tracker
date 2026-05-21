
import type { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

const authorizeRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!roles.includes(userRole)) {
      throw new AppError("Access denied", 403);
    }

    next();
  };
};

export default authorizeRole;