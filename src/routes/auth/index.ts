import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { LoginSchema, ResScheam } from "./schema";
import { isValidPwd } from "../user/service";

const authRoute: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {
  fastify.post("/", {
    schema: { body: LoginSchema, response: { 200: ResScheam } },
    handler: async function (req, res) {
      const captcha = req.session.get("captcha");
      if (captcha !== req.body.captcha) {
        return res.fail({ message: "验证码错误" });
      }

      const { kysely } = fastify;
      const user = await kysely
        .selectFrom("User")
        .select(["id", "username", "password", "salt"])
        .where("username", "=", req.body.username)
        .executeTakeFirst();
      if (!user) {
        return res.fail({ message: "用户名或密码错误" });
      }

      if (!isValidPwd(user, req.body.password)) {
        return res.fail({ message: "用户名或密码错误" });
      }

      return res.ok({
        data: {
          token: fastify.jwt.sign({ id: user.id, username: user.username }),
          userInfo: user,
        },
      });
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
