'use strict'

const Service = require('egg').Service

class Wxhouse extends Service {
	// 创建或更新
	async createOrUpdate(params) {
		const { ctx } = this
		const [houseInstance, isNew] = await ctx.model.Wxhouse.findOrCreate({
			where: {
				id: params.id,
			},
			defaults: params,
		})
		if (!isNew) {
			// 更新操作
			return await ctx.model.Wxhouse.update(params, {
				where: {
          id: params.id,
          
				},
				defaults: params,
			})
		}
		return houseInstance
	}
}

module.exports = Wxhouse
