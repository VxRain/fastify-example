import { SignupSchema } from "./schema";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { cryptPwd, makeSalt } from "./service";

const example: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {
  fastify.post("/", {
    schema: { body: SignupSchema },
    handler: async function (req, res) {
      const { username, password, captcha } = req.body;
      const storedCaptcha = req.session.get("captcha");
      if (storedCaptcha !== captcha) {
        return res.fail({ message: "验证码错误" });
      }

      const { kysely } = fastify;
      const user = await kysely
        .selectFrom("User")
        .select("id")
        .where("username", "=", username)
        .executeTakeFirst();
      if (user) {
        return res.fail({ message: "用户已存在" });
      }

      const salt = makeSalt();
      const encodedPwd = cryptPwd(password, salt);
      await kysely.insertInto("User").values({ username, password: encodedPwd, salt }).execute();
      res.ok();
    },
  });
};

export default example;
