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
      label="订单编号"
      width="100"
    ></el-table-column>
    <el-table-column
      prop="trade_img"
      label="商品"
      width="200"
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
      width="120">
    </el-table-column>
    <el-table-column
      prop="trade_price"
      label="价格"
      width="200">
      <template slot-scope="scope">
      <span>￥ {{ scope.row.trade_price * scope.row.num }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="state"
      label="状态"
      width="100">
    </el-table-column>
  </el-table>
</div>
</template>
<script>
export default {
  name: 'Order',
  data () {
    return {
      activeName: 'all',
      tableData: [],
      loaddata: []
    }
  },
  methods: {
    handleClick (tab) {
      if (tab.name === 'all') {
        this.tableData = this.loaddata
      } else if (tab.name === 'fu') {
        this.tableData = this.loaddata.filter((val) => val.state === '待付款')
      } else if (tab.name === 'shou') {
        this.tableData = this.loaddata.filter((val) => val.state === '待收货')
      } else {
        this.tableData = this.loaddata.filter((val) => val.state === '已完成')
      }
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
  mounted () {
    const that = this
    that.$axios.get('/userorder').then(val => {
      let result = [...val.data.data]
      // console.log(result[1])
      for (let i = 0; i < val.data.data.length; i++) {
        result[i].trade_img = that.changeimg(val.data.data[i].trade_img)
      }
      that.loaddata = result.filter((val) => val.state)
      that.handleClick({ name: 'all' })
      // this.tableData = this.loaddata.filter((val) => val.state === '待付款')
      console.log(result)
    })
  }
}
</script>
<style>
</style>
