import { Pool } from "pg";

const pool = new Pool({
  user: "admin",        
  host: "localhost",    
  database: "bookstore",
  password: "admin123",
  port: 5432,
});

export default pool;
