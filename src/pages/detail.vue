<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>订单详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <p class="title">基础信息</p>
            <el-table :data="basic" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="name" label="借款人" sortable></el-table-column>
                <el-table-column prop="id_card" label="身份证"></el-table-column>
                <el-table-column prop="phone" label="手机号"></el-table-column>
                <el-table-column prop="is_auth" label="认证状态"></el-table-column>
            </el-table>
        </div>


    </div>
</template>

<script>
    // import {  } from '@/service'
    export default {
        name: 'editor',
        data: function(){
            return {
                dialogUpdate: false,
                content: '',
                tableData: [],
                basic: [],
                bank: [],
                card: [],
                mobile: [],
                ali_pay: [],
                contacts: [],
                examine: [],
                approve: [],
                argreementList: {},
                id: this.$route.query.id||''
            }
        },
        watch:{
           $route(newValue, oldValue){
               if(newValue.path == '/detail'){
                 this.id = newValue.query.id
                 this.getOrderDetail()
               }
           }
        },
        mounted(){
            this.id = this.$route.query.id
            this.getOrderDetail()
        },
        methods: {
            returnPage(){
               this.$router.go(-1)
            },
            checkImage(url){
              window.open(url)
            },
            getOrderDetail(){

            }
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 10px;
    }
    .title{
        margin-bottom: 20px;
        margin-top: 20px;
    }
    .agreement-header{
      width: 100%;
      background: #ffffff;
      padding:15px;
      box-sizing: border-box;
      font-size: 16px;
      line-height: 25px;
    }
    .text{
      margin-top: 3px;
      margin-bottom: 30px;
      color: #b5b6b7;
      position: relative;
    }
    .limit-img{
      position: absolute;
      bottom: -50px;
      right: 130px;
      width: 120px;
      height: 120px;
    }
    .flex-text{
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }
    .header-right{
      float: right;
    }
    .header-right img{
      width: 60px;
      height: 60px;
    }
    .bottom-img{
      width: auto;
      height: 50px;
      margin-left:10px;
      margin-right: 5px;
    }
</style>