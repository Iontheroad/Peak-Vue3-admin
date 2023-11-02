<template>
  <el-upload
    class="avatar-uploader"
    :class="{ isHiddenUpload: isHiddenUpload }"
    ref="uploadImportEdit"
    name="file"
    action=""
    :file-list="fileUploadList"
    :multiple="isMultiple"
    :list-type="listType"
    :limit="isLimit"
    :accept="format"
    :http-request="uploadFile"
    :before-upload="beforeUpload"
    :before-remove="beforeRemove"
    :on-exceed="handleExceed"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-remove="handleRemove"
  >
    <!-- 上传框 -->
    <template v-slot:trigger>
      <div class="my">
        <el-icon><Plus /></el-icon>
      </div>
    </template>
  </el-upload>
</template>

<script>
// import { reqUpload } from "@/api/course";
import { Plus } from "@element-plus/icons-vue";
export default {
  name: "MyUpload",
  components: {
    Plus,
  },
  model: {
    prop: "fileUploadList",
    event: "update:fileUploadList",
  },
  props: {
    // 传入时数组有数据,其的数据格式必须是一下实例
    fileUploadList: {
      type: Array,
      default: () => [
        {
          // 数据格式
          name: "aa", // 文件名
          url: "http://119.91.22.164:8085/images/11567004462363663defaultBoy.png", // 地址
          uid: "1", // 上传的时间戳(id)
        },
      ],
    },
    isMultiple: {
      // 是否可选择多文件
      type: Boolean,
      default: () => false,
    },
    isLimit: {
      // 最大上传多少个
      type: Number,
      default: () => 2,
    },
    format: {
      //默认上传格式
      type: String,
      default: () => ".jpg,.png,.jpeg,.webp",
    },
    listType: {
      //上传格式
      type: String,
      // default: () => "picture",
      // default: () => "text",
      default: () => "picture-card",
    },
  },
  data() {
    return {};
  },
  computed: {
    // 是否隐藏上传框
    isHiddenUpload() {
      return this.fileUploadList.length == this.isLimit;
    },
  },
  methods: {
    /**
     * 上传之前
     * http-request : 该事件使用后, 上传成功和失败不会监听到
     */
    beforeUpload(file) {
      if (file.size / 1024 / 1024 > 2) {
        this.$message.warning("文件大小不能超过2MB!");
        return false;
      }
      return true;
    },

    /**
     * 上传事件
     */
    uploadFile(file) {
      let uid = file.file.uid;
      let name = file.file.name;
      let formData = new FormData();
      // for (let key in file) {
      //   formData.append(key, file[key]);
      // }
      formData.append("file", file.file);
      reqUpload(formData).then((res) => {
        console.log(res, "res"); // [url]
        // this.fileUploadList.push({ url: res.data[0], uid, name });
        this.$emit("update:fileUploadList", [
          ...this.fileUploadList,
          { url: res.data[0], uid, name },
        ]);
        return Promise.resolve("hhh");
      });
    },

    /**
     * 限制拦截: 验证数量等
     */
    handleExceed(file, fileList) {
      this.$message.warning(`当前项最多只能上传${this.isLimit}份文件!`);
      // let fileNum = file.length + fileList.length;
      // if (fileNum > this.isLimit) {
      //   this.$message.warning(`当前项最多只能上传${this.isLimit}份文件!`);
      // }
    },

    /**
     * 文件上传成功
     */
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList, "成功");
      console.log(this.fileUploadList);
    },

    /**
     * 文件上传失败
     */
    handleError(error, file, fileList) {
      console.log(error, file, fileList, "失败");
    },

    /**
     * 删除之前
     */
    async beforeRemove(file, fileList) {
      // console.log(file, fileList, "删除之前");
      let { name } = file;
      await this.$confirm(`此操作将永久删除图片: ${name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          return Promise.resolve("删除成功");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
          return Promise.reject("取消删除");
        });
    },

    /**
     * 删除完成之后
     */
    handleRemove(file, fileList) {
      // console.log(file, fileList, "删除之后");
      this.$emit("update:fileUploadList", fileList); // 剩余的数据重新赋值
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep.avatar-uploader {
  // 展示默认的上传图片
  // ul.el-upload-list.el-upload-list--picture-card {
  //   li.el-upload-list__item.is-success {
  //   }
  // }

  // 不用默认展示的图时,自定义展示图片,图片就在上传框里
  .el-upload.el-upload--picture-card {
    // 上传框
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    &:hover {
      border-color: #409eff;
    }

    // 加号图标
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    // 自定义的图片展示
    .avatar {
      display: flex;
      width: 100%;
      height: 100%;
      .avatarItem {
        flex-shrink: 0;
        border-radius: 6px;
        overflow: hidden;
        position: relative;
        width: 100%;
        height: 100%;
        transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
        img {
          width: 100%;
          height: 100%;
        }
        .mask {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          text-align: center;
          color: #fff;
          opacity: 0;
          cursor: pointer;
          font-size: 12px;
          background-color: rgba(0, 0, 0, 0.5);

          -webkit-transition: opacity 0.3s;
          transition: opacity 0.3s;
          z-index: 10;
          .del {
            font-size: 20px;
            color: white;
            cursor: pointer;
          }
        }
        &:hover {
          .mask {
            opacity: 1;
          }
        }
      }
    }
  }

  // 隐藏上传框
  &.isHiddenUpload {
    .el-upload.el-upload--picture-card {
      display: none;
    }
  }
}
</style>
