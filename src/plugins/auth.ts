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
      throw fastify.httpErrors.unauthorized("认证未通过，请重新登录");
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
    // Fastify的TypeProvider配合preHandler或onRequest使用时会丢失类型
    // 这里使用any简单的处理
    // 参见：https://github.com/fastify/fastify/issues/4120
    jwtAuth(request: FastifyRequest | any): Promise<void>;
    jwtOptionalAuth(request: FastifyRequest | any): Promise<void>;
  }
}
