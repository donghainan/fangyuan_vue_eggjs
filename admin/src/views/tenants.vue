<template>
  <div class="tenants">
    <div class="add">
      <el-button type="primary" size="small" @click="addTenants">新增租客</el-button>
    </div>
    <el-table :data="tentanList" style="width: 100%" stripe border>
      <el-table-column label="序号" type="index" :index="indexMethod" width="50px" align="center"></el-table-column>
      <el-table-column prop="room_name" label="房间信息" align="center" width="160px"></el-table-column>
      <el-table-column prop="user_name" label="承租人" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center" width="120px"></el-table-column>
      <el-table-column prop="money" label="租金" align="center"></el-table-column>
      <el-table-column prop="deposit" label="押金" align="center"></el-table-column>
      <el-table-column prop="pay_type" label="支付方式" align="center"></el-table-column>
      <el-table-column prop="startTime" label="起租日期" align="center" width="110px">
        <template slot-scope="scope">
          <span>{{scope.row.startTime | formatDate('YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="stopTime" label="到租日期" align="center" width="110px">
        <template slot-scope="scope">
          <span>{{scope.row.stopTime | formatDate('YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同剩余天数" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.stopTime< new Date()" :class="['danger']">合同已过期</span>
          <span v-else>{{Math.floor((scope.row.stopTime-new Date() )/(24*60*60*1000)) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="租金剩余天数" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.giveTime< new Date()" :class="['danger','warning']">租金已到期</span>
          <span
            v-else
            :class="{warning:Math.floor((scope.row.giveTime-new Date() )/(24*60*60*1000)) <= scope.row.attention_day}"
          >{{Math.floor((scope.row.giveTime-new Date() )/(24*60*60*1000)) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remarks" label="备注" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="270">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" @click="increaseDate(scope.row.id)" class="ml30">续租</el-button>
          <el-button type="danger" size="mini" @click="delTenant(scope.row.id)" class="ml30">解约</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchForm.page"
        :page-sizes="[20, 50, 100, 400, 1000, 2000]"
        :page-size="searchForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </div>
    <!-- 用户选择模态框 -->
    <el-dialog
      title="选择用户"
      :visible.sync="userSelectDialogVisible"
      width="50%"
      :close-on-click-modal="false"
      @close="selectUserClose"
    >
      <el-select v-model="searchForm.user_id" placeholder="请选择用户">
        <el-option :label="item.username" :value="item.id" v-for="item in userList" :key="item.id"></el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userSelectDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="userSelectDialogVisible=false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增租客模态框 -->
    <el-dialog
      title="租客信息"
      :visible.sync="tenantsDialogVisible"
      width="80%"
      :close-on-click-modal="false"
      @close="close"
    >
      <el-form
        :model="tenantsForm"
        :rules="rules"
        ref="tenantsForm"
        label-width="120px"
        size="small"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="房源位置" prop="location">
              <el-select v-model="tenantsForm.location" placeholder="请选择房源位置" clearable>
                <el-option
                  :label="item.label"
                  :value="item.loctionId"
                  v-for="item in regions"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="楼栋号" prop="floor">
              <el-select
                v-model="tenantsForm.floor"
                placeholder="请选择楼栋"
                clearable
                no-data-text="请先选择小区"
                filterable
                allow-create
              >
                <el-option :label="item+'栋'" :value="item+''" v-for="item in floorList" :key="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房号" prop="roomNo">
              <el-input v-model="tenantsForm.roomNo" placeholder="请输入房号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房间号" prop="room">
              <el-select
                v-model="tenantsForm.room"
                placeholder="请选择房间"
                clearable
                filterable
                allow-create
              >
                <el-option
                  :label="item"
                  :value="item"
                  v-for="(item,index) in roomList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承租人" prop="user_name">
              <el-input v-model="tenantsForm.user_name" placeholder="请输入承租人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系方式" prop="phone">
              <el-input v-model="tenantsForm.phone" placeholder="请输入联系方式"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="押金(元)" prop="deposit">
              <el-input v-model="tenantsForm.deposit" placeholder="请输入押金"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="租金(元)" prop="money">
              <el-input v-model="tenantsForm.money" placeholder="请输入租金"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="支付方式" prop="pay_type">
              <el-select v-model="tenantsForm.pay_type" placeholder="请选择支付方式">
                <el-option value="押一付一"></el-option>
                <el-option value="押一付二"></el-option>
                <el-option value="押一付三"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同周期" prop="startTime">
              <el-date-picker
                style="width:100%"
                v-model="contractDate"
                type="daterange"
                range-separator="至"
                start-placeholder="起租日期"
                end-placeholder="到租日期"
                @change="dateChange"
                :disabled="mode !== 'add'"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="剩余提醒天数" prop="attention_day">
              <el-input v-model="tenantsForm.attention_day" placeholder="请输入租金"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remarks" style="width:70%" class="beizhu">
              <el-input
                maxlength="200"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="tenantsForm.remarks"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="合同剩余天数 :">
              <span>{{daysToContract}} 天</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="mode != 'add'">
            <el-form-item label="租金剩余天数 :">
              <span v-if="tenantsForm.giveTime< new Date()" :class="['danger']">租金已到期</span>
              <span v-else>{{Math.floor((tenantsForm.giveTime-new Date() )/(24*60*60*1000)) }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tenantsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { tenantsValidate } from "@/utils/validate";
import Http from "@/api/api";
export default {
  data() {
    return {
      mode: "",
      searchForm: {
        user_id: +localStorage.getItem("userId"),
        page: 1,
        size: 20
      },
      tentanList: [],
      userSelectDialogVisible: false,
      userList: [],
      //   新增租客
      id: "",
      tenantsDialogVisible: false,
      tenantsForm: {
        location: "", // 小区
        floor: "", // 楼栋
        roomNo: "", // 房间号
        room: "", //  房间
        user_name: "", // 租客姓名
        phone: "", //联系方式
        deposit: "", //押金
        money: "", //租金
        pay_type: "", // 支付方式
        remarks: "", //备注信息
        startTime: "", //起租日期
        stopTime: "", // 终止日期
        attention_day: "7" // 剩余提醒天数
      },
      rules: tenantsValidate,
      contractDate: []
    };
  },

  methods: {
    init() {
      //   一级用户拥有选择权
      if (localStorage.getItem("Accesslevel") === "0") {
        this.getUserList();
      } else {
        this.getList();
      }
    },
    //   获取用户列表
    getUserList() {
      Http.getAccList().then(res => {
        if (res.data && res.data.code === 0) {
          this.userList = res.data.data;
          this.userSelectDialogVisible = true;
        }
      });
    },
    // 获取租客列表
    getList() {
      Http.getTenantList(this.searchForm).then(res => {
        let { count, result = [] } = res.data.data;
        this.total = count;
        this.tentanList = result;
      });
    },
    // 租期变化
    dateChange(value) {
      if (value) {
        this.tenantsForm.startTime = +value[0];
        this.tenantsForm.stopTime = +value[1];
      } else {
        this.tenantsForm.startTime = "";
        this.tenantsForm.stopTime = "";
      }
    },
    // 编辑当前信息
    edit(row) {
      this.mode = "edit";
      Object.assign(this.tenantsForm, row);
      this.id = row.id;
      let info = row.room_name.split("--");
      this.tenantsForm.location = info[0] || "";
      this.tenantsForm.floor = info[1] || "";
      this.tenantsForm.roomNo = info[2] || "";
      this.tenantsForm.room = info[3] || "";
      this.contractDate = [new Date(+row.startTime), new Date(+row.stopTime)];
      this.tenantsDialogVisible = true;
    },
    // 新增租客信息
    addTenants() {
      this.mode = "add";
      this.tenantsDialogVisible = true;
      this.tenantsForm = {
        location: "", // 小区
        floor: "", // 楼栋
        roomNo: "", // 房间号
        room: "", //  房间
        user_name: "", // 租客姓名
        phone: "", //联系方式
        deposit: "", //押金
        money: "", //租金
        pay_type: "", // 支付方式
        remarks: "", //备注信息
        startTime: "", //起租日期
        stopTime: "", // 终止日期
        attention_day: "7" // 剩余提醒天数
      };
      this.contractDate = [];
      this.$nextTick(() => {
        this.$refs.tenantsForm.clearValidate();
      });
    },
    // 删除租客信息
    delTenant(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Http.delTenant({ id }).then(res => {
            this.$message.success("解约成功");
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    // 续租
    increaseDate(id) {
      this.$confirm("确认要将此租客续租吗?, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Http.addDays({ id }).then(res => {
            this.$message.success("续租操作成功");
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    // 用户选择模态框关闭
    selectUserClose() {
      this.getList();
    },
    save() {
      this.$refs.tenantsForm.validate(valid => {
        if (valid) {
          let {
            user_name,
            phone,
            money,
            pay_type,
            startTime,
            stopTime,
            remarks,
            attention_day,
            deposit
          } = this.tenantsForm;
          let params = {
            current_add_id: +localStorage.getItem("userId"),
            room_name: this.room_info,
            user_name,
            phone,
            deposit: +deposit,
            money,
            remarks,
            pay_type,
            attention_day,
            startTime: startTime + "",
            stopTime: stopTime + ""
          };

          if (this.mode == "add") {
            this.createdTensnt(params);
          } else if (this.mode == "edit") {
            this.updateTenant(params);
          }
        } else {
          this.$message.error("请将信息填写完整");
          return false;
        }
      });
    },
    // 模态框关闭
    close() {
      this.$refs.tenantsForm.resetFields();
      this.getList();
    },
    // 新增租客
    createdTensnt(params) {
      Http.createdTensnt(params).then(res => {
        this.$message.success("租客信息添加成功");
        this.tenantsDialogVisible = false;
      });
    },
    // 更新租客信息
    updateTenant(params) {
      params.id = this.id;
      Http.updateTenant(params).then(res => {
        this.$message.success("租客信息更新成功");
        this.tenantsDialogVisible = false;
      });
    }
  }
};
</script>
<style scoped lang='less'>
.pagination {
  text-align: right;
  padding-top: 20px;
}
.beizhu {
  width: 100%;
}
.beizhu /deep/ .el-form-item__content {
  width: 100%;
}
.danger {
  color: #f56c6c;
}
.ml30 {
  margin-left: 30px !important;
}
</style>
<style >
.warning {
  position: absolute;
  width: 100%;
  text-align: center !important;
  top: 20px;
  left: 5px;
  color: red;
  animation: fontSizeTrans 2s infinite;
}
@keyframes fontSizeTrans {
  form {
    transform: scale(1);
  }
  to {
    transform: scale(1.7);
  }
}
@-webkit-keyframes fontSizeTrans {
  form {
    transform: scale(1);
  }
  to {
    transform: scale(1.8);
  }
}
</style>