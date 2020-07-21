import Http from "@/utils/axios";
let env = process.env.NODE_ENV !== 'development'
const proxy = "/api"
const baseUrl = env ? `https://www.yanhao.love` : ''

export default {
    /**------------------------------------用户---------------------------------- */
    // 登录
    login(params) {
        return Http.post(`${baseUrl}${proxy}/login`, params);
    },
    // 登出
    loginout(params) {
        return Http.post(`${baseUrl}${proxy}/logout`, params);
    },
    // 用户列表
    getAccList() {
        return Http.get(`${baseUrl}${proxy}/userList`, );
    },
    // 注册用户
    addAcc(params) {
        return Http.post(`${baseUrl}${proxy}/signup`, params);
    },
    // 编辑账号 更改账号状态
    updateAcc(params) {
        return Http.post(`${baseUrl}${proxy}/update`, params);
    },
    // 删除账号
    delAcc(params) {
        return Http.post(`${baseUrl}${proxy}/userDelete`, params);
    },
    /**------------------------------------房源---------------------------------- */
    // 获取列表
    getList(params) {
        return Http.post(`${baseUrl}${proxy}/houseList`, params);
    },
    // 新增房源
    add(params) {
        return Http.post(`${baseUrl}${proxy}/houseAdd`, params);
    },
    // 更新
    update(params) {
        return Http.post(`${baseUrl}${proxy}/houseUpdate`, params);
    },
    // 删除
    del(params) {
        return Http.post(`${baseUrl}${proxy}/houseDelete`, params);
    },
    /**-----------------------------租客------------------------------- */
    // 获取租客列表
    getTenantList(params) {
        return Http.post(`${baseUrl}${proxy}/tenantList`, params);
    },
    // 新增租客
    createdTensnt(params) {
        return Http.post(`${baseUrl}${proxy}/tenantAdd`, params);
    },
    // 更新租客
    updateTenant(params) {
        return Http.post(`${baseUrl}${proxy}/tenantUpdate`, params);
    },
    // 删除租客
    delTenant(params) {
        return Http.post(`${baseUrl}${proxy}/tenantDelete`, params);
    },
    // 续租
    addDays(params) {
        return Http.post(`${baseUrl}${proxy}/addDays`, params);
    },
    /**---------------------小程序房源----------------------------- */
    // 获取列表
    getWXhouseList(params) {
        return Http.post(`${baseUrl}${proxy}/wxList`, params);
    },
    // 新增小程序房源
    createWXhouse(params) {
        return Http.post(`${baseUrl}${proxy}/wxAdd`, params);
    },
    // 更新小程序房源
    updateWXhouse(params) {
        return Http.post(`${baseUrl}${proxy}/wxUpdate`, params);
    },
     // 删除小程序房源
     delWXhouse(params) {
        return Http.post(`${baseUrl}${proxy}/wxDelete`, params);
    },
    /**-----------------------------公用------------------------------- */
    // 图片上传
    upload() {
        return `${baseUrl}/api/uploadImgs`
        // return `http://101.37.66.95:7001/api/uploadImgs`
    },
};