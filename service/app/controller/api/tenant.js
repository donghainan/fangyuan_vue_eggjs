// 租户控制器
"use strict";
const Controller = require("egg").Controller;
// 前台提交的是时间戳
const rule = {
  id: { type: "number", required: true },
  room_name: { type: "string", required: true },
  user_name: { type: "string", required: true },
  phone: { type: "string", required: true },
  money: { type: "string", required: true },
  pay_type: { type: "string", required: true },
  attention_day: { type: "string", required: false },
  remarks: { type: "string", required: false },
  current_add_id: { type: "number", required: true },
  startTime: { type: "string", required: true },
  stopTime: { type: "string", required: true },
  giveTime: { type: "string", required: false },
  deposit: { type: "number", required: false },
};

// 租户控制器
class TenantController extends Controller {
  // 获取当前用户添加的租户信息

  async tenantList() {
    const { ctx } = this;

    const queryParams = ctx.request.body || {};

    if (!queryParams.user_id) {
      const { INVALID_PARAM } = this.config.errors;
      ctx.helper.$fail(INVALID_PARAM.code, INVALID_PARAM.msg);
      return;
    }

    const tenantInstance = await ctx.service.tenant.findAll(queryParams);
    ctx.helper.$success(tenantInstance);
  }

  // 添加租户
  async tenantAdd() {
    const { ctx } = this;
    ctx.validate(
      {
        room_name: rule.room_name,
        user_name: rule.user_name,
        phone: rule.phone,
        money: rule.money,
        pay_type: rule.pay_type,
        attention_day: rule.attention_day,
        remarks: rule.remarks,
        current_add_id: rule.current_add_id,
        startTime: rule.startTime,
        stopTime: rule.stopTime,
        deposit: rule.deposit,
      },
      ctx.request.body
    );
    const tenantInfo = ctx.request.body || {};
    if (JSON.stringify(tenantInfo) === "{}") {
      const { INVALID_PARAM } = this.config.errors;
      ctx.helper.$fail(INVALID_PARAM.code, INVALID_PARAM.msg);
      return;
    }

    // 判断起始日期大小
    if (tenantInfo.stopTime - tenantInfo.startTime < 0) {
      const { INVALID_PARAM } = this.config.errors;
      ctx.helper.$fail(INVALID_PARAM.code, "结束日期必须大于起始日期");
      return;
    }

    // 计算交租时间
    let start_time = tenantInfo.startTime;

    let type = tenantInfo.pay_type;

    let date = new Date(parseInt(start_time));

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

    tenantInfo.giveTime = date.getTime();

    // 调用service层处理数据
    const tenantInstance = await ctx.service.tenant.create(tenantInfo);
    ctx.helper.$success(tenantInstance);
  }

  // 房源修改
  async tenantUpdate() {
    const { ctx } = this;
    ctx.validate(
      {
        id: rule.id,
        room_name: rule.room_name,
        user_name: rule.user_name,
        phone: rule.phone,
        money: rule.money,
        pay_type: rule.pay_type,
        attention_day: rule.attention_day,
        remarks: rule.remarks,
        current_add_id: rule.current_add_id,
        startTime: rule.startTime,
        stopTime: rule.stopTime,
        deposit: rule.deposit,
      },
      ctx.request.body
    );
    const tenantInfo = ctx.request.body || {};
    if (JSON.stringify(tenantInfo) === "{}") {
      const { INVALID_PARAM } = this.config.errors;
      ctx.helper.$fail(INVALID_PARAM.code, INVALID_PARAM.msg);
      return;
    }

    // 判断起始日期大小
    if (tenantInfo.stopTime - tenantInfo.startTime < 0) {
      const { INVALID_PARAM } = this.config.errors;
      ctx.helper.$fail(INVALID_PARAM.code, "结束日期必须大于起始日期");
      return;
    }

    // 计算交租时间
    // let start_time = tenantInfo.startTime;

    // let type = tenantInfo.pay_type;

    // let date = new Date(parseInt(start_time));

    // let current_month = date.getMonth();

    // switch (type) {
    //   case "押一付一":
    //     date.setMonth(current_month + 1);
    //     break;
    //   case "押一付二":
    //     date.setMonth(current_month + 2);
    //     break;
    //   case "押一付三":
    //     date.setMonth(current_month + 3);
    //     break;
    //   default:
    //     break;
    // }

    // tenantInfo.giveTime = date.getTime();

    let flag = await ctx.service.tenant.findOne(tenantInfo);

    if (!flag) {
      const { HOUSE_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(HOUSE_NOT_FOUND.code, HOUSE_NOT_FOUND.msg);
      return;
    }

    ctx.helper.$success();
  }

  // 续租按钮
  async tenantRent() {
    const { ctx } = this;
    const queryParams = ctx.request.body || {};
    if (JSON.stringify(queryParams) === "{}") {
      const { INVALID_PARAM } = this.config.errors;
      ctx.helper.$fail(INVALID_PARAM.code, INVALID_PARAM.msg);
      return;
    }

    let flag = await this.ctx.service.tenant.addDays(queryParams.id);

    if (!flag) {
      const { INVALID_PARAM } = this.config.errors;
      ctx.helper.$fail(INVALID_PARAM.code, INVALID_PARAM.msg);
      return;
    }

    this.ctx.helper.$success();
  }

  // 租户信息删除
  async tenantDelete() {
    const { ctx } = this;
    ctx.validate(
      {
        id: rule.id,
      },
      ctx.request.body
    );
    await ctx.service.tenant.findById(ctx.request.body.id);
  }
}

module.exports = TenantController;
