<template>
  <div class="edithoust">
    <h3 class="decoration">{{title}}</h3>
    <el-form ref="form" :model="form" label-width="120px" label-position="left" :rules="rules">
      <el-form-item label="房源标题" size="small" prop="name">
        <el-input v-model="form.name" placeholder="请输入标题" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="房源信息" size="small" prop="name">
        <el-input v-model="form.name" placeholder="例 : 小区-楼栋-房号-房间号" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="租价" size="small" prop="name">
        <el-input v-model="form.name" placeholder="请输入租价"></el-input>
      </el-form-item>
      <el-form-item label="面积" size="small" prop="name">
        <el-input v-model="form.name" placeholder="请输入房源面积"></el-input>
      </el-form-item>
      <el-form-item label="楼层" size="small" prop="name">
        <el-input v-model="form.name" placeholder="请输入房源楼层(层数/总楼层)"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" size="small">
        <el-input v-model="form.name" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="朝向" prop="location">
        <el-select v-model="form.name" placeholder="请选择朝向" clearable size="small">
          <el-option :value="item" v-for="item in towardList" :key="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房源位置" prop="location">
        <el-select
          v-model="form.name"
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
      <el-form-item label="房型" prop="roomLayout">
        <el-select
          v-model="form.roomLayout"
          placeholder="请选择或者输入房型"
          clearable
          filterable
          allow-create
          size="small"
        >
          <el-option :value="item" v-for="(item,index) in roomLayoutList" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="装修">
        <el-select v-model="form.name" placeholder="请选择装修类型" clearable size="small">
          <el-option value="毛坯"></el-option>
          <el-option value="简装"></el-option>
          <el-option value="精装"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房间亮点">
        <el-select
          v-model="form.name"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择房间亮点"
          size="small"
        >
          <el-option v-for="item in tags" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房间设施">
        <el-checkbox-group v-model="form.type">
          <el-checkbox
            :label="item.title"
            name="type"
            v-for="(item,index) in facilities"
            :key="index"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="承租类型">
        <el-radio-group v-model="form.name">
          <el-radio label="整租"></el-radio>
          <el-radio label="合租"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="承租周期">
        <el-radio-group v-model="form.name">
          <el-radio label="长期"></el-radio>
          <el-radio label="短期"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否上架">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="房源描述">
        <el-input type="textarea" v-model="form.desc" maxlength="300"></el-input>
      </el-form-item>
      <el-form-item label="上传视频">
        <el-upload list-type="picture-card" :limit="1">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload list-type="picture-card" :limit="10">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-row type="flex" justify="center" style="margin:30px 0">
        <el-button @click="$router.push('/smallsequence')">取消</el-button>
        <el-button type="primary" style="margin-left:50px" @click="onSubmit">确定</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import {mixiSequenceValidate} from '@/utils/validate';
export default {
  data() {
    return {
      mode: "",
      id: "",
      rules:mixiSequenceValidate,
      form: {
        name: "",
        delivery: true,
        type: [],
        desc: ""
      }
    };
  },

  methods: {
    init() {
      this.mode = this.$route.query.mode;
    },
    onSubmit() {
      this.$refs.form.validate(valid=>{
        console.log(valid);
      })
      console.log("submit!");
    }
  },
  computed: {
    title() {
      if (this.mode === "add") {
        return "新增房源";
      } else if (mode === "edit") {
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
}
</style>