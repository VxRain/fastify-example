import { FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import jwt from "@fastify/jwt";

export interface AuthOptions {
  jwtSecret: string;
}

export default fp<AuthOptions>(async (fastify, opts) => {
  fastify.register(jwt, { secret: fastify.config.JWT_SECRET });

  /** JWT认证，失败抛出401 */
  fastify.decorate("jwtAuth", async (request: FastifyRequest) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      throw fastify.httpErrors.unauthorized("未认证，请重新登录");
    }
  });

  /** 可选的JWT认证，用于需要在路由内部鉴权的场景 */
  fastify.decorate("jwtOptionalAuth", async (request: FastifyRequest) => {
    try {
      await request.jwtVerify();
    } catch (err) {}
  });
});

declare module "fastify" {
  export interface FastifyInstance {
    jwtAuth(request: FastifyRequest): void;
    jwtOptionalAuth(request: FastifyRequest): void;
  }
}
