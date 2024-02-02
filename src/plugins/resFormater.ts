import fp from "fastify-plugin";

export interface SuccessOptions {
  // Specify Support plugin options here
}

export interface FormatedResponse {
  statusCode?: number;
  message?: string;
  data?: any;
}

export default fp<SuccessOptions>(async (fastify, opts) => {
  // 装饰器，可以定义在Fastify实例上
  fastify.decorate("ok", function (payload) {
    return {
      statusCode: payload?.statusCode ?? 0,
      message: payload?.message ?? "OK",
      data: payload?.data ?? null,
    };
  });

  fastify.decorate("fail", function (payload) {
    return {
      statusCode: payload?.statusCode ?? 1,
      message: payload?.message ?? "FAIL",
      data: payload?.data ?? null,
    };
  });

  // 或者定义在Request和Reply上
  // this是Request或Reply，注意：this在箭头函数中不可用
  fastify.decorateReply("ok", function (payload) {
    this.type("application/json");
    this.send({
      statusCode: payload?.statusCode ?? 0,
      message: payload?.message ?? "OK",
      data: payload?.data ?? null,
    });
  });

  fastify.decorateReply("fail", function (payload) {
    this.type("application/json");
    this.send({
      statusCode: payload?.statusCode ?? 1,
      message: payload?.message ?? "FAIL",
      data: payload?.data ?? null,
    });
  });
});

// 使用.decorate时，必须为 TypeScript 指明添加的属性
declare module "fastify" {
  export interface FastifyInstance {
    ok(opts?: FormatedResponse): FormatedResponse;
    fail(opts?: FormatedResponse): FormatedResponse;
  }

  export interface FastifyReply {
    ok(opts?: FormatedResponse): void;
    fail(opts?: FormatedResponse): void;
  }
}
