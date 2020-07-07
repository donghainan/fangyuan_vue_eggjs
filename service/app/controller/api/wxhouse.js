'use strict'

const await = require('await-stream-ready/lib/await')

const Controller = require('egg').Controller
const rules = {
	id: { type: 'number', required: true },
	delFlag: { type: 'number', required: false },
	houseRecommend: { type: 'number', required: false },
	houseNo: { type: 'string', required: false },
	houseInfo: { type: 'string', required: false },
	houseHighlights: { type: 'string', required: false },

	title: { type: 'string', required: true },
	rentPrice: { type: 'string', required: true },
	agentPhone: { type: 'string', required: true },
	renovation: { type: 'string', required: true },
	location: { type: 'string', required: true },
	rentMode: { type: 'string', required: true },
	rentPeriod: { type: 'string', required: true },
	status: { type: 'string', required: true },
	houseImgs: { type: 'string', required: true },

	orientation: { type: 'string', required: false },
	houseType: { type: 'string', required: false },
	houseArea: { type: 'string', required: false },
	houseFloor: { type: 'string', required: false },
	houseFloorAllocation: { type: 'string', required: false },
	agentName: { type: 'string', required: false },
	agentAvator: { type: 'string', required: false },
	agentCompany: { type: 'string', required: false },
	houseDesc: { type: 'string', required: false },
	houseVideo: { type: 'string', required: false },
	houseSource: { type: 'string', required: false },
}
class Wxhouse extends Controller {
	// 新增房源
	async wxAdd() {
		const { ctx } = this
		ctx.validate(
			{
				houseRecommend: rules.houseRecommend,
				houseInfo: rules.houseInfo,
				houseHighlights: rules.houseHighlights,
				title: rules.title,
				rentPrice: rules.rentPrice,
				agentPhone: rules.agentPhone,
				renovation: rules.renovation,
				location: rules.location,
				rentMode: rules.rentMode,
				rentPeriod: rules.rentPeriod,
				status: rules.status,
				houseImgs: rules.houseImgs,
				orientation: rules.orientation,
				houseType: rules.houseType,
				houseArea: rules.houseArea,
				houseFloor: rules.houseFloor,
				houseFloorAllocation: rules.houseFloorAllocation,
				agentName: rules.agentName,
				agentAvator: rules.agentAvator,
				agentCompany: rules.agentCompany,
				houseDesc: rules.houseDesc,
				houseVideo: rules.houseVideo,
				houseSource: rules.houseSource,
			},
			ctx.request.body
		)
		const queryParams = ctx.request.body || {}
		if (JSON.stringify(queryParams) === '{}') {
			const { INVALID_PARAM } = this.config.errors
			ctx.helper.$fail(INVALID_PARAM.code, INVALID_PARAM.msg)
			return
		}
		const houseInstance = await ctx.service.wxhouse.findOrCreate(queryParams)
		ctx.helper.$success(houseInstance)
	}
	// 更新房源
	async wxUpdate() {
		const { ctx } = this
		ctx.validate(
			{
				id: rules.id,
				houseNo: rules.houseNo,
				delFlag: rules.delFlag,
				houseRecommend: rules.houseRecommend,
				houseInfo: rules.houseInfo,
				houseHighlights: rules.houseHighlights,
				title: rules.title,
				rentPrice: rules.rentPrice,
				agentPhone: rules.agentPhone,
				renovation: rules.renovation,
				location: rules.location,
				rentMode: rules.rentMode,
				rentPeriod: rules.rentPeriod,
				status: rules.status,
				houseImgs: rules.houseImgs,
				orientation: rules.orientation,
				houseType: rules.houseType,
				houseArea: rules.houseArea,
				houseFloor: rules.houseFloor,
				houseFloorAllocation: rules.houseFloorAllocation,
				agentName: rules.agentName,
				agentAvator: rules.agentAvator,
				agentCompany: rules.agentCompany,
				houseDesc: rules.houseDesc,
				houseVideo: rules.houseVideo,
				houseSource: rules.houseSource,
			},
			ctx.request.body
		)
		const params = ctx.request.body || {}
		if (JSON.stringify(params) === '{}') {
			const { INVALID_PARAM } = this.config.errors
			ctx.helper.$fail(INVALID_PARAM.code, INVALID_PARAM.msg)
			return
		}
		await ctx.service.wxhouse.findAndUpdate(params)
	}
	// 删除房源
	async wxDelete() {
		const { ctx } = this
		ctx.validate(
			{
				id: rules.id,
			},
			ctx.request.body
		)
		const params = ctx.request.body || {}
		if (JSON.stringify(params) === '{}') {
			const { INVALID_PARAM } = this.config.errors
			ctx.helper.$fail(INVALID_PARAM.code, INVALID_PARAM.msg)
			return
		}
		await ctx.service.wxhouse.delete(ctx.request.body)
	}
	// 房源列表
	async wxList() {
		const { ctx } = this
		ctx.validate(
			{
				location: { type: 'string', required: false },
				rentMode: { type: 'string', required: false },
				rentPeriod: { type: 'string', required: false },
				status: { type: 'string', required: false },
				houseNo: { type: 'string', required: false },
				rentPrice: { type: 'string', required: false },
			},
			ctx.request.body
		)
		const queryParams = ctx.request.body || {}
		const houeInstance = await ctx.service.wxhouse.list(queryParams)
		ctx.helper.$success(houeInstance)
	}
}

module.exports = Wxhouse
