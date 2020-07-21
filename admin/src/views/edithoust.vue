<template>
  <div class="edithoust">
    <h3 class="decoration">{{title}}</h3>
    <el-form ref="form" :model="form" label-width="120px" label-position="left" :rules="rules">
      <el-form-item label="房源标题" size="small" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="房源信息" size="small">
        <el-input v-model="form.houseInfo" placeholder="例 : 小区-楼栋-房号-房间号" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="房源推荐等级" size="small" prop="houseRecommend">
        <el-input v-model="form.houseRecommend" placeholder="层级越大展示越靠前" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="租价" size="small" prop="rentPrice">
        <el-input v-model="form.rentPrice" placeholder="请输入租价"></el-input>
      </el-form-item>
      <el-form-item label="面积" size="small">
        <el-input v-model="form.houseArea" placeholder="请输入房源面积"></el-input>
      </el-form-item>
      <el-form-item label="楼层" size="small">
        <el-input v-model="form.houseFloor" placeholder="请输入房源楼层(层数/总楼层)"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" size="small" prop="agentPhone">
        <el-input v-model="form.agentPhone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="朝向" prop="orientation">
        <el-select v-model="form.orientation" placeholder="请选择朝向" clearable size="small">
          <el-option :value="item" v-for="item in towardList" :key="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房源位置" prop="location">
        <el-select
          v-model="form.location"
          placeholder="请选择房源位置"
          clearable
          size="small"
          filterable
          allow-create
          default-first-option
        >
          <el-option :value="item.value" v-for="item in regions" :key="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="户型" prop="roomLayout">
        <el-select
          v-model="form.houseType"
          placeholder="请选择或者输入户型"
          clearable
          filterable
          allow-create
          size="small"
        >
          <el-option :value="item" v-for="(item,index) in roomLayoutList" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="装修">
        <el-select v-model="form.renovation" placeholder="请选择装修类型" size="small">
          <el-option value="毛坯"></el-option>
          <el-option value="简装"></el-option>
          <el-option value="精装"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房间亮点">
        <el-select
          v-model="form.houseHighlights"
          multiple
          filterable
          allow-create
          clear
          default-first-option
          placeholder="请选择房间亮点"
          size="small"
        >
          <el-option v-for="item in tags" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房间设施">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <el-checkbox-group v-model="form.houseFloorAllocation" @change="handleCheckedCitiesChange">
          <el-checkbox
            :label="item.id"
            name="type"
            v-for="(item,index) in facilities"
            :key="index"
          >{{item.title}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="承租类型" prop="rentMode">
        <el-radio-group v-model="form.rentMode">
          <el-radio label="整租"></el-radio>
          <el-radio label="合租"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="承租周期" prop="rentPeriod">
        <el-radio-group v-model="form.rentPeriod">
          <el-radio label="长期"></el-radio>
          <el-radio label="短期"></el-radio>
          <el-radio label="不限"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否上架" prop="status">
        <el-switch v-model="form.status" active-value="1" inactive-value="0"></el-switch>
      </el-form-item>
      <el-form-item label="房源描述">
        <el-input type="textarea" v-model="form.houseDesc" maxlength="300"></el-input>
      </el-form-item>
      <el-form-item label="上传视频">
        <el-button
          v-if="form.houseVideo"
          type="danger"
          @click="removeVideo"
          size="small"
          class="margin_10"
        >移除视频</el-button>
        <uploaderVideo
          :videoSrc="form.houseVideo"
          :action="action"
          :headers="headers"
          @success="handleVideoSuccess"
        />
      </el-form-item>
      <el-form-item label="上传图片" prop="houseImgs">
        <uploaderImgs
          :imagesList="form.houseImgs"
          :action="action"
          :headers="headers"
          @imageUpload="imageUpload"
          @imageRemove="imageRemove"
        />
      </el-form-item>
      <el-row type="flex" justify="center" style="margin:30px 0">
        <el-button @click="$router.push('/smallsequence')">取消</el-button>
        <el-button type="primary" style="margin-left:50px" @click="onSubmit">确定</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mixiSequenceValidate } from "@/utils/validate";
