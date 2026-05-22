import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import config from "../config/env";

dotenv.config();

const generateToken = (payload: object) => {
  return jwt.sign(
    payload,
    config.jwt_secret as string,
    {
      expiresIn: "7d",
    }
  );
};

export default generateToken;