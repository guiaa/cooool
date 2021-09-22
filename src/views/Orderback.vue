<template>
<div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="全部订单" name="all"></el-tab-pane>
    <el-tab-pane label="待付款" name="fu"></el-tab-pane>
    <el-tab-pane label="待收货" name="shou"></el-tab-pane>
    <el-tab-pane label="已完成" name="ok"></el-tab-pane>
  </el-tabs>
  <el-table
    ref="filterTable"
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="orderid"
      label="编号"
      width="50"
    ></el-table-column>
    <el-table-column
      prop="trade_img"
      label="商品"
      width="150"
    >
    <template slot-scope="scope">
      <img :src="scope.row.trade_img" min-width="70" height="70"/>
    </template>
    </el-table-column>
    <el-table-column
      prop="trade_name"
      label="名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="trade_class"
      label="种类"
      width="180">
    </el-table-column>
    <el-table-column
      prop="num"
      label="数量"
      width="100">
    </el-table-column>
    <el-table-column
      prop="trade_price"
      label="价格"
      width="150">
      <template slot-scope="scope">
      <span>￥ {{ scope.row.trade_price * scope.row.num }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="state"
      label="状态"
      width="150">
      <template slot-scope="scope">
      <el-select v-model="scope.row.state" @change="changestate(scope.row.state,scope.$index)">
        <el-option
          v-for="(item, key) in options"
          :key="key"
          :value="item.value">
        </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column
      prop="user"
      label="用户"
      width="100">
    </el-table-column>
    <el-table-column
      label="操作"
      width="120">
      <template slot-scope="scope">
        <div>
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          size="small">
          移除
        </el-button>
        <!-- <el-button
          @click.native.prevent="justlook(scope.row.user)"
          type="trade_name"
          size="small">
          只看他
        </el-button> -->
        </div>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>
<script>
export default {
  name: 'Orderback',
  data () {
    return {
      activeName: 'all',
      userName: '',
      value: '',
      tableData: [
        {
          orderid: 0,
          trade_img: require('../assets/联想.jpg'),
          trade_name: '电脑',
          trade_price: '7888',
          state: '待付款',
          num: 2,
          trade_class: '电子产品',
          user: '张三'
        },
        {
          orderid: 1,
          trade_img: require('../assets/手机.png'),
          trade_name: '手机',
          trade_price: '6888',
          state: '待收货',
          num: 13,
          trade_class: '电子产品',
          user: '李四'
        },
        {
          orderid: 2,
          trade_img: require('../assets/鞋.png'),
          trade_name: '鞋',
          trade_price: '500',
          state: '待收货',
          num: 14,
          trade_class: '鞋类',
          user: '胡杰'
        },
        {
          orderid: 3,
          trade_img: require('../assets/衣服.png'),
          trade_name: '衣服',
          trade_price: '700',
          state: '已完成',
          num: 11,
          trade_class: '服饰',
          user: '王越'
        }
      ],
      loaddata: [
        {
          orderid: 0,
          trade_img: require('../assets/联想.jpg'),
          trade_name: '电脑',
          trade_price: '7888',
          state: '待付款',
          num: 2,
          trade_class: '电子产品',
          user: '张三'
        },
        {
          orderid: 1,
          trade_img: require('../assets/手机.png'),
          trade_name: '手机',
          trade_price: '6888',
          state: '待收货',
          num: 13,
          trade_class: '电子产品',
          user: '李四'
        },
        {
          orderid: 2,
          trade_img: require('../assets/鞋.png'),
          trade_name: '鞋',
          trade_price: '500',
          state: '待收货',
          num: 14,
          trade_class: '鞋类',
          user: '胡杰'
        },
        {
          orderid: 3,
          trade_img: require('../assets/衣服.png'),
          trade_name: '衣服',
          trade_price: '700',
          state: '已完成',
          num: 11,
          trade_class: '服饰',
          user: '王越'
        }
      ],
      options: [{
        value: '待付款'
      }, {
        value: '待收货'
      }, {
        value: '已完成'
      }]
    }
  },
  methods: {
    handleClick (tab) {
      if (tab.name === 'all') {
        // console.log(this.loaddata)
        this.tableData = [...this.loaddata]
      } else if (tab.name === 'fu') {
        this.tableData = this.loaddata.filter((val) => val.state === '待付款')
      } else if (tab.name === 'shou') {
        this.tableData = this.loaddata.filter((val) => val.state === '待收货')
      } else {
        this.tableData = this.loaddata.filter((val) => val.state === '已完成')
      }
    },
    deleteRow (index, rows) {
      // console.log(rows[index].orderid)
      rows.splice(index, 1)
      this.loaddata.splice(index, 1)
      // console.log(rows[index].orderid)
      this.$axios.post('/delshop', { orderid: rows[index].orderid }).then(val => {
        this.$message.success({ duration: 1000, message: val.data.msg })
        // console.log(val.data.msg)
      })
    },
    changestate (state, id) {
      this.loaddata[id].state = state
      // console.log(state, this.loaddata[id].orderid)
      this.$axios.post('/changestate', { orderid: this.loaddata[id].orderid, state: state }).then(val => {
        this.$message.success({ duration: 1000, message: val.data.msg })
        // console.log(val.data.msg)
      })
      // if (state === this.tableData[id].state) {
      //   console.log(this.tableData[id].state)
      // }
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
    // justlook (name) {
    //   this.tableData = this.loaddata.filter((val) => val.user === name)
    // }
  },
  mounted () {
    const that = this
    that.$axios.get('/orderback').then(val => {
      let result = [...val.data.data]
      console.log(val)
      for (let i = 0; i < val.data.data.length; i++) {
        result[i].trade_img = that.changeimg(val.data.data[i].trade_img)
      }
      that.loaddata = result
      that.handleClick({ name: 'all' })
      // this.tableData = this.loaddata.filter((val) => val.state === '待付款')
      console.log(result)
    })
  }
}
</script>
<style>
</style>
