import fp from "fastify-plugin";
import redis from "@fastify/redis";

export default fp(async (fastify, opts) => {
  /** 注册redis */
  fastify.register(redis, {
    host: "127.0.0.1",
    port: 6379,
  });

  /** 封装修饰一个cache方法 */
  fastify.decorate(
    "cache",
    async function (key: string, value?: string | number | Buffer, timeout?: number) {
      // 如果value未定义，直接获取缓存值
      if (value === undefined) {
        return await fastify.redis.get(key);
      }

      // 如果设置了超时时间，使用setex方法
      if (timeout !== undefined && timeout > 0) {
        return await fastify.redis.setex(key, timeout, value);
      }

      // 默认情况下，使用set方法
      return await fastify.redis.set(key, value);
    }
  );
});

declare module "fastify" {
  interface FastifyInstance {
    cache(key: string, value?: string | number | Buffer): Promise<any>;
  }
}
