<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo">游牧未来后台管理系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <!-- <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div> -->
                <!-- 用户头像 -->
                <div class="user-avator"><img src="static/img/img.jpg"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided  command="update">修改密码</el-dropdown-item>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        
         <!-- 修改密码 -->
        <el-dialog title="修改密码" :visible.sync="updateDialog" width="500px">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="原密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="form.new_password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="form.new_password_confirmation"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateDialog = false">取 消</el-button>
                <el-button type="primary" @click="updateUserPassword">修改</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import bus from '../common/bus';
    import { apiUserLoginOut,apiUserUpdatePassword } from '@/service';
    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                name: 'admin',
                message: 2,
                username: 'admin',
                updateDialog: false,
                form: {
                  password: '',
                  new_password: '',
                  new_password_confirmation: ''
                }
            }
        },
        computed:{

        },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    this.$router.push('/login');
                    apiUserLoginOut()
                    .then((res)=>{
                        if(res.code == 200){
                            this.$message.success('退出登录成功');
                            this.$router.push('/login');
                        }else{
                            this.$message.error('退出登录失败');
                        }
                    })
                }
                if(command == 'update'){
                   this.updateDialog = true
                }
            },
            updateUserPassword(){
              if(this.form.password == '' || this.form.new_password == ''){
                this.$message.error('密码不能为空')
                return
              }
              apiUserUpdatePassword({
                oldpasswd:this.form.password,
                newpasswd: this.form.new_password,
                repasswd: this.form.new_password_confirmation
              })
              .then((res)=>{
                if(res.code == 200){
                    this.$message.success('重置密码成功')
                    this.updateDialog = false
                }else{
                    this.$message.error(res.msg)
                }
              })
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .header .logo{
        float: left;
        width:250px;
        line-height: 70px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
