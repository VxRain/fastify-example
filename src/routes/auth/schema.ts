import { Type } from "@fastify/type-provider-typebox";

export const loginSchema = Type.Object({
  username: Type.String(),
  password: Type.String(),
});
