import { Type } from "@sinclair/typebox";

export const GetPostSchema = Type.Object({
  id: Type.Optional(Type.Number()),
});

export const CreatePostSchema = Type.Object({
  title: Type.String(),
  content: Type.Optional(Type.String()),
  published: Type.Boolean(),
});
