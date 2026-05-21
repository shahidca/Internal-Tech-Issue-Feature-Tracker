import type { JwtPayload } from "jsonwebtoken";

declare namespace Express {
  export interface Request {
    user: JwtPayload
  }
}