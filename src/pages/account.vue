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
                <el-table-column prop="user_id" label="用户id"></el-table-column>
                <el-table-column prop="create_time" label="注册时间"></el-table-column>
                <el-table-column prop="username" label="用户昵称"></el-table-column>
                <el-table-column prop="avatar_url" label="用户头像"></el-table-column>
                <el-table-column prop="phone_list_count" label="是否分销"></el-table-column>
                <el-table-column prop="ali_pay_count" label="上级用户"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    import { apiUserList } from '@/service'
    export default {
        data() {
            return {
                tableData: [],
                startTime: '',
                endTime: '',
                status: '',
                searchName: '',
                searchMobile: '',
                cur_page: 1,
                pageSize: 10,
                total: 0,
                is_search: false
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
                apiUserList(data)
                .then((res) => {
                    this.tableData = res.data.list
                    this.total = res.data.totalRows
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
