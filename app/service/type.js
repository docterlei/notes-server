"use strict";

const Service = require("egg").Service;

class TypeService extends Service {
  async list() {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.select("type", { where: { user_id: 0 } });
      console.log(result, "rr");
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = TypeService;
