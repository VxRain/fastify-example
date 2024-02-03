import { Type } from "@sinclair/typebox";
import { SignupSchema } from "../user/schema";

export const LoginSchema = SignupSchema;

export const ResScheam = Type.Object({
  statusCode: Type.Number(),
  message: Type.Optional(Type.String()),
  data: Type.Optional(
    Type.Object({
      token: Type.String(),
      userInfo: Type.Object({
        id: Type.Number(),
        username: Type.String(),
        nickname: Type.Optional(Type.String()),
      }),
    })
  ),
});
