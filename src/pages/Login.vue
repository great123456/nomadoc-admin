<template>
    <div class="login-wrap">
        <div class="ms-title">游牧未来后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { apiUserRegister,apiUserInfo,apiUserLogin } from '@/service'
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
          this.ruleForm.username = ''
          this.ruleForm.password = ''
        },
        methods: {
            submitForm(formName) {
                const self = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                      self.$router.push('/order');
                      // apiUserLogin({
                      //   name: self.ruleForm.username,
                      //   password: self.ruleForm.password
                      // })
                      // .then((res)=>{
                      //   console.log('res',res)
                      //   if(res.code == 200){
                      //     self.$message.success('登录成功')
                      //     localStorage.setItem('admin-token',res.data.token)
                      //     localStorage.setItem('username',self.ruleForm.username);
                      //     self.$router.push('/order');
                      //   }else{
                      //     self.$message.error('用户名或者密码错误')
                      //   }
                      // })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