import uploaderVideo from "@/components/uploaderVideo.vue";
import uploaderImgs from "@/components/uploaderImgs.vue";
import Http from "@/api/api";
export default {
  components: {
    uploaderVideo,
    uploaderImgs
  },
  data() {
    return {
      mode: "",
      id: "",
      action: Http.upload(), // 上传图片地址
      headers: { Authorization: localStorage.getItem("auth_token") },
      rules: mixiSequenceValidate,
      isIndeterminate: false,
      checkAll: false,
      form: {
        title: "",
        houseInfo: "",
        houseRecommend: "",
        rentPrice: "",
        houseArea: "",
        houseFloor: "",
        agentPhone: localStorage.getItem("userPhone"),
        orientation: "",
        location: "",
        houseType: "",
        renovation: "",
        houseHighlights: [],
        houseFloorAllocation: [],
        rentMode: "整租",
        rentPeriod: "长期",
        status: "1",
        houseDesc: "",
        houseVideo: "",
        houseImgs: []
      }
    };
  },

  methods: {
    init() {
      this.mode = this.$route.query.mode;
      if (this.mode === "edit") {
        let form = JSON.parse(localStorage.getItem("WXhouse"));
        form.houseFloorAllocation = JSON.parse(form.houseFloorAllocation);
        form.houseFloorAllocation = form.houseFloorAllocation.map(v => v.id);
        // 判断全选状态
        this.handleCheckedCitiesChange(form.houseFloorAllocation)
        form.houseImgs = JSON.parse(form.houseImgs);
        form.houseHighlights = JSON.parse(form.houseHighlights);
        this.form = form;
      }
    },
    // 全选
    handleCheckAllChange(val) {
      this.form.houseFloorAllocation = val
        ? this.facilities.map(v => v.id)
        : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.facilities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.facilities.length;
    },
    // 文件上传
    removeVideo() {
      this.form.houseVideo = "";
    },
    handleVideoSuccess(src) {
      this.form.houseVideo = src;
    },
    imageRemove(url) {
      this.form.houseImgs = this.form.houseImgs.filter(v => v !== url);
    },
    imageUpload(url) {
      this.form.houseImgs.push(url);
    },
    // 提交
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 处理参数
          let params = JSON.parse(JSON.stringify(this.form));
          params.houseHighlights = JSON.stringify(params.houseHighlights || []);
          // 处理房间设备列表
          let allocationList = [];
          params.houseFloorAllocation.forEach(id => {
            allocationList.push(this.facilities.find(v => v.id === id));
          });
          params.houseFloorAllocation = JSON.stringify(allocationList || []);
          params.houseImgs = JSON.stringify(params.houseImgs || []);
          params.houseRecommend = +params.houseRecommend;
          if (this.mode === "add") {
            this.createHouse(params);
          } else if (this.mode === "edit") {
            this.updateHouse(params);
          }
        } else {
          this.$message.error("请将信息填写完整");
        }
      });
    },
    // 新增房源
    createHouse(params) {
      Http.createWXhouse(params).then(res => {
        this.$message.success("房源添加成功");
        this.$router.push("/smallsequence");
      });
    },
    // 更新房源
    updateHouse(params) {
      Http.updateWXhouse(params).then(res => {
        this.$message.success("房源更新成功");
        this.$router.push("/smallsequence");
      });
    }
  },
  computed: {
    title() {
      if (this.mode === "add") {
        return "新增房源";
      } else if (this.mode === "edit") {
        return "编辑房源信息";
      } else {
        return "查看房源信息";
      }
    }
  }
};
</script>
<style scoped lang='less'>
.edithoust {
  h3 {
    padding-left: 30px;
    color: #409eff;
    margin: 15px 0;
  }
  .decoration {
    position: relative;
  }
  .decoration::before {
    content: "";
    position: absolute;
    left: 8px;
    height: 22px;
    width: 6px;
    background-color: #67c23a;
  }
  .el-form {
    width: 50%;
    margin-left: 30px;
  }
  video {
    width: 148px;
    height: 148px;
  }
}
</style>