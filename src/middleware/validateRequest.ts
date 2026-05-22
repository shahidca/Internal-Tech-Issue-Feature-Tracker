import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

const validateRequest =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction) => {
   
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;
