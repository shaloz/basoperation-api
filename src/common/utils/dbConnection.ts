import { environment } from "./environment";
import * as pg from "pg";

export async function getPostgresPool() {
  const pool = new pg.Pool(environment);
  await pool.connect();
  return pool;
}
// await pool.query("CREATE DATABASE my_database");
