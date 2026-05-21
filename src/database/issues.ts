import { pool } from "../config/db"

export const initDbIssues = async () =>{
      try {
            await pool.query(`CREATE TABLE IF NOT EXISTS issues (
    id SERIAL PRIMARY KEY,

    title VARCHAR(150) NOT NULL,

    description TEXT NOT NULL,

    type VARCHAR(30) NOT NULL
    CHECK (type IN ('bug', 'feature_request')),

    status VARCHAR(30) NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'in_progress', 'resolved')),

    reporter_id INT NOT NULL,

    created_at TIMESTAMP DEFAULT NOW(),

    updated_at TIMESTAMP DEFAULT NOW()
);`)
console.log('Nenon DB connected successfully from Issues Table!')
      } catch (error) {
            
      }

}