<template>
  <el-container>
    <el-header>
      <el-form ref="showForm" :model="showForm">
        <el-form-item>
          <el-row type="flex" justify="center" class="el-input-showform">
            <el-autocomplete
              v-model="showForm.searchValue"
              @input="selet(va)"
              class="el-input-showinput"
              :fetch-suggestions="querySearch"
            />
            <el-button type="primary" @click="tradev(showForm.searchValue)" icon="el-icon-search">搜索</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-header>
    <el-container style="overflow: hidden;">
    <el-aside width="15rem" class="el-aside-show">
      <el-row v-for="(ite,inde) in searchWaitslice(searchWait)" :key="inde">
        <el-col :span="12" style="font-size: 16px;" v-for="(item, index) in ite" :key="index" @click.native="clickAside(item.value)">
          {{ item.value }}
        </el-col>
      </el-row>
    </el-aside>
    <el-main style="width: 43rem; position: relative; left: 26%;">
      <el-carousel height= "45rem" style="width: 40rem;">
        <el-carousel-item v-for="(item, index) in pictures" :key="index">
          <el-image  @click.native="tradev(item.trade_name)" :src="item.trade_img" style="width: 40rem; height: 40rem"></el-image>
        </el-carousel-item>
      </el-carousel>
    </el-main>
  </el-container>
  <el-footer class="test-5" style="margin-left:20%; width:60%; margin-top:2rem;overflow:auto; height: 50rem">
    <span style="font-size: 2rem; margin-left:48%;">猜你喜欢</span>
    <ul
      class="scrollbar"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled">
      <li v-for="(ite,inde) in searchWaitslice2(pictures2)" :key="inde">
  <el-row style="margin-top:2rem" type="flex" justify="space-between">
      <el-col style="cursor: pointer;" :span="5" v-for="(item,index) in ite" :key="index" @click.native="tradev(item.trade_name)">
        <el-image :src="item.trade_img"></el-image>
        <span style="trade_name-align: center;display:block;">{{ item.trade_name }}</span>
        <span>{{ '￥' + item.trade_price }}</span>
      </el-col>
  </el-row></li>
  </ul>
  </el-footer>
  </el-container>
</template>

<script>
// import Showthing from '../components/Showthing.vue'
import trade from '../trade'

export default {
  name: 'Show',
  mixins: [trade],
  // components: {
  //   Showthing
  // },
  data () {
    return {
      img: {},
      showForm: {
        searchValue: ''
      },
      pictures: [],
      pictures2: [
        {
          trade_img: require('../assets/手机.png'),
          trade_name: '手机',
          trade_price: '6888'
        },
        {
          trade_img: require('../assets/手机.png'),
          trade_name: '手机',
          trade_price: '6888'
        },
        {
          trade_img: require('../assets/鞋.png'),
          trade_name: 'xie',
          trade_price: '500'
        }
      ],
      searchWait: [
        {
          value: '电器'
        },
        {
          value: '手机'
        },
        {
          value: '电脑'
        },
        {
          value: '家具'
        },
        {
          value: '厨具'
        },
        {
          value: '男装'
        },
        {
          value: '女装'
        },
        {
          value: '男鞋'
        },
        {
          value: '女鞋'
        },
        {
          value: '图书'
        },
        {
          value: '食物'
        },
        {
          value: '美妆'
        },
        {
          value: '女装'
        },
        {
          value: '男鞋'
        },
        {
          value: '女鞋'
        },
        {
          value: '图书'
        },
        {
          value: '食物'
        },
        {
          value: '美妆'
        }
      ],
      restaurants: []
    }
  },
  methods: {
    selet (va) {
      if (!va) {
        return
      }
      // console.log(!va)
      this.$axios.post('/selet', { val: va }).then(val => {
        let r = []
        for (let o = 0; o < val.data.data.length; o++) {
          r.push({ value: val.data.data[o].trade_name })
        }
        this.restaurants = r
        // console.log(this.restaurants)
      })
    },
    tradev (tradename) {
      const nw = this.$router.resolve({ path: 'Trade', query: { tradename: tradename } })
      window.open(nw.href, '_blank')
      console.log(nw.href)
      trade.tradevalue(tradename)
    },
    // clickpic (trade_name) {
    //   console.log(trade_name)
    // },
    querySearch (queryString, cb) {
      // var restaurants = this.restaurants
      // var results = queryString
      //   ? restaurants.filter(this.createFilter(queryString))
      //   : restaurants
      // 调用 callback 返回建议列表的数据
      cb(this.restaurants)
    },
    // createFilter (queryString) {
    //   return (restaurant) => {
    //     return (
    //       restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
    //       0
    //     )
    //   }
    // },
    clickAside (value) {
      // console.log(value)
      this.showForm.searchValue = value
      this.selet(value)
    },
    searchWaitslice (searchWait) {
      let value1 = ['111']
      value1 = []
      for (let i = 0; i < searchWait.length - 1; i = i + 2) {
        value1.push([{
          value: searchWait[i].value
        },
        {
          value: searchWait[i + 1].value
        }])
      }
      return value1
    },
    searchWaitslice2 (pictures2) {
      let value1 = ['111']
      value1 = []
      for (let i = 0; i < pictures2.length - 1; i = i + 4) {
        value1.push([{ ...pictures2[i] }, { ...pictures2[i + 1] }, { ...pictures2[i + 2] }, { ...pictures2[i + 3] }])
      }
      return value1
    },
    load () {
      console.log(this.pictures2)
      this.pictures2 = [...this.pictures2, ...this.pictures2.slice(-8, -1)]
    },
    // 传入图片的buffer内容
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
  computed: {
    disabled () {
      return this.pictures2.length >= 50
    },
    va () {
      return this.showForm.searchValue
    }
  },
  mounted () {
    const that = this
    this.$axios.get('show').then(function (val) {
      // console.log(val.data)
      let result = [...val.data.data]
      let c = []
      for (let o = 0; o < result.length; o++) {
        c.push({ value: result[o].trade_class })
      }
      for (let o = 0; o < result.length; o++) {
        c.push({ value: result[o].trade_class })
      }
      console.log(c)
      that.searchWait = c
      // 以上是给搜索框的数据
      for (let i = 0; i < val.data.data.length; i++) {
        result[i].trade_img = that.changeimg(val.data.data[i].trade_img)
      }
      console.log(val.data)
      // console.log(result)
      result.push(...result)
      that.pictures = result.slice(-4)
      that.pictures2 = result
      that.load()
      console.log(that.pictures2)
    })
    // const that = this
    // that.searchWaitslice(this.searchWait)
  }
  // watch: {
  //   va () {
  //     console.log(this.va)
  //   }
  // }
}
</script>

<style>
li {
  list-style:none;
}
.el-image {
  cursor: pointer;
}
.el-input-showform {
  margin-top: 1.5rem;
}
.el-input-showinput {
  width: 50rem;
}
.el-aside-show {
  position: relative;
  left: 20%;
  top: 3rem;
}
.el-aside-show .el-row {
  margin-top: 2rem;
}
.el-aside-show .el-row .el-col {
  cursor: pointer;
}
 .test-5::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  }
  .test-5::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius   : 10px;
  background-color: skyblue;
  background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
  );
  }
  .test-5::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  background   : #ededed;
  border-radius: 10px;
  }
</style>
