"use strict";
// 租户表
module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  // https://sequelize.org/master/class/lib/model.js~Model.html
  const Tenant = app.model.define(
    "tenant",
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      room_name: { type: STRING, comment: "房间信息" },
      user_name: { type: STRING, comment: "租客姓名" },
      phone: { type: STRING, comment: "联系方式" },
      money: { type: STRING, comment: "租金" },
      pay_type: { type: STRING, comment: "支付方式" },
      attention_day: { type: STRING, comment: "剩余天数提醒，默认7天" },
      remarks: { type: STRING, comment: "备注信息" },
      deposit: { type: INTEGER, comment: "押金" },
      current_add_id: { type: INTEGER, comment: "当前添加租户的用户id" },
      startTime: {
        type: STRING,
        comment: "起租日期",
      },
      stopTime: {
        type: STRING,
        comment: "终止日期",
      },
      giveTime: {
        type: STRING,
        comment: "交租日期",
      },
    },
    {
      // Calling destroy will not delete the model,
      // but instead set a deletedAt timestamp if this is true. Needs timestamps=true to work
      paranoid: false,
      // Add underscored field to all attributes, this covers user defined attributes,
      // timestamps and foreign keys. Will not affect attributes with explicitly set field option
      underscored: false, // 下划线
    }
  );
  Tenant.sync();
  return Tenant;
};
