"use strict";
const Service = require("egg").Service;
class TenantService extends Service {
  // 新增租户信息
  async create(tenantInfo) {
    const { ctx } = this;
    const tenantInstance = await ctx.model.Tenant.create(tenantInfo);
    return tenantInstance;
  }

  // 查找更新租户
  async findOne(addInfo) {
    const { ctx } = this;
    const addInfoInstance = await ctx.model.Tenant.findOne({
      where: {
        id: addInfo.id,
      },
      defaults: addInfo,
    });
    if (!addInfoInstance) {
      // const { HOUSE_NOT_FOUND } = this.config.errors;
      // ctx.helper.$fail(HOUSE_NOT_FOUND.code, HOUSE_NOT_FOUND.msg);
      return false;
    }
    const info = await ctx.model.Tenant.update(addInfo, {
      where: {
        id: addInfoInstance.id,
      },
    });
    return info;
  }

  async findAll(queryParams) {
    const { ctx } = this;
    const page = queryParams.page || 1;
    const size = queryParams.size || 10;

    const where = {
      current_add_id: queryParams.user_id,
    };

    const query = {
      where,
      order: [["giveTime", "asc"]],
      limit: size,
      offset: (page - 1) * size,
    };
    const { rows: result, count } = await ctx.model.Tenant.findAndCountAll(
      query
    );
    return { result, count: count, page, size };
  }

  // 续租按钮
  async addDays(id) {
    const { ctx } = this;
    const tenant = await ctx.model.Tenant.findOne({
      where: {
        id,
      },
    });
    if (!tenant) {
      const { HOUSE_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(HOUSE_NOT_FOUND.code, HOUSE_NOT_FOUND.msg);
      return;
    }

    // 获取支付方式
    let type = tenant.pay_type;

    let date = new Date(parseInt(tenant.giveTime));

    let current_month = date.getMonth();

    switch (type) {
      case "押一付一":
        date.setMonth(current_month + 1);
        break;
      case "押一付二":
        date.setMonth(current_month + 2);
        break;
      case "押一付三":
        date.setMonth(current_month + 3);
        break;
      default:
        break;
    }

    let temp = {};
    temp.giveTime = date.getTime() + "";

    const info = await ctx.model.Tenant.update(temp, {
      where: {
        id: tenant.id,
      },
    });
    return info;
  }

  // 删除租户信息
  async findById(id) {
    const { ctx } = this;
    const tenant = await ctx.model.Tenant.findOne({
      where: {
        id,
      },
    });
    if (!tenant) {
      const { HOUSE_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(HOUSE_NOT_FOUND.code, HOUSE_NOT_FOUND.msg);
      return;
    }
    await tenant.destroy();
    ctx.helper.$success();
  }
}

module.exports = TenantService;
