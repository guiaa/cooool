<template>
<el-row>
  <el-col :span="6">
  <el-menu :default-active="defaultActive" style="height:68.1rem; width:25rem;" router>
      <!-- <el-submenu> -->
        <!-- <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>信息管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template> -->
          <el-menu-item index="/account/account1">
          <i class="el-icon-notebook-2"></i>账号管理</el-menu-item>
          <el-menu-item index="/account/account2">
          <i class="el-icon-notebook-2"></i>密码管理</el-menu-item>
        <!-- </el-menu-item-group> -->
      <!-- </el-submenu> -->
  </el-menu>
  </el-col>
  <el-col :span="1">
   <router-view/>
   </el-col>
</el-row>
</template>
<script>
export default {
  name: 'Account',
  data () {
    return {
    }
  },
  computed: {
    defaultActive () {
      // console.log('/' + this.$route.path.slice(1))
      return '/' + this.$route.path.slice(1)
    }
  },
  methods: {
  }
}
</script>
<style>
</style>
