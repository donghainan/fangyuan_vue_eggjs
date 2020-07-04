import Http from "@/utils/axios";
let env = process.env.NODE_ENV === 'development'
const proxy =  "/api"
const baseUrl = ''
export default {
    /**------------------------------------用户---------------------------------- */
    // 登录
    login(params) {
        return Http.post(`${proxy}${baseUrl}/login`, params);
    },
    // 登出
    loginout(params) {
        return Http.post(`${proxy}${baseUrl}/logout`, params);
    },
    // 用户列表
    getAccList(){
        return Http.get(`${proxy}${baseUrl}/userList`,);
   },
    // 注册用户
    addAcc(params){
         return Http.post(`${proxy}${baseUrl}/signup`, params);
    },
    // 编辑账号 更改账号状态
    updateAcc(params) {
        return Http.post(`${proxy}${baseUrl}/update`, params);
    },
    // 删除账号
    delAcc(params){
        return Http.post(`${proxy}${baseUrl}/userDelete`, params);
    },
    /**------------------------------------房源---------------------------------- */
    // 获取列表
    getList(params) {
        return Http.post(`${proxy}${baseUrl}/houseList`, params);
    },
    // 新增房源
    add(params) {
        return Http.post(`${proxy}${baseUrl}/houseAdd`, params);
    },
    // 更新
    update(params) {
        return Http.post(`${proxy}${baseUrl}/houseUpdate`, params);
    },
    // 删除
    del(params) {
        return Http.post(`${proxy}${baseUrl}/houseDelete`, params);
    },
    /**-----------------------------公用------------------------------- */
    // 图片上传
    upload() {
        // let url = location.origin+'/api/uploadImgs'
        // return env? `http://106.15.238.134:7001/api/uploadImgs`:url
        return `http://www.jsdong.top:7001/api/uploadImgs`
    },
};