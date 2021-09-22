import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// import { mixin } from 'vue/types/umd'
axios.defaults.baseURL = 'http://192.168.0.109:3000'
// axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
  return config
})
// axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
