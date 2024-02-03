import fp from "fastify-plugin";
import session from "@fastify/secure-session";
export default fp(async (fastify, opts) => {
  fastify.register(session, {
    secret: fastify.config.SESSION_SECRET,
    salt: fastify.config.SESSION_SALT,
  });
});
