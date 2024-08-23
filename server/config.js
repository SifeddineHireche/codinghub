

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const DB_HOST = process.env.DB_HOST || "dpg-cr2bk4tsvqrc73cmi3o0-a";
const DB_USER = process.env.DB_USER || "postgres_codinghub_user";
const DB_PASSWORD = process.env.DB_PASSWORD || "HbKSCd9tcHrUfsuMVNEXmblSCRgOCbwB";
const DB_DATABASE = process.env.DB_DATABASE || "postgres_codinghub";
const DB_PORT = process.env.DB_PORT || 5432;
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