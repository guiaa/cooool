<template>
<div>
  <el-menu class="el-menu-nav" :default-active="defaultActive" mode="horizontal" @select="handleSelect" background-color="#409EFF" text-color="#fff" active-text-color="#ffd04b" router>
    <el-row type="flex" justify="center">
      <el-col :offset="6" :span="3"><el-menu-item class="el-menu-navitem" index="/show">
      <i class="el-icon-goods"></i>
        商品展示</el-menu-item></el-col>
    <el-col :span="3"><el-menu-item class="el-menu-navitem" index="/account">
    <i class="el-icon-menu"></i>账号管理</el-menu-item></el-col>
    <el-col :span="3"><el-menu-item class="el-menu-navitem" index="/order">
    <i class="el-icon-document-checked"></i>我的订单</el-menu-item></el-col>
    <el-col :span="3"><el-menu-item class="el-menu-navitem" index="/shop">
    <i class="el-icon-shopping-cart-2"></i>购物车</el-menu-item></el-col>
    <el-col :span="3">
      <el-menu-item v-if="haveuser" class="el-menu-navitem" index="/home">
    <i class="el-icon-s-custom"></i>登录/注册
    </el-menu-item>
    <el-menu-item v-else class="el-menu-navitem" @click="userout">
    <i class="el-icon-remove"></i>退出登录
    </el-menu-item>
    </el-col>
    <el-col :offset="4" :span="2">
      <el-menu-item v-if="haveuser" class="el-menu-navitem" index="/admin"><a style="font-size:5px">切换管理系统</a></el-menu-item>
      <el-menu-item v-else class="el-menu-navitem"><a :model="username" style="font-size:5px">用户 {{ username }}欢迎你</a></el-menu-item>
      </el-col>
    </el-row>
  </el-menu>
   <router-view/>
</div>
</template>
<script>
export default {
  name: 'Usernav',
  data () {
    return {
    }
  },
  computed: {
    defaultActive () {
      // console.log(this.$route.path.split('/')[1])
      return '/' + this.$route.path.split('/')[1]
    },
    haveuser () {
      if (localStorage.getItem('token')) {
        return false
      } else {
        return true
      }
    },
    username () {
      return localStorage.getItem('user')
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    userout () {
      localStorage.clear()
      this.$router.go(0)
    }
  }
}
</script>
<style>
.el-menu-nav {
    opacity: 0.95;
    flex-direction:column-reverse;
}
.el-menu-navitem {
    text-align:center;
}
</style>
