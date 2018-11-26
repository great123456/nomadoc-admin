<!-- 用户列表 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <el-input v-model="searchName" placeholder="请输入用户名" clearable style="width:200px;"></el-input>
              <span>注册时间:</span>
              <el-date-picker
                v-model="startTime"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <el-button type="primary" plain @click="serarchPage">搜索</el-button>
              <!-- <el-button type="primary" plain>导出</el-button> -->
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="id" label="用户id"></el-table-column>
                <el-table-column prop="created_at" label="注册时间"></el-table-column>
                <el-table-column prop="name" label="用户昵称"></el-table-column>
                <el-table-column prop="id_card_count" label="用户头像"></el-table-column>
                <el-table-column prop="phone_list_count" label="是否分销"></el-table-column>
                <el-table-column prop="ali_pay_count" label="上级用户"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>


        <!-- 审核信息 -->
        <el-dialog title="审核信息" :visible.sync="dialogUpdate" width="500px">
            <el-form ref="form" :model="form" label-width="100px">
                <!-- <el-form-item label="返回app意见">
                    <el-input v-model="form.remark" type="textarea"></el-input>
                    <p>(审核不通过时填写)</p>
                </el-form-item> -->
                <el-form-item label="不通过">
                    <el-input v-model="form.content" type="textarea" placeholder="请填写不通过原因"></el-input>
                    <p>(审核不通过时填写)</p>
                </el-form-item>
                <el-form-item label="借款费率">
                    <el-input-number v-model="form.rate" :min="1" :max="100" label="借款费率"></el-input-number>
                    <p>(审核通过时填写)</p>
                </el-form-item>
                <el-form-item label="放款额度">
                    <el-input v-model="form.quota" style="width:160px;"></el-input>
                    <span style="margin-left:5px;">元</span>
                    <p>(审核通过时填写)</p>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="checkAccount(2)">不通过</el-button>
                <el-button type="primary" @click="checkAccount(1)">通过</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import { apiUserList,apiAccountCheck } from '@/service'
    export default {
        data() {
            return {
                tableData: [{
                  name: 'aaa'
                }],
                options: [{
                    id: '',
                    name: '全部'
                },{
                    id: 0,
                    name: '未认证'
                },{
                    id: 1,
                    name: '已完成认证'
                },{
                    id: 2,
                    name: '审核不通过'
                }],
                startTime: '',
                endTime: '',
                status: '',
                searchName: '',
                searchMobile: '',
                cur_page: 1,
                pageSize: 10,
                total: 0,
                select_cate: '',
                select_word: '',
                is_search: false,
                editVisible: false,
                dialogUpdate: false,
                form: {
                    remark: '审核不通过',
                    content: '',
                    rate: 10,
                    quota: ''
                },
                updateId: ''
            }
        },
        created() {
           this.getData();
        },
        computed: {
            token(){
             return {
               Authorization: `bearer ${localStorage.getItem('admin-token')}`
             }
           }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            serarchPage(){
              this.getData()
            },
            getData() {
                const data = {
                  size: this.pageSize,
                  page: this.cur_page 
                }
                // apiUserList(data)
                // .then((res) => {
                //     this.total = res.data.total
                // })
            },
            handleEdit(index,row){
              this.dialogUpdate = true
              this.updateId = row.id
            },
            checkAccount(status){
              let data = {
                customer_id: this.updateId,
                status: status
              }
              if(status == 1){
                if(this.form.quota == ''){
                  this.$message.error('审核通过需填写额度信息再提交')
                  return
                }
                if(this.form.rate == ''){
                  return
                  this.$message.error('审核通过需填写费率再提交')
                }
                data.quota = this.form.quota
                data.rate = this.form.rate
              }
              if(status == 2){
                if(this.form.remark == ''){
                  this.$message.error('审核不通过需填写返回app意见再提交')
                  return
                }
                if(this.form.content == ''){
                  this.$message.error('审核不通过需填写后台意见再提交')
                  return
                }
                data.front_remark = this.form.remark
                data.back_remark = this.form.content
              }
              apiAccountCheck(data)
              .then((res)=>{
                console.log('check',res)
                if(res.code == 200){
                   this.$message.success('操作成功')
                   this.dialogUpdate = false
                   this.getData()
                }else{
                  this.$message.error(res.message)
                }
              })
            },
            accountDetailPage(index,row){
              this.$router.push({
                path: 'account-detail?id='+row.id
              })
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
</style>
<style>
  .el-upload--text{
     border:none !important;
     text-align: left;
     margin-left: 10px;
     height:50px;
    }  
</style>
