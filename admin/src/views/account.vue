<template>
  <div class="account">
    <div class="btns">
      <el-button type="primary" @click="add" v-if="Accesslevel === '0'">注册账号</el-button>
    </div>
    <el-table
      :data="accountList"
      stripe
      style="width: 100%;"
      :row-class-name="tableRowClassName"
      max-height="700"
    >
      <el-table-column prop="username" label="账号名"></el-table-column>
      <el-table-column prop="type" label="用户权限等级">
        <template slot-scope="scope">
          <span v-if="scope.row.type === 0 ">一级用户</span>
          <span v-if="scope.row.type === 1 ">二级用户</span>
          <span v-if="scope.row.type === 2 ">三级用户</span>
        </template>
      </el-table-column>
      <el-table-column prop="delFlag" label="账号状态">
        <template slot-scope="scope">
          {{
          scope.row.delFlag === 0 ? '启用' : '禁用'
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
        v-if="Accesslevel === '0'"
        align="center"
        min-width="210px"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editPwd(scope.row)">编辑账号</el-button>
          <el-button
            v-if="scope.row.delFlag === 0 && scope.row.username !== 'fanxiaohu'"
            type="danger"
            size="mini"
            @click="changeDelFalg(scope.row)"
          >禁用此账户</el-button>
          <el-button
            v-if="scope.row.delFlag === 1"
            type="success"
            size="mini"
            @click="changeDelFalg(scope.row)"
          >启用此账户</el-button>
          <el-button
            type="danger"
            size="mini"
            v-if="scope.row.username !== 'fanxiaohu'"
            @click="del(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" @close="close">
      <el-form :model="row" label-width="100px" :rules="rules" ref="info">
        <el-form-item label="账户权限 :" prop="type">
          <el-select
            v-model="row.type"
            placeholder="请选择用户权限等级"
            :disabled="row.username === 'fanxiaohu'"
          >
            <el-option :value="0" label="一级用户"></el-option>
            <el-option :value="1" label="二级用户"></el-option>
            <el-option :value="2" label="三级用户"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账户名 :" prop="username">
          <el-input v-model="row.username" autocomplete="off" :disabled="mode === 'edit'"></el-input>
        </el-form-item>
        <el-form-item :label="mode == 'add' ? '密码 :' : '新密码 :'" prop="password">
          <el-input v-model="row.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="手机号 :" prop="phone">
          <el-input v-model="row.phone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Http from "@/api/api";
export default {
  data() {
    return {
      // 用户等级
      Accesslevel: localStorage.getItem("Accesslevel"),
      // username: localStorage.getItem("userName"),
      accountList: [],
      mode: "",
      row: {
        type: 1,
        username: "",
        password: "",
        phone: ""
      },
      dialogFormVisible: false,
      rules: {
        type: [
          { required: true, message: "请选择用户权限等级", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入账户名", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "账户名最少5位,最多20位",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "密码最少5位,最多20位",
            trigger: "blur"
          }
        ],
        phone: [
          {
            pattern: /^1[2-9][0-9]{9}$/,
            message: "手机号格式错误",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getAccList();
  },
  methods: {
    // 账号列表
    getAccList() {
      this.accountList = [];
      Http.getAccList().then(res => {
        if (res.data && res.data.code === 0) {
          this.accountList = res.data.data;
        }
      });
    },
    // 编辑账号
    editPwd(row) {
      this.mode = "edit";
      this.row.username = row.username;
      this.row.type = row.type;
      this.row.phone = row.phone;
      this.dialogFormVisible = true;
    },
    // 注册账号
    add() {
      this.mode = "add";
      this.row = {
        type: 1,
        username: "",
        password: "",
        phone: ""
      };
      this.dialogFormVisible = true;
    },
    // 切换账号状态
    changeDelFalg(row) {
      this.$confirm("此操作将更改当前用户状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let { id, type, username, delFlag, phone } = row;
          delFlag = row.delFlag == 0 ? 1 : 0;
          Http.updateAcc({ id, type, username, delFlag, phone }).then(res => {
            if (res.data && res.data.code == 0) {
              this.$message({
                type: "success",
                message: "状态修改成功!"
              });
              this.getAccList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    // 确认按钮
    save() {
      this.$refs.info.validate(valid => {
        if (valid) {
          if (this.mode == "add") {
            this.addAcc();
          } else if (this.mode == "edit") {
            this.updateAcc();
          }
        }
      });
    },
    // 注册用户
    addAcc() {
      Http.addAcc(this.row).then(res => {
        if (res.data && res.data.code === 0) {
          this.$message.success("用户注册成功");
          this.dialogFormVisible = false;
          this.getAccList();
        }
      });
    },
    // 更新用户
    updateAcc() {
      Http.updateAcc(this.row).then(res => {
        if (res.data && res.data.code === 0) {
          this.$message.success("用户信息修改成功");
          this.dialogFormVisible = false;
          this.getAccList();
        }
      });
    },
    // 删除用户
    del(row) {
      this.$confirm("此操作将删除当前账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let { id } = row;
          Http.delAcc({ id }).then(res => {
            if (res.data && res.data.code == 0) {
              this.$message({
                type: "success",
                message: "账号删除成功!"
              });
              this.getAccList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    close() {
      this.row = {
        type: 1,
        username: "",
        password: "",
        phone: ""
      };
      this.$refs.info.clearValidate();
    },
    tableRowClassName(row, rowIndex) {
      let delFlag = row.row.delFlag;
      if (delFlag === 0) {
        return "success-row";
      } else if (delFlag === 1) {
        return "warning-row";
      }
      return "";
    }
  }
};
</script>
<style lang="less" scoped>
.el-select {
  width: 100%;
}
</style
>>
