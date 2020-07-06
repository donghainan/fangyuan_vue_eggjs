'use strict';
const dayjs = require('dayjs');

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;
  const Wxhouse = app.model.define(
    'wxhouse',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: { type: STRING(1234), comment: '标题' },
      location: { type: STRING, comment: '房源位置' },
      renovation: { type: STRING, comment: '装修' },
      rentMode: { type: STRING, comment: '承租方式' },
      rentPeriod: { type: STRING, comment: '承租周期' },
      status: { type: STRING, comment: '上下架状态' },
      rentPrice: { type: STRING, comment: '租价（元）' },
      orientation: { type: STRING, comment: '朝向' },
      houseType: { type: STRING, comment: '户型' },
      area: { type: STRING, comment: '面积' },
      floor: { type: STRING, comment: '楼层' },
      allocation: { type: STRING, comment: '房屋配置' },
      agentName: { type: STRING, comment: '经纪人名称' },
      agentAvator: { type: STRING, comment: '经纪人头像' },
      agentPhone: { type: STRING, comment: '经纪人电话' },
      agentCompany: { type: STRING, comment: '经纪人公司名称' },
      houseDesc: { type: TEXT, comment: '房屋描述' },
      houseImgs: { type: STRING(1234), comment: '房屋图片' },
      houseVideo: { type: STRING(1234), comment: '房屋视频' },
      houseSource: { type: STRING, comment: '房屋来源' },
      delFlag: { type: INTEGER, comment: '房源是否删除 0否 1是' },
      createdAt: {
        type: DATE,
        get() {
          return dayjs(this.getDataValue('createdAt')).valueOf();
        },
        comment: '创建时间',
      },
      updatedAt: {
        type: DATE,
        get() {
          return dayjs(this.getDataValue('updatedAt')).valueOf();
        },
        comment: '更新时间',
      },
      deletedAt: {
        type: DATE,
        get() {
          return dayjs(this.getDataValue('deletedAt')).valueOf();
        },
        comment: '删除时间',
      },
    },
    {
      paranoid: false,
      underscored: false,
    }
  );
  Wxhouse.sync();
  return Wxhouse;
};
