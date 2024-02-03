import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync, FastifyServerOptions } from "fastify";
import { fastifyEnv } from "@fastify/env";
import { Env, EnvSchema } from "./env.schema";

export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {}

// 通过命令行参数在命令中传递--options启用 options
const options: AppOptions = {};

declare module "fastify" {
  interface FastifyInstance {
    config: Env;
  }
}

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
  // 注册前置插件
  await fastify.register(fastifyEnv, { schema: EnvSchema, dotenv: true });

  // 载入所有plugins目录下的插件
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  // 载入所有routes目录下的插件(路由)
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
  });
};

export default app;
export { app, options };
