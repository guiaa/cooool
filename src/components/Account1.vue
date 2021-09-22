<template>
  <el-form style="margin-top: 5rem" ref="userval" :model="form" :rules="rule1">
    <el-form-item label="修改用户名" style="width: 50rem"  prop="user">
      <el-input placeholder="请输入用户名" v-model="form.user">
        <i slot="prefix" class="el-icon-user-solid"></i>
      </el-input>
    </el-form-item>
    <el-form-item label="手机号" style="width: 50rem" prop="phone">
      <el-input placeholder="请输入手机号" v-model="form.phone">
        <i slot="prefix" class="el-icon-phone"></i>
      </el-input>
    </el-form-item>
    <el-form-item label="收货地址" style="width: 50rem" prop="address">
      <el-input :rows="3" type="textarea" placeholder="请输入收货地址" v-model="form.address">
      </el-input>
    </el-form-item>
    <el-button @click="userc(form)" type="primary">修改</el-button>
  <img src="http://192.168.0.108:3000/1619425682819_衣服.png" alt="">
  </el-form>
</template>
<script>
export default {
  name: 'Account1',
  data () {
    return {
      form: {
        user: '',
        phone: '',
        address: ''
      },
      rule1: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入电话号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度是11个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入收货地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    userc (form) {
      this.$refs.userval.validate((valid) => {
        if (valid) {
          this.$axios.post('/userc', {
            user: form.user,
            phone: form.phone,
            address: form.address
          }).then(res => {
            if (res.data.msg) {
              localStorage.setItem('user', form.user)
              this.$router.go(0)
              this.$message.success({ duration: 1000, message: res.data.msg })
            }
          })
        } else {
          return false
        }
      })
    }
  },
  mounted () {
    this.$axios.post('/getuser').then(res => {
      this.form = res.data
    })
  }
}
</script>
<style>
</style>
