"use strict";

const moment = require("moment");

const Controller = require("egg").Controller;

class TypeController extends Controller {
  async list() {
    const { ctx, app } = this;
    // 获取，日期 date，分页数据，类型 type_id，这些都是我们在前端传给后端的数据
    const { date, page = 1, page_size = 5, type_id = "all" } = ctx.query;

    try {
      let user_id;
      // 通过 token 解析，拿到 user_id
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;
      user_id = decode.id;
      // 拿到当前用户的账单列表
      const list = await ctx.service.type.list();

      // 返回数据
      ctx.body = {
        code: 200,
        msg: "请求成功",
        data: {
          list,
        },
      };
    } catch {
      ctx.body = {
        code: 500,
        msg: "系统错误",
        data: null,
      };
    }
  }
}

module.exports = TypeController;
