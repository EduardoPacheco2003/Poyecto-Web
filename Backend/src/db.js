import { createPool } from "mysql2/promise";
import config from "./config.js";

export const pool = createPool({
  host: config.dbUrl,
  user: config.dbUser,
  password: config.dbPassword,
  port: config.dbPort,
  database: config.dbName,
});
