import fp from "fastify-plugin";
import { Kysely } from "kysely";
import { PostgresJSDialect } from "kysely-postgres-js";
import postgres from "postgres";
import { Database } from "./schema.type";
import { cpus } from "os";

export default fp(async (fastify, opts) => {
  const { config } = fastify;
  const sql = postgres({
    database: config.PG_DATABASE,
    host: config.PG_HOST,
    port: config.PG_PORT,
    user: config.PG_USER,
    password: config.PG_PASSWORD,
    max: cpus().length * 2 + 1,
  });

  try {
    await sql`SELECT 1`;
  } catch (e) {
    fastify.log.error(e);
    throw new Error("无法连接到数据库");
  }

  const db = new Kysely<Database>({
    dialect: new PostgresJSDialect({ postgres: sql }),
  });

  fastify.decorate("kysely", db);

  fastify.addHook("onClose", async (fastify) => {
    await fastify.kysely.destroy();
  });
});

declare module "fastify" {
  interface FastifyInstance {
    kysely: Kysely<Database>;
  }
}
