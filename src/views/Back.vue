<template>
<el-container>
  <el-header class="back-header" ><h1></h1><span>管理系统</span><el-button @click="rootexit">退出</el-button></el-header>
  <el-container>
    <el-aside width="25rem">
        <el-menu
        style="height:67rem;"
      :default-active="defaultActive1"
      class="el-menu-vertical-demo"
      background-color="#909399"
      text-color="#fff"
      active-text-color="#E6A23C"
      router>
      <el-menu-item index="/user">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/orderback">
        <i class="el-icon-document-copy"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-menu-item index="/Newgoods">
        <i class="el-icon-s-shop"></i>
        <span slot="title">创建商品</span>
      </el-menu-item>
      <el-menu-item index="/goods">
        <i class="el-icon-s-goods"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
    <el-main style="background-color: #FFFFFF">
      <router-view/>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
export default {
  name: 'Back',
  computed: {
    defaultActive1 () {
      return '/' + this.$route.path.split('/')[1]
    }
  },
  methods: {
    rootexit () {
      localStorage.clear()
      this.$router.replace('/admin')
    }
  }
}
</script>
<style lang="less" scoped>
.back-header {
    background-color:#409EFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 2rem;
    span {
        float: left;
    }
    .el-button {
        float: right;
    }
}
</style>
