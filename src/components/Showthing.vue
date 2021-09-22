<template>
<div style="overflow:auto; height: 50rem">
  <ul
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled">
      <li v-for="(ite,inde) in searchWaitslice(pictures)" :key="inde">
  <el-row style="margin-top:2rem" type="flex" justify="space-between">
      <el-col style="cursor: pointer;" :span="5" v-for="(item,index) in ite" :key="index">
        <el-image :src="item.picture"></el-image>
        <span style="text-align: center;display:block;">{{ item.text }}</span>
        <span>{{ '￥' + item.price }}</span>
      </el-col>
  </el-row></li>
  </ul>
</div>
</template>
<script>
export default {
  name: 'Showthing',
  data () {
    return {
      pictures: [
        {
          picture: require('../assets/联想.jpg'),
          text: '电脑',
          price: '7888'
        },
        {
          picture: require('../assets/手机.png'),
          text: '手机',
          price: '6888'
        },
        {
          picture: require('../assets/鞋.png'),
          text: '鞋',
          price: '500'
        },
        {
          picture: require('../assets/衣服.png'),
          text: '衣服',
          price: '700'
        },
        {
          picture: require('../assets/手机.png'),
          text: '手机',
          price: '6888'
        },
        {
          picture: require('../assets/手机.png'),
          text: '手机',
          price: '6888'
        },
        {
          picture: require('../assets/鞋.png'),
          text: '鞋',
          price: '500'
        },
        {
          picture: require('../assets/鞋.png'),
          text: '鞋',
          price: '500'
        }
      ]
    }
  },
  methods: {
    searchWaitslice (pictures) {
      let value1 = ['111']
      value1 = []
      for (let i = 0; i < pictures.length - 1; i = i + 4) {
        value1.push([{
          picture: pictures[i].picture,
          text: pictures[i].text,
          price: pictures[i].price
        },
        {
          picture: pictures[i + 1].picture,
          text: pictures[i + 1].text,
          price: pictures[i + 1].price
        },
        {
          picture: pictures[i + 2].picture,
          text: pictures[i + 2].text,
          price: pictures[i + 2].price
        },
        {
          picture: pictures[i + 3].picture,
          text: pictures[i + 3].text,
          price: pictures[i + 3].price
        }])
      }
      return value1
    },
    load () {
      this.pictures = [...this.pictures, ...this.pictures.slice(0, 4)]
    }
  },
  computed: {
    disabled () {
      return this.pictures.length >= 50
    }
  },
  mounted () {
    console.log(this.pictures)
  }
}
</script>
<style>
li {
  list-style:none;
}
</style>
