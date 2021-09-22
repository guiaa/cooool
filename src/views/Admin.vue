<template>
<div>
  <el-button style="float:right; margin-right: 5rem" @click="gohome">回首页</el-button>
<div class="admin">
  <h1>管理系统</h1>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="用户名" prop="user">
      <el-input class="el-input-login" v-model="form.user" placeholder="请输入用户名">
        <i slot="prefix" class="el-icon-user-solid"></i>
      </el-input>
    </el-form-item>
    <el-form-item label="密 码" prop="password">
      <el-input type="password" class="el-input-login" v-model="form.password" placeholder="请输入密码">
        <i slot="prefix" class="el-icon-key"></i>
      </el-input>
    </el-form-item>
    <el-form-item class="admin-login">
      <el-button type="primary" @click="login(form)" >登录</el-button>
      <el-button @click="resetForm('form')">重填</el-button>
    </el-form-item>
  </el-form>
</div>
</div>
</template>

<script>
export default {
  name: 'Admin',

  data () {
    return {
      form: {
        user: 'root',
        password: ''
      },
      rules: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    gohome () {
      this.$router.push('/')
    },
    resetForm (form) {
      this.$refs[form].resetFields()
    },
    login (form) {
      console.log(localStorage.getItem('token'))
      this.$axios.post('/admin', {
        user: form.user,
        password: form.password
      }).then(res => {
        if (res.data.token) {
          console.log(res)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', form.user)
          this.$router.replace('/back')
          // this.$router.go(0)
          this.$message.success({ duration: 1000, message: res.data.msg })
        } else {
          this.$message.error({ duration: 1000, message: res.data.msg })
        }
        // console.log(localStorage.getItem('user'))
      })
    }
  }
}
</script>
<style lang="less" scoped>
.admin {
  width:40rem;
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  h1 {
    margin-left:45%;
  }
}
.admin-login {
  margin-left:15%;
}
</style>
