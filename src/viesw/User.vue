<template>
  <div class="manage">
    <el-dialog
      title="新增用户"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <!-- 用户表单信息 -->
      <el-form
        :inline="true"
        :rules="rules"
        ref="form"
        :model="form"
        label-width="110px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input
            v-model.number="form.age"
            placeholder="请输入年龄"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            v-model="form.birth"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cotol">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </span>
    </el-dialog>
    <div class="mange-header">
      <el-button type="primary" @click="handAdd">新增</el-button>
      <!-- 搜索区 -->
    </div>
    <div class="tadtext">
      <el-table height="90%" :data="tableData" stripe>
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex === 0 ? "女" : "男" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="birth" label="日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column prop="sex" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" @click="handDelet(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handChange"
          :page-size="pageData.limit"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserList, createUser, updateUser, deleteUser } from "../api";
export default {
  data () {
    return {
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: ''
      },
      //校验规则
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '年龄不能为空' },
          { type: 'number', message: '年龄必须为数字值' },
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        birth: [
          { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
        ],
        addr: [
          { required: true, message: '请输入地址', trigger: 'blur' },
        ],
      },
      //用户表单
      tableData: [],
      mostTad: 0, //0表示新增 ，1 表示编辑
      total: 0, //当前总数
      pageData: {
        page: 1,
        limit: 13
      }
    };
  },
  created () {
    this.getUserList(this.pageData)
  },
  methods: {
    //点击编辑
    handleEdit (row) {
      console.log(row);
      this.mostTad = 1
      this.dialogVisible = true
      //注意需要对当前行数据进行深拷贝，否则报错
      this.form = JSON.parse(JSON.stringify(row))
    },
    //点击删除
    handDelet (data) {
      console.log(data);
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteUser({ id: data.id })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //点击新增
    handAdd () {
      this.mostTad = 0
      this.dialogVisible = true
    },
    //新增确认
    onSubmit (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.mostTad === 0) {
            this.createUser(this.form)
          } else {
            //修改接口
            this.updateUser(this.form)
          }
        } else {
          this.$message.error('错了哦，这是一条错误消息');
          return false;
        }
      });
    },
    //弹窗关闭时 清空from表单
    handleClose () {
      //关闭弹窗
      this.dialogVisible = false
      //清空form表单
      this.$refs.form.resetFields()

    },
    //点击取消
    cotol () {
      this.handleClose()
    },
    //user列表数据接口
    async getUserList (data) {
      const res = await getUserList({ params: data })
      console.log(data, res, 'user列表数据接口');
      this.tableData = res.data.list
      console.log(res.data, '列表数据接口');
      //分页总条数，如果不存在为0
      this.total = res.data.count || 0
    },
    //新增接口
    async createUser (data) {
      const res = await createUser(data)
      console.log(res);
      if (res.data.code === 20000) {
        //重新获取user数据.
        this.getUserList()
        //关闭弹窗
        this.dialogVisible = false
        //清空form表单
        this.$refs.form.resetFields()
        this.$message({
          message: res.data.data.message,
          type: 'success'
        })
      } else {
        this.$message.error('错了哦，这是一条错误消息');
      }
    },
    //编辑接口
    async updateUser (data) {
      const res = await updateUser(data)
      if (res.data.code === 20000) {
        //重新获取user数据.
        this.getUserList()
        //关闭弹窗
        this.dialogVisible = false
        this.$message({
          message: res.data.data.message,
          type: 'success'
        })
      } else {
        this.$message.error('错了哦，这是一条错误消息');
      }
    },
    //删除接口
    async deleteUser (data) {
      const res = await deleteUser(data)
      if (res.data.code === 20000) {
        //重新获取user数据.
        this.getUserList()
        this.$message({
          message: res.data.message,
          type: 'success'
        })
      } else {
        this.$message.error('错了哦，这是一条错误消息');
      }

    },
    //点击选择分页
    handChange (val) {
      console.log(`当前页: ${val}`);
      this.pageData.page = val
      //重新获取user数据.
      this.getUserList(this.pageData)
    }
  }
};
</script>

<style lang="less" scoped>
.manage {
  height: 100%;

  .tadtext {
    position: relative;
    height: calc(100% - 62px); //动态获取父盒子高度

    .block {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>