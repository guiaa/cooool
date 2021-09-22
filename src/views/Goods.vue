<template>
<div>
  <el-table
    ref="filterTable"
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="trade_img"
      label="商品"
      width="100"
    >
    <template slot-scope="scope">
      <img :src="scope.row.trade_img" min-width="70" height="70"/>
    </template>
    </el-table-column>
    <el-table-column
      prop="trade_name"
      label="名称"
      width="270">
    </el-table-column>
    <el-table-column
      prop="trade_class"
      label="种类"
      width="100">
    </el-table-column>
    <el-table-column
    show-overflow-tooltip: true
      prop="trade_introduce"
      label="商品介绍"
      width="400">
    </el-table-column>
    <el-table-column
      prop="trade_price"
      label="价格"
      width="100">
      <template slot-scope="scope">
      <span>￥ {{ scope.row.trade_price }}</span>
      </template>
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
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="120">
      <template slot-scope="scope">
        <div>
        <el-button
          @click.native.prevent="updategoods(scope.$index, tableData)"
          size="small">
          修改
        </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
    <el-form :rules="rules" style="width:80%" :model="form">
    <el-form-item label="商品名称" :label-width="formLabelWidth" prop="trade_name">
      <el-input v-model="form.trade_name"></el-input>
    </el-form-item>
    <el-form-item label="商品价格" :label-width="formLabelWidth" prop="trade_price">
      <el-input v-model="form.trade_price"></el-input>
    </el-form-item>
    <el-form-item label="商品类别" :label-width="formLabelWidth" prop="trade_class">
      <el-input v-model="form.trade_class"></el-input>
    </el-form-item>
    <el-form-item label="商品介绍" :label-width="formLabelWidth" prop="trade_introduce">
      <el-input v-model="form.trade_introduce" type="textarea" :rows="3"></el-input>
    </el-form-item>
    <el-form-item  label="原图" :label-width="'200px'">
        <img :src="form.trade_img" class="avatar"/>
    </el-form-item>
  </el-form>
  <div class="dialog-footer" style="margin-left:20rem">
    <el-upload
    ref="upload"
  class="avatar-uploader"
  action="http://127.0.0.1:3000/upload"
  :headers="headers"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  :auto-upload="false">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitUpload(form)">确 定</el-button>
  </div>
    </el-dialog>
</div>
</template>
<script>
export default {
  name: 'Goods',
  // components: {
  //   Login
  // },
  data () {
    return {
      dialogTableVisible: false,
      tableData: [
        {
          trade_introduce: 0,
          trade_img: require('../assets/联想.jpg'),
          trade_name: '电脑',
          trade_class: '电子产品',
          trade_price: '7888'
        },
        {
          trade_introduce: 1,
          trade_img: require('../assets/手机.png'),
          trade_name: '手机',
          trade_class: '电子产品',
          trade_price: '6888'
        },
        {
          trade_introduce: 2,
          trade_img: require('../assets/鞋.png'),
          trade_name: '鞋',
          trade_class: '鞋类',
          trade_price: '500'
        },
        {
          trade_introduce: 3,
          trade_img: require('../assets/衣服.png'),
          trade_name: '衣服',
          trade_class: '服饰',
          trade_price: '700'
        }
      ],
      form: {
        trade_introduce: '',
        trade_img: '',
        trade_name: '',
        trade_class: '',
        trade_price: ''
      },
      formLabelWidth: '120px',
      // 上传图片参数
      imageUrl: '',
      rules: {
        trade_name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        trade_price: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        trade_introduce: [
          { required: true, message: '请输入介绍', trigger: 'blur' }
        ],
        trade_class: [
          { required: true, message: '请输入类别', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    deleteRow (index, rows) {
      console.log(rows[index].trade_name)
      this.$axios.post('/deltrade', { trade_name: rows[index].trade_name }).then(val => {
        this.$message.success({ duration: 1000, message: val.data.msg })
      })
      rows.splice(index, 1)
    },
    updategoods (index, rows) {
      this.dialogTableVisible = true
      this.form = { ...rows[index] }
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
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(this.form)
      this.$axios.post('updatetradeimg', { imgpath: res.data.path, tradeid: this.form.tradeid }).then(val => {
        this.$message.success({ duration: 1000, message: val.data.msg })
      })
    },
    submitUpload (form) {
      this.$refs.upload.submit()
      this.$axios.post('updatetradeval', { tradename: this.form.trade_name, price: this.form.trade_price, indro: this.form.trade_introduce, class: this.form.trade_class, tradeid: this.form.tradeid }).then(val => {
        this.$message.success({ duration: 1000, message: val.data.msg })
        this.$router.go(0)
        this.dialogTableVisible = false
      })
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    }
  },
  mounted () {
    const that = this
    that.$axios.get('/goods').then(val => {
      let result = [...val.data.data]
      // console.log(result[1])
      for (let i = 0; i < val.data.data.length; i++) {
        result[i].trade_img = that.changeimg(val.data.data[i].trade_img)
      }
      that.tableData = result
      // this.tableData = this.loaddata.filter((val) => val.state === '待付款')
      console.log(that.tableData)
    })
  },
  computed: {
    headers () {
      return {
        Authorization: 'Bearer ' + localStorage.getItem('token') // 直接从本地获取token就行
      }
    }
  }
}
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
