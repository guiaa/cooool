<template>
  <div id="app">
    <!-- <div id="nav" v-show="(this.$route.name != 'Home')"> -->
      <!-- <router-link to="/home">登录/注册</router-link> -->
      <!-- <router-link to="/about" target="_blank">aa</router-link> -->
    <!-- </div> -->
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>
<style>

</style>
