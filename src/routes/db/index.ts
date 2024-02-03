import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { CreatePostSchema, GetPostSchema } from "./schema";

const dbRoute: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {
  fastify.get("/post", {
    schema: { querystring: GetPostSchema },
    handler: async function (req, res) {
      const { kysely } = fastify;
      if (req.query.id) {
        const post = await kysely
          .selectFrom("Article")
          .selectAll()
          .where("id", "=", req.query.id)
          .executeTakeFirst();
        return res.ok({ data: post });
      } else {
        return res.ok({
          data: await kysely.selectFrom("Article").selectAll().execute(),
        });
      }
    },
  });

  fastify.post("/post", {
    schema: {
      body: CreatePostSchema,
    },
    handler: async function (req, res) {
      await fastify.kysely
        .insertInto("Article")
        .values({
          title: req.body.title,
          content: req.body.content,
          published: req.body.published,
        })
        .execute();
      res.ok();
    },
  });
};

export default dbRoute;
