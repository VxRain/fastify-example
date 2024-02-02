import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { loginSchema } from "./schema";

const authRoute: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {
  fastify.post("/", {
    schema: {
      body: loginSchema,
    },
    handler: function (req, reply) {
      if (req.body.username !== "admin" || req.body.password !== "123456") {
        return reply.fail({ message: "用户名或密码错误" });
      } else {
        return reply.ok({
          message: "登录成功",
          data: {
            accessToken: fastify.jwt.sign({ username: req.body.username }),
          },
        });
      }
    },
  });

  fastify.get("/", {
    preHandler: [fastify.jwtOptionalAuth],
    handler: function (req, reply) {
      if (!req.user) {
        return reply.fail({ message: "唉？没登录？" });
      }
    },
  });
};

export default authRoute;
