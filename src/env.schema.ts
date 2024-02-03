import { Static, Type } from "@sinclair/typebox";

export const EnvSchema = Type.Object({
  JWT_SECRET: Type.String({ default: "JWT_SECRET" }),
  PG_HOST: Type.Optional(Type.String({ default: "localhost" })),
  PG_PORT: Type.Optional(Type.Number({ default: 5432 })),
  PG_DATABASE: Type.Optional(Type.String({ default: "postgres" })),
  PG_USER: Type.Optional(Type.String({ default: "postgres" })),
  PG_PASSWORD: Type.Optional(Type.String({ default: "postgres" })),
  REDIS_HOST: Type.Optional(Type.String({ default: "localhost" })),
  REDIS_PORT: Type.Optional(Type.Number({ default: 6379 })),
  REDIS_PASSWORD: Type.Optional(Type.String({ default: "" })),
});

export type Env = Static<typeof EnvSchema>;
