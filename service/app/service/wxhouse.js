'use strict';

const Service = require('egg').Service;

class Wxhouse extends Service {
  // 创建
  async findOrCreate(params) {
    const { ctx, app } = this;

    const uuid8 = ctx.helper.uuid.v4().replace(/-/g, '').substring(4, 12);
    params.houseNo = uuid8;
    params.delFlag = 0;
    const [ houseInstance, isNew ] = await ctx.model.Wxhouse.findOrCreate({
      where: {
        houseNo: params.houseNo,
      },
      defaults: params,
    });
    if (!isNew) {
      const { WX_HOUSE_FOUND } = app.config.errors;
      const err = new Error();
      Object.assign(err, WX_HOUSE_FOUND);
      throw err;
    }
    return houseInstance;
  }
  // 查找并更新
  async findAndUpdate(params) {
    const { ctx, app } = this;
    const wxhouse = await ctx.model.Wxhouse.findOne({
      where: { id: params.id },
    });
    if (!wxhouse) {
      const { WX_HOUSE_NOTFOUND } = app.config.errors;
      const err = new Error();
      Object.assign(err, WX_HOUSE_NOTFOUND);
      throw err;
    }
    const houseInstance = await ctx.model.Wxhouse.update(params, {
      where: {
        id: params.id,
      },
      defaults: params,
    });
    if (houseInstance) {
      ctx.helper.$success({}, '更新成功');
    } else {
      ctx.helper.$error(500, '更新失败');
    }
  }
  // 删除
  async delete(params) {
    const { ctx, app } = this;
    const wxhouse = await ctx.model.Wxhouse.findOne({
      where: { id: params.id },
    });
    if (!wxhouse) {
      const { WX_HOUSE_NOTFOUND } = app.config.errors;
      const err = new Error();
      Object.assign(err, WX_HOUSE_NOTFOUND);
      throw err;
    }
    await wxhouse.destroy();
    ctx.helper.$success();
  }
  // 查询列表
  async list(queryParams) {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    const page = queryParams.page || 1;
    const size = queryParams.size || 10;
    let where = {};
    if (queryParams.isWx) {
      // 小程序接口
      where = {
        delFlag: 0,
        status: '1',
        location: queryParams.location,
        rentMode: queryParams.rentMode,
        rentPeriod: queryParams.rentPeriod,
        houseNo: queryParams.houseNo,
        rentPrice: {
          [Op.lte]: ctx.helper.toInt(queryParams.rentPrice),
        },
      };
      for (const key in where) {
        const val = where[key];
        if (typeof val === 'null' || typeof val === 'undefined' || !val) {
          delete where[key];
        }

        if (!queryParams.rentPrice) {
          delete where.rentPrice;
        }
      }
    } else {
      // 后台管理接口
      where = {
        delFlag: 0,
        location: queryParams.location,
        rentMode: queryParams.rentMode,
        rentPeriod: queryParams.rentPeriod,
        status: queryParams.status,
        houseNo: queryParams.houseNo,
        rentPrice: {
          [Op.lte]: ctx.helper.toInt(queryParams.rentPrice),
        },
      };
      for (const key in where) {
        const val = where[key];
        if (typeof val === 'null' || typeof val === 'undefined' || !val) {
          delete where[key];
        }

        if (!queryParams.rentPrice) {
          delete where.rentPrice;
        }
      }
    }
    const query = {
      where,
      order: [[ 'houseRecommend', 'desc' ]],
      limit: size,
      offset: (page - 1) * size,
    };
    const { rows: result, count } = await ctx.model.Wxhouse.findAndCountAll(
      query
    );
    return { result, count, page, size };
  }
}

module.exports = Wxhouse;
