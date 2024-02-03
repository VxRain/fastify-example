import { Static, Type } from "@sinclair/typebox";

export const EnvSchema = Type.Object({
  JWT_SECRET: Type.String({ default: "JWT_SECRET" }),

  SESSION_SECRET: Type.String({ minLength: 32, default: "df9cc12fb4f8a66d5a7eb1683192b785" }),
  SESSION_SALT: Type.String({ minLength: 16, maxLength: 16, default: "31c9f47fa4985a63" }),

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
