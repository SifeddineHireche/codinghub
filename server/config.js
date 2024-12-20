

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const DB_HOST = process.env.DB_HOST || "dpg-ctin05ggph6c7389rot0-a.oregon-postgres.render.com";
const DB_USER = process.env.DB_USER || "postgres_codinghub_388c_user";
const DB_PASSWORD = process.env.DB_PASSWORD || "Bg4iSimcrTvBeyinktQ6naOHkJ2V52Yc";
const DB_DATABASE = process.env.DB_DATABASE || "postgres_codinghub_388c";
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