<template>
  <el-form class="el-form-login" ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item>
      <el-switch v-model="form.islogin" style="display: block" active-color="#13ce66" inactive-color="#1e90ff" active-text="注册" inactive-text="登录"></el-switch>
    </el-form-item>
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
    <el-form-item v-if="form.islogin" label="确认密码" prop="passwordtwo">
      <el-input type="password" class="el-input-login" v-model="form.passwordtwo" placeholder="请再输入一次密码">
        <i slot="prefix" class="el-icon-key"></i>
      </el-input>
    </el-form-item>
    <el-form-item v-if="form.islogin" label="手机号" prop="phone">
      <el-input class="el-input-login" v-model="form.phone" placeholder="请输入手机号">
        <i slot="prefix" class="el-icon-phone"></i>
      </el-input>
    </el-form-item>
    <el-form-item v-if="form.islogin" label="地址" prop="address">
      <el-input :rows="3" type="textarea" class="el-input-login" v-model="form.address" placeholder="请输入地址">
        <i slot="prefix" class="el-icon-location"></i>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button v-if="form.islogin" type="primary" @click="register(form)" >注册</el-button>
      <el-button @click="login(form)" v-else type="primary" >登录</el-button>
      <el-button @click="resetForm('form')">重填</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Login',

  data () {
    return {
      form: {
        user: '',
        password: '',
        passwordtwo: '',
        islogin: false,
        phone: '',
        address: ''
      },
      rules: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        passwordtwo: [
          { required: true, message: '请再次输入密码', trigger: 'blur' }
        ],
        phone: [
          { min: 11, max: 11, message: '输入11位', trigger: 'blur' },
          { required: true, message: '输入手机号', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm (form) {
      this.$refs[form].resetFields()
    },
    register (form) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (form.password === form.passwordtwo) {
            this.$axios.post('/register', {
              user: form.user,
              password: form.password,
              phone: form.phone,
              address: form.address
            }).then(res => {
              this.$message({
                message: res.data,
                type: 'success'
              })
              form.islogin = false
            })
          } else {
            this.$message.error('两次密码不一样')
          }
        } else {
          this.$message.error('请填入信息')
        }
      })
    },
    login (form) {
      // console.log(form.password)
      this.$axios.post('/login', {
        user: form.user,
        password: form.password
      }).then(res => {
        // console.log(localStorage.getItem('token'))
        if (res.data.token) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', form.user)
          // this.$router.go(0)
          this.$router.replace('/show')
          window.location.reload()
          this.$message.success('登陆成功')
        } else {
          this.$message.error('登陆失败')
        }
      })
    }
  }
  // watch: {
  //   $route (to, from) {
  //     console.log(to, from)
  //   }
  // }
}
</script>

<style scoped>
.el-form-login {
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}
.el-input-login {
  width: 20rem;
}
</style>
