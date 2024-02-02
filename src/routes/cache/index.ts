import { FastifyPluginAsync } from "fastify";

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/cache1", async function (req, reply) {
    const cacheData = await fastify.redis.get("testCache1");
    if (!cacheData) {
      return reply.fail({ message: "没有testCache1的缓存数据,请先POST设置" });
    } else {
      return reply.ok({
        message: "testCache1获取成功(直接使用Reids实例)",
        data: cacheData,
      });
    }
  });

  fastify.post("/cache1", async function (req, reply) {
    const cacheData = +new Date();
    await fastify.redis.set("testCache1", cacheData);
    return reply.ok({ message: "testCache1设置成功(直接使用Reids实例)", data: cacheData });
  });

  fastify.get("/cache2", async function (req, reply) {
    const cacheData = await fastify.cache("testCache2");
    if (!cacheData) {
      return reply.fail({ message: "没有testCache2的缓存数据,请先POST设置" });
    } else {
      return reply.ok({
        message: "testCache2获取成功(使用封装的cache方法)",
        data: cacheData,
      });
    }
  });

  fastify.post("/cache2", async function (req, reply) {
    const cacheData = +new Date();
    await fastify.cache("testCache2", cacheData);
    return reply.ok({ message: "testCache2设置成功(使用封装的cache方法)", data: cacheData });
  });
};

export default example;
