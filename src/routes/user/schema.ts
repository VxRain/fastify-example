import { Type } from "@sinclair/typebox";

export const SignupSchema = Type.Object({
  username: Type.String({ minLength: 5, maxLength: 20 }),
  password: Type.String({ minLength: 6, maxLength: 28 }),
  captcha: Type.String({ minLength: 4, maxLength: 6 }),
});
