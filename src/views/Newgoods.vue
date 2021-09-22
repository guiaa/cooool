<template>
<div>
  <el-form :rules="rules" style="width:70rem" :model="form">
    <el-form-item label="商品名称" :label-width="formLabelWidth" prop="tradename">
      <el-input v-model="form.tradename"></el-input>
    </el-form-item>
    <el-form-item label="商品价格" :label-width="formLabelWidth" prop="price">
      <el-input v-model="form.price"></el-input>
    </el-form-item>
    <el-form-item label="商品类别" :label-width="formLabelWidth" prop="class1">
      <el-input v-model="form.class1"></el-input>
    </el-form-item>
    <el-form-item label="商品介绍" :label-width="formLabelWidth" prop="indro">
      <el-input v-model="form.indro" type="textarea" :rows="3"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer" style="margin-left:20rem">
    <el-upload
    ref="upload"
  class="avatar-uploader"
  action="http://127.0.0.1:3000/upload"
  :headers="headers"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  :auto-upload="false">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitUpload(form)">确 定</el-button>
  </div>
  </div>
</template>
<script>
export default {
  name: 'Newgoods',
  // components: {
  //   Login
  // },
  data () {
    return {
      // dialogFormVisible: false,
      form: {
        tradename: '',
        price: '',
        indro: '',
        class1: ''
      },
      formLabelWidth: '120px',
      // 上传图片参数
      imageUrl: '',
      rules: {
        tradename: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        indro: [
          { required: true, message: '请输入介绍', trigger: 'blur' }
        ],
        class1: [
          { required: true, message: '请输入类别', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    headers () {
      return {
        Authorization: 'Bearer ' + localStorage.getItem('token') // 直接从本地获取token就行
      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(res)
      this.$axios.post('newtrade', { tradename: this.form.tradename, price: this.form.price, indro: this.form.indro, class: this.form.class1, imgpath: res.data.path }).then(val => {
        this.$message.success({ duration: 1000, message: val.data.msg })
      })
    },
    submitUpload (form) {
      this.$refs.upload.submit()
    },
    beforeAvatarUpload (file) {
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      // return isJPG && isLt2M
      return isLt2M
    }
  }
}
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
