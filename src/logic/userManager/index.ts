import { Request } from "express";
import * as pg from "pg";
import { getPostgresPool } from "../../common/utils/dbConnection";
const userIngestionTable = "user_ingestion_table";

class UserManager {
  handleHealthCheck() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = "Api is up";
        resolve(result);
      } catch (err: any) {
        reject(new Error(err.message));
      }
    });
  }

  handleFetchUserInRaduis(request: Request) {
    return new Promise(async (resolve, reject) => {
      const lat = request.body.lat;
      const lng = request.body.lng;
      const radius = request.body.radius;
      try {
        const pgPool = await UserManager.queryDb();
        const data = await pgPool.query(`
          SELECT *
          FROM ${userIngestionTable}
          WHERE ST_DistanceSphere(geom, ST_MakePoint(${lng},${lat})) <= ${radius} * 1609.34
          `);

        resolve(data.rows);
      } catch (err: any) {
        reject(new Error(err.message));
      }
    });
  }

  handleInsertUser(request: Request) {
    return new Promise(async (resolve, reject) => {
      try {
        const tableCreationQuery =
          this.buildTableCreationQuery(userIngestionTable);
        const pgPool = await UserManager.queryDb();
        await pgPool.query(tableCreationQuery);

        await this.buildInsertQuery(
          JSON.stringify(request.body.geometry),
          userIngestionTable,
          pgPool,
          request.body.name
        );
        resolve("resolve");
      } catch (err: any) {
        reject(new Error(err.message));
      }
    });
  }

  buildTableCreationQuery(tableName: String) {
    return (
      "create table if not exists " +
      tableName +
      " (id serial primary key, geom geometry, name varchar(255))"
    );
  }

  buildInsertQuery(data: any, table: String, pgPool: pg.Pool, name: string) {
    return pgPool.query(
      `
      INSERT INTO ${table} (name, geom)
        VALUES
        (
            '${name}',
            ST_GeomFromGeoJSON
            (
                '${data}'
            )
        )
      `
    );
  }

  static async queryDb(): Promise<pg.Pool> {
    const postgresPool = await getPostgresPool();
    return postgresPool;
  }
}

export default UserManager;
