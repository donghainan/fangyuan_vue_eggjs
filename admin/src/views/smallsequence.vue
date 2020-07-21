<template>
  <div class="smallsequence">
    <!-- 搜索 -->
    <el-card class="box-card">
      <el-form class="searchForm" :model="searchForm" label-width="100px" size="small">
        <el-row>
          <el-col :span="spanSize">
            <el-form-item label="房源位置 :">
              <el-select v-model="searchForm.location" placeholder="请选择房源位置" clearable>
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in regions"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="spanSize">
            <el-form-item label="承租方式">
              <el-select v-model="searchForm.rentMode" placeholder="请选择承租方式" clearable>
                <el-option value="整租"></el-option>
                <el-option value="合租"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="spanSize">
            <el-form-item label="承租周期">
              <el-select v-model="searchForm.rentPeriod" placeholder="请选择承租周期" clearable>
                <el-option value="长期"></el-option>
                <el-option value="短期"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="spanSize">
            <el-form-item label="上下架状态">
              <el-select v-model="searchForm.status" placeholder="请选择上下架状态" clearable>
                <el-option value="1" label="上架"></el-option>
                <el-option value="0" label="下架"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="spanSize">
            <el-form-item label="租价(元/月) :">
              <el-input v-model="searchForm.rentPrice" placeholder="请输入房源租价" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="spanSize">
            <el-form-item label="房源编号 :">
              <el-input v-model="searchForm.houseNo" placeholder="请输入房源编号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" size="small" @click="searchList">搜索</el-button>
              <el-button size="small" @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 列表 -->
    <el-card class="box-card">
      <el-button type="primary" size="small" @click="addWXhouse">新增</el-button>
      <!-- 列表 -->
      <el-table :data="list" stripe border max-height="800">
        <el-table-column label="序号" type="index" :index="indexMethod" width="50" align="center"></el-table-column>
        <el-table-column prop="location" label="位置" align="center"></el-table-column>
        <el-table-column prop="houseInfo" label="房源信息" align="center" width="160px"></el-table-column>
        <el-table-column prop="houseNo" label="房源编号" align="center"></el-table-column>
        <el-table-column prop="houseRecommend" label="推荐等级" align="center"></el-table-column>
        <el-table-column prop="renovation" label="装修" align="center"></el-table-column>
        <el-table-column prop="houseArea" label="面积" align="center"></el-table-column>
        <el-table-column prop="rentMode" label="承租类型" align="center"></el-table-column>
        <el-table-column prop="rentPeriod" label="出租周期" align="center"></el-table-column>
        <el-table-column prop="rentPrice" label="租价(元/月)" align="center"></el-table-column>
        <el-table-column prop="houseImgs" label="缩略图" align="center">
          <template slot-scope="scope">
            <img :src="JSON.parse(scope.row.houseImgs)[0]" alt="图片加载失败" height="40" />
          </template>
        </el-table-column>
        <el-table-column label="上下架状态" align="center" width="100px">
          <template slot-scope="scope">
            <el-switch
              :value="scope.row.status"
              active-value="1"
              inactive-value="0"
              @change="changeStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="170px" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editWXhouse(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="delWXhouse(scope.row)">删除</el-button>
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
    </el-card>
  </div>
</template>
<script>
import Http from "@/api/api";
export default {
  data() {
    return {
      searchForm: {
        location: "",
        rentMode: "",
        rentPeriod: "",
        status: "",
        rentPrice: "",
        houseNo: "",
        isWx: 0,
        page: 1,
        size: 20
      },
      list: []
    };
  },
  methods: {
    // 初始化
    init() {
      this.getList();
    },
    // 获取列表
    getList() {
      Http.getWXhouseList(this.searchForm).then(res => {
        this.list = res.data.data.result;
        this.total = res.data.data.count;
      });
    },
    //   重置
    reset() {
      this.searchForm = {
        location: "",
        rentMode: "",
        rentPeriod: "",
        status: "",
        rentPrice: "",
        houseNo: "",
        isWx: 0,
        page: 1,
        size: 20
      };
    },
    // 新增
    addWXhouse() {
      this.$router.push({
        path: "/edithoust",
        query: {
          mode: "add"
        }
      });
    },
    // 编辑
    editWXhouse(row) {
      localStorage.setItem("WXhouse", JSON.stringify(row));
      this.$router.push({
        path: "/edithoust",
        query: {
          mode: "edit"
        }
      });
    },
    // 删除
    delWXhouse(row) {
      // return;
      let { id } = row;
      this.$confirm("此操作将永久删除该房源, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Http.delWXhouse({ id }).then(res => {
            this.getList()
            this.$message({
              type: "success",
              message: "房源删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    // 上下架
    changeStatus(row) {
      let { status } = row;
      let msg = status == "1" ? "下架" : "上架";
      this.$confirm(`确定要将此房源${msg}吗?, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = JSON.parse(JSON.stringify(row))
          params.status = params.status == "1" ? "0" : "1";
          Http.updateWXhouse(params).then(res => {
            this.getList();
            this.$message({
              type: "success",
              message: `房源${msg}成功`
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    }
  }
};
</script>
<style scoped>
.el-card {
  margin-bottom: 30px;
}
.pagination {
  text-align: right;
  padding-top: 20px;
}
</style>