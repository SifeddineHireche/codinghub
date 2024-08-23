

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "user";
const DB_PASSWORD = process.env.DB_PASSWORD || "mysecretpassword";
const DB_DATABASE = process.env.DB_DATABASE || "postgres";
const DB_PORT = process.env.DB_PORT || 5444;
const PORT = process.env.PORT || 3001;

module.exports = {
  FRONTEND_URL,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
  PORT,
};