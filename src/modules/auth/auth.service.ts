import bcrypt from "bcrypt";
import { pool } from "../../config/db";
import generateToken from "../../utils/generateToken";
import type { IAuthUser } from "./auth.user.interface";

const signupUserFromDB = async (payload: IAuthUser) => {
  const { name, email, password, role } = payload;

  // check existing user
  const existingUser = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error("Email already exists");
  }
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // insert user
  const result = await pool.query(
    `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    
    [name, email, hashedPassword, role]
    
  );
  delete result.rows[0].password
  return result;
};

const loginUserFromDB = async (payload: IAuthUser) => {
  const { email, password } = payload;

  // find user
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // compare password
  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error("Invalid credentials | wrong password");
  }

  // generate token
  
  const token = generateToken({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const AuthServices = {
      signupUserFromDB,
      loginUserFromDB,
}