<template>
  <el-upload
    class="video-upload"
    :action="action"
    :headers="headers"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :on-progress="handleProgress"
  >
    <p class="progress" v-show="isProgress">{{msg}}</p>
    <video v-if="videoSrc" :src="videoSrc" class="avatar" controls></video>
    <i v-if="!videoSrc&&!isProgress" class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
/**
 * 上传视频组件
 */
export default {
  props: {
    videoSrc: {
      type: String,
      default: ""
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
      isProgress: false,
      msg: "视频上传中",
      tmperId:null
    };
  },
  methods: {
    beforeAvatarUpload(file) {
      var fileSize = file.size / 1024 / 1024 < 70;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov"
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!fileSize) {
        this.$message.error("视频大小不能超过70MB");
        return false;
      }
      this.msgChange()
      return true;
    },

    handleProgress(event, file, fileList) {
      this.isProgress = true;
    },
    handleAvatarSuccess(res, file) {
      this.isProgress = false;
      clearInterval(this.tmperId)
      if (res.code === 0 || res.code === 200) {
        this.$emit("success", res.data[0]);
      } else {
        this.$message.error("视频上传失败");
      }
    },
    msgChange(){
      this.tmperId = setInterval(() => {
        this.msg+='.'
        if(this.msg.length> 8){
          this.msg = '视频上传中'
        }
      }, 700);
    }
  },
  beforeDestroy(){
    clearInterval(this.tmperId)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
.video-upload {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    max-height: 178px;
    display: block;
  }
  .progress {
    width: 178px;
    height: 178px;
    line-height: 176px;
    text-align: center;
    font-size: 22px;
    font-weight: 700;
  }
}
</style>
