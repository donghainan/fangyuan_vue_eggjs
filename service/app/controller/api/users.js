"use strict";

const Controller = require("egg").Controller;
const rule = {
  id: {
    type: "number",
    required: true,
  },
  username: {
    type: "string",
    required: true,
  },
  password: {
    type: "password",
    required: false,
  },
  type: {
    type: "number",
    required: true,
  },
  delFlag: {
    type: "number",
    required: false,
  },
  phone: {
    type: "string",
    required: false,
  },
};
class Users extends Controller {
  async login() {
    const { ctx } = this;
    ctx.validate(
      {
        username: rule.username,
        password: rule.password,
        phone: rule.phone
      },
      ctx.request.body
    );
    const { username, password, phone } = ctx.request.body;
    const pwdHash = ctx.helper.cryptPwd(password);
    const userInstance = await ctx.service.users.findOne(username);
    if (!userInstance) {
      const { USER_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(USER_NOT_FOUND.code, USER_NOT_FOUND.msg);
      return;
    }
    if (userInstance.delFlag === 1) {
      const { USER_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(USER_NOT_FOUND.code, USER_NOT_FOUND.msg);
      return;
    }
    if (userInstance.password === pwdHash) {
      // 登录成功
      // 生成auth_token
      const auth_token = ctx.helper.generateToken(
        { username: userInstance.username },
        this.config.loginTokenTime
      );
      // 将auth_token设置到session中
      ctx.session.token = auth_token;
      ctx.helper.$success({
        auth_token,
        expires: this.config.loginTokenTime,
        type: userInstance.type,
        id: userInstance.id,
        phone: userInstance.phone
      });
    } else {
      // 登录失败
      const { PASSWORD_ERROR } = this.config.errors;
      ctx.helper.$fail(PASSWORD_ERROR.code, PASSWORD_ERROR.msg);
      return;
    }
  }
  // 退出登录
  async logout() {
    const { ctx } = this;
    // 删除email对应的auth_token
    ctx.session.token = null;
    ctx.helper.$success();
  }

  // 注册
  async signup() {
    const { ctx } = this;
    ctx.validate(
      {
        username: rule.username,
        password: rule.password,
        type: rule.type,
        phone: rule.phone
      },
      ctx.request.body
    );
    const queryParams = ctx.request.body || {};
    if (JSON.stringify(queryParams) === "{}") {
      const { INVALID_PARAM } = this.config.errors;
      ctx.helper.$fail(INVALID_PARAM.code, INVALID_PARAM.msg);
      return;
    }
    const { username, password, type, phone } = ctx.request.body;
    // 对密码进行hash处理
    const pwdHash = ctx.helper.cryptPwd(password);
    // 调用service层处理数据
    const userInstance = await ctx.service.users.create({
      username,
      password: pwdHash,
      type,
      phone,
      delFlag: 0,
    });
    const userInfo = {
      id: userInstance.id,
      username: userInstance.username,
      type: userInstance.type,
      phone: userInfoInstance.phone,
      delFlag: userInstance.delFlag,
    };
    const userInfoInstance = await ctx.service.users.createOrUpdate(userInfo);
    ctx.helper.$success(userInfoInstance);
  }
  // 修改用户信息
  // 更新密码
  async updatePwd() {
    const { ctx } = this;
    ctx.validate(
      {
        username: rule.username,
        password: rule.password,
        delFlag: rule.delFlag,
        type: rule.type,
        phone: rule.phone
      },
      ctx.request.body
    );
    const { username, password, delFlag, type, phone } = ctx.request.body;
    // 对密码进行hash处理
    let pwdHash;
    if (password) {
      pwdHash = ctx.helper.cryptPwd(password);
    }
    const userInstance = await ctx.service.users.findOne(username);
    if (!userInstance) {
      const { USER_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(USER_NOT_FOUND.code, USER_NOT_FOUND.msg);
      return;
    }
    let user = {};
    if (password) {
      user = {
        delFlag,
        username,
        password: pwdHash,
        type,
        phone
      };
    } else {
      user = {
        delFlag,
        username,
        type,
        phone
      };
    }
    await userInstance.update(user);
    ctx.helper.$success(userInstance);
  }
  async userList() {
    const { ctx } = this;
    const userList = await ctx.service.users.findAll();
    ctx.helper.$success(userList);
  }
  // 删除用户
  async userDelete() {
    const { ctx } = this;
    ctx.validate(
      {
        id: rule.id,
      },
      ctx.request.body
    );
    const userInstance = await ctx.service.users.findById(ctx.request.body.id);
    console.log(userInstance);
  }
}
module.exports = Users;
