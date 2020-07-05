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
            <el-form-item label="装修">
              <el-select v-model="searchForm.renovation" placeholder="请选择装修类型" clearable>
                <el-option value="毛坯"></el-option>
                <el-option value="简装"></el-option>
                <el-option value="精装"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="spanSize">
            <el-form-item label="承租方式">
              <el-select v-model="searchForm.renovation" placeholder="请选择承租方式" clearable>
                <el-option value="整租"></el-option>
                <el-option value="合租"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="spanSize">
            <el-form-item label="承租周期">
              <el-select v-model="searchForm.renovation" placeholder="请选择承租周期" clearable>
                <el-option value="长租"></el-option>
                <el-option value="短租"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="spanSize">
            <el-form-item label="上下架状态">
              <el-select v-model="searchForm.renovation" placeholder="请选择上下架状态" clearable>
                <el-option value="上架"></el-option>
                <el-option value="下架"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="spanSize">
            <el-form-item label="租价(元) :">
              <el-input v-model="searchForm.rental" placeholder="请输入房源租价" clearable></el-input>
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
      <el-button type="primary" size="small" @click="add">新增</el-button>
      <!-- 列表 -->
      <el-table :data="list" stripe border max-height="800">
        <el-table-column label="序号" type="index" :index="indexMethod" width="50" align="center"></el-table-column>
        <el-table-column prop="location" label="位置" align="center"></el-table-column>
        <el-table-column prop="floor" label="房源信息" align="center"></el-table-column>
        <el-table-column prop="renovation" label="装修" align="center"></el-table-column>
        <el-table-column prop="area" label="面积" align="center"></el-table-column>
        <el-table-column prop="area" label="承租类型" align="center"></el-table-column>
        <el-table-column prop="area" label="出租周期" align="center"></el-table-column>
        <el-table-column prop="rental" label="租价(元/月)" align="center"></el-table-column>
        <el-table-column prop="imgUrl" label="缩略图" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.src" alt="图片加载失败" height="40" />
          </template>
        </el-table-column>
        <el-table-column label="上下架状态" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.id"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="210" align="center">
          <template slot-scope="scope">
            <el-button size="mini">查看</el-button>
            <el-button
              type="primary"
              size="mini"
              @chilk="$router.push('/edithoust?mode=edit&id='+scope.row.id)"
            >编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
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
        status: "",
        floor: "",
        roomNum: "",
        renovation: "",
        rental: "",
        price: "",
        page: 1,
        size: 20
      },
      list: []
    };
  },
  methods: {
    init() {
      this.getList();
    },
    getList() {
      Http.getList(this.searchForm).then(res => {});
    },
    //   重置
    reset() {},

    // 新增
    add() {
      this.$router.push({
        path: "edithoust",
        query: {
          mode: "add"
        }
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