<template>
<div>
  <el-table
  ref="multipleTable"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      fixed
      prop="trade_img"
      label="商品"
      width="150">
      <template slot-scope="scope">
      <img :src="scope.row.trade_img" min-width="70" height="70"/>
    </template>
    </el-table-column>
    <el-table-column
      prop="trade_name"
      label="名称"
      width="250">
    </el-table-column>
    <el-table-column
      prop="trade_class"
      label="种类"
      width="150">
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
      prop="num"
      label="数量"
      width="250">
      <template slot-scope="scope">
     <el-input-number size="mini" v-model="scope.row.num" :min="1" :max="10" label="数量"></el-input-number>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button style="float: right; margin-right: 50rem;" type="warning" round @click="buy(multipleSelection)">
    <i class="el-icon-shopping-cart-2"></i>购买</el-button>
</div>
</template>

<script>
export default {
  name: 'Shop',
  data () {
    return {
      tableData: [],
      multipleSelection: []
    }
  },
  methods: {
    deleteRow (index, rows) {
      console.log(rows[index].orderid)
      this.$axios.post('/delshop', { orderid: rows[index].orderid }).then(val => {
        this.$message.success({ duration: 1000, message: val.data.msg })
        console.log(val.data.msg)
      })
      rows.splice(index, 1)
    },
    buy (buyval) {
      const that = this
      // console.log(buyval)
      let su = []
      for (let i = 0; i < buyval.length; i++) {
        // console.log(buyval[i].num)
        su.push({ num: buyval[i].num, orderid: buyval[i].orderid })
      }
      that.$axios.post('shopbuy', { buyval: su }).then(function (val) {
        that.$message.success({ duration: 1000, message: val.data.msg })
        that.$router.go(0)
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      // console.log(this.multipleSelection)
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
    that.$axios.get('/usershop').then(val => {
      let result = [...val.data.data]
      console.log(localStorage.getItem('user'))
      for (let i = 0; i < val.data.data.length; i++) {
        result[i].trade_img = that.changeimg(val.data.data[i].trade_img)
      }
      that.tableData = result
      // this.tableData = this.loaddata.filter((val) => val.state === '待付款')
      // console.log(result[1].trade_price * result[1].num)
    })
  }
}
</script>
<style>
</style>
