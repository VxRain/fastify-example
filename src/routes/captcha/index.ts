import { FastifyPluginAsync } from "fastify";
import svgCaptcha from "svg-captcha";

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (req, res) {
    const captcha = svgCaptcha.create({
      size: 4,
      ignoreChars: "0o1i",
      noise: 4,
      color: true,
    });
    req.session.set("captcha", captcha.text);
    res.type("image/svg+xml").send(captcha.data);
  });
};

export default example;
