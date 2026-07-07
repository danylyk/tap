import knex from "knex";
import {getEnv} from "@/lib/env";

export const db = knex({
  client: "pg",
  connection: {
    host: getEnv("DATABASE_HOST"),
    port: getEnv("DATABASE_PORT", "number"),
    database: getEnv("DATABASE_NAME"),
    user: getEnv("DATABASE_USER"),
    password: getEnv("DATABASE_PASSWORD"),
  },
});
