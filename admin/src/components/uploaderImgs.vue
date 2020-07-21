<template>
  <div class="uploader-imgs">
    <el-upload
      ref="upload"
      :action="action"
      :headers="headers"
      list-type="picture-card"
      :before-upload="beforeAvatarUpload"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :limit="limit"
      :multiple="multiple"
      :class="[{heidden:imagesList.length >= limit}]"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
/**
 * 上传图片组件
 */
export default {
  props: {
    imagesList: {
      type: Array,
      default() {
        return [];
      }
    },
    limit: {
      type: Number,
      default: 10
    },
    multiple: {
      type: Boolean,
      default: true
    },
    action: {
      required: true,
      type: String,
      default: ""
    },
    headers: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  computed: {
    //   生成回显文件列表
    fileList() {
      if (this.imagesList && this.imagesList.length) {
        return this.imagesList.map(v => {
          let uid = this.createRandomUid();
          return { uid, url: v };
        });
      } else {
        return [];
      }
    }
  },
  methods: {
    //   生成随机uid
    createRandomUid() {
      return Math.random()
        .toString()
        .split(".")[1];
    },
    // 上传限制
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/gif" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传图片格式有误");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isJPG && isLt2M;
    },
    // 图片移除
    handleRemove(file, fileList) {
      this.$emit("imageRemove", file.url);
    },
    // 上传成功
    handleSuccess(res, file, fileList) {
      let url = res.data[0];
      //   延迟触发  防止多文件上传报错
      if (this.multiple) {
        setTimeout(() => {
          this.$emit("imageUpload", url);
        }, 1000);
      } else {
        this.$emit("imageUpload", url);
      }
    },
    // 图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 超过数量
    handleExceed() {
      this.$message.error("超过最大上传数量，请重新选择");
    }
  }
};
</script>

<style lang="less">
.uploader-imgs {
  .el-upload-list__item {
    transition: none !important;
  }
  .heidden {
    .el-upload--picture-card {
      display: none;
    }
  }
}
</style>