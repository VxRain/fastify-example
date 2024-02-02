import { FastifyPluginAsync } from "fastify";

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    return "Fastify Example";
  });

  fastify.get("/ok1", async function (req, res) {
    return this.ok();
  });
  fastify.get("/ok2", async function (req, res) {
    return res.ok();
  });

  fastify.get("/fail1", async function (req, res) {
    return this.fail();
  });

  fastify.get("/fail2", async function (req, res) {
    return res.fail();
  });
};

export default example;
