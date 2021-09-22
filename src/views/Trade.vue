<template>
<div>
<usernav/>
<div class="trade">
  <div class="img">
<el-image :src='url'></el-image>
  </div>
<div class="text">
<h1>{{ tradename }}</h1>
<div class="val">
<span class="price">￥ {{ price }}</span>
<span class="indro">{{ indro }}</span>
<el-input-number v-model="num" :min="1" :max="10" label="数量"></el-input-number>
</div>
<el-button type="info" @click="buy" plain round>立即购买</el-button>
<el-button type="info" @click="shop" plain round>加入购物车</el-button>
</div>
</div>
</div>
</template>
<script>
import Usernav from '../components/Usernav.vue'
export default {
  components: { Usernav },
  name: 'Trade',
  data () {
    return {
      tradename: '',
      price: '',
      indro: '',
      num: 1,
      url: 'localhost:3000/../public/images/联想.jpg'
    }
  },
  methods: {
    buy () {
      const that = this
      console.log(that.tradename)
      that.$axios.post('userbuy', { num: that.num, tradename: that.tradename }).then(function (val) {
        that.$message.success({ duration: 1000, message: val.data.msg })
      })
    },
    shop () {
      const that = this
      console.log(that.tradename)
      that.$axios.post('/usershopping', { num: that.num, tradename: that.tradename }).then(function (val) {
        that.$message.success({ duration: 1000, message: val.data.msg })
      })
    },
    changeimg (val) {
      let bytes = new Uint8Array(val.data)
      let data = ''
      let len = bytes.byteLength
      for (let i = 0; i < len; i++) {
        data += String.fromCharCode(bytes[i])
      }
      let url = 'data:image/png;base64,' + window.btoa(data)
      return url
    }
  },
  mounted () {
    // console.log(this.$route.query.tradename)
    const that = this
    that.tradename = that.$route.query.tradename
    that.$axios.get('getimg', { params: { tradename: that.$route.query.tradename } }).then(
      val => {
        // this.url = val.data.img
        if (val.data === '无此商品') {
          that.indro = '无此商品'
        } else {
          console.log(val.data.img)
          that.price = val.data.price
          that.indro = val.data.indro
          that.url = that.changeimg(val.data.img)
          console.log(val.data.img)
        }
      }
    )
  }
}
</script>
<style lang="less" scoped>
.trade {
  display:flex; flex-direction:row;
  margin-top: 5rem;
  margin-left: 30rem;
  .text{
    font: 16px Medium;
    margin-left: 5rem;
    width: 50rem;
    .indro {
      margin-top: 5rem;
      width: 35rem;
  box-shadow: 0 2px 4px rgba(143, 16, 16, 0.12), 0 0 6px rgba(139, 56, 56, 0.04);
    }
  }
  .el-image {
    width: 40rem;
    height: 40rem;
  }
}
.val {
    display:flex; flex-direction:column;
}
.el-input-number {
  margin-top: 5rem;
}
.el-button {
  margin-top: 5rem;
}
</style>
