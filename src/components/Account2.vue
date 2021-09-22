<template>
  <el-form style="margin-top: 5rem" ref="password" :model="form" :rules="rule2">
    <el-form-item label="当前密码" style="width: 50rem" prop="password">
      <el-input type="password" v-model="form.password" placeholder="请输入密码">
        <i slot="prefix" class="el-icon-key"></i>
      </el-input>
    </el-form-item>
    <el-form-item label="新密码" style="width: 50rem" prop="password2">
      <el-input type="password" v-model="form.password2" placeholder="请输入新密码">
        <i slot="prefix" class="el-icon-phone"></i>
      </el-input>
    </el-form-item>
    <el-form-item label="确认新密码" style="width: 50rem" prop="password3">
      <el-input type="password" v-model="form.password3" placeholder="请再次输入新密码">
        <i slot="prefix" class="el-icon-phone"></i>
      </el-input>
    </el-form-item>
    <el-button @click="passwordc(form)" type="primary">修改</el-button>
  </el-form>
</template>
<script>
export default {
  name: 'Account1',
  data () {
    return {
      form: {
        password: '',
        password2: '',
        password3: ''
      },
      rule2: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        password3: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    passwordc () {
      if (this.form.password2 === this.form.password3) {
        this.$axios.post('passwordc', { password: this.form.password, password2: this.form.password2 }).then(res => {
          if (res.data.ok === 1) {
            this.$message.success({ duration: 1000, message: res.data.msg })
          } else {
            this.$message.error({ duration: 1000, message: res.data.msg })
          }
        })
      }
    }
  }
}
</script>
<style>
</style>
