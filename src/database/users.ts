import { pool } from "../config/db"

export const initDbUser = async () =>{
      try {
            await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    password TEXT NOT NULL,

    role VARCHAR(20) NOT NULL DEFAULT 'contributor'
    CHECK (role IN ('contributor', 'maintainer')),

    created_at TIMESTAMP DEFAULT NOW(),

    updated_at TIMESTAMP DEFAULT NOW()
);`)
console.log('Nenon DB connected successfully from user table !')
      } catch (error) {
            console.log("Error from Nenon DB", error)
            
      }
}