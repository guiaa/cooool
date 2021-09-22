<template>
  <el-table
    :data="user"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID"
      width="150">
      <template slot-scope="scope">
      <span>{{ scope.row.id }}</span>
    </template>
    </el-table-column>
    <el-table-column
      prop="user"
      label="账号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码"
      width="120">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="400">
    </el-table-column>
    <el-table-column
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, user)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'User',
  data () {
    return {
      user: [
        {
          user: 'root',
          password: 'root',
          id: '0',
          phone: '15502233330',
          address: '天津商业大学巴拉巴拉'
        },
        {
          user: '张三',
          password: '000000',
          id: '1',
          phone: '132323323330',
          address: '天津商业大学巴11拉巴拉'
        },
        {
          user: '李四',
          password: '111111',
          id: '2',
          phone: '15502211230',
          address: '天津商业大学巴拉巴22拉'
        },
        {
          user: '胡杰',
          password: 'hujie',
          id: '3',
          phone: '15365343530',
          address: '天津商业大学巴拉巴333拉'
        }
      ]
    }
  },
  methods: {
    deleteRow (index, rows) {
      console.log(rows[index].id)
      const that = this
      that.$axios.post('deleteUser', { id: rows[index].id }).then((val) => {
        // console.log(val.data)
        that.$message.success({ duration: 1000, message: val.data.msg })
      })
      rows.splice(index, 1)
    }
  },
  mounted () {
    console.log(localStorage.getItem('token'))
    this.$axios.get('user').then(val => {
      console.log(val.data)
      this.user = val.data
    })
  }
}
</script>
<style>
</style>
