<template>
  <el-form
    :rules="rules"
    class="forms"
    ref="form"
    :model="form"
    label-width="80px"
  >
    <h3>系统登录</h3>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        @keyup.enter.native="submitForm('form')"
      ></el-input>
    </el-form-item>
    <p style="font-size: 14px; margin-right: 150px">账号:admin 密码:admin</p>
    <el-form-item style="margin-right: 60px">
      <el-button type="primary" @click="submitForm('form')">提交</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Mock from 'mockjs';
import Cookie from 'js-cookie'
import { getMenu } from '../api'
export default {
  props: {},
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      // // token信息
      // const token = Mock.Random.guid()

      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证登录
          getMenu(this.form).then(({ data }) => {
            console.log(data);
            if (data.code === 20000) {
              //信息存入cookie用于不同页面间的通信
              const token = data.data.token
              Cookie.set('token', token)
              this.$router.push('/home')
              this.$message({
                message: '登录成功',
                type: 'success'
              });
            } else {
              this.$message.error(data.data.message);
            }
          })
        }
      });

    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    //验证登录
    // async getMenu (data) {
    //   const res = await getMenu(data)
    //   console.log(res.data);
    // }

  }
}
</script>

<style lang='less' scoped>
.forms {
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 0 25px #eaeaea;
  font-weight: 700;

  h3 {
    color: #9fa7d8;
    font-size: 26px;
    font-family: "楷体";
    padding-bottom: 30px;
  }
}
</style>
