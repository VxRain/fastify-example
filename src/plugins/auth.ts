import { FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";

export interface AuthOptions {
  jwtSecret: string;
}

export default fp<AuthOptions>(async (fastify, opts) => {
  fastify.register(fastifyJwt, {
    secret: "opts.jwtSecret",
  });

  fastify.decorate("jwtAuth", async (request: FastifyRequest) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      throw fastify.httpErrors.unauthorized("未认证，请重新登录");
    }
  });

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
