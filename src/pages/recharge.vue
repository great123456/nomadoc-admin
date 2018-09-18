<!-- 充值订单 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>充值订单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <el-input v-model="search" placeholder="请输入关键词查询" style="width:200px;"></el-input>
              <el-button type="primary" plain>搜索</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="name" label="订单日期"></el-table-column>
                <el-table-column prop="name" label="用户名"></el-table-column>
                <el-table-column prop="name" label="订单金额"></el-table-column>
                <el-table-column prop="name" label="充值方式"></el-table-column>
               <!--  <el-table-column label="操作">
                   <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>


    </div>
</template>

<script>
    import { apiServiceList,apiServiceListAdd,apiServiceListDelete,apiServiceListSave } from '@/service/index'
    export default {
        data() {
            return {
                fileList: [],
                tableData: [],
                cur_page: 1,
                pageSize: 10,
                total: 0,
                select_cate: '',
                select_word: '',
                is_search: false,
                editVisible: false,
                updateDialog: false,
                form: {
                    name: ''
                },
                search: '',
                deleteId: '',
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
           handleRemoveMain(file, fileList) {
                this.fileList = fileList
            },
            handleChangeMain(file, fileList){
              this.fileList = fileList
            },
            checkImage(url){
              window.open(url)
            },
            getData() {
                apiServiceList({
                  page: this.cur_page
                })
                .then((res) => {
                    this.tableData = res.data.list
                    this.total = res.data.total
                })
            },
            search() {
                this.is_search = true;
            },
            addSchool(){
              this.editVisible = true
              this.form.name = ''
              this.fileList = []
            },
            // 添加服务
            saveEdit() {
              if(this.form.name == ''){
                this.$message.error('产品名称不能为空')
                return
              }
              if(this.fileList.length == 0){
                this.$message.error('服务图片未上传')
                return
              }
              apiServiceListAdd({
                name: this.form.name,
                img: this.fileList[0].response.data.url,
                sort: 1
              })
              .then((res)=>{
                if(res.code == 200){
                  this.editVisible = false
                  this.$message.success('添加成功')
                  this.getData()
                }else{
                  this.$message.error(res.message)
                }
              })
            },
            handleEdit(index,row){
              this.updateDialog = true
              this.updateId = row.id
              this.form.name = row.name
            },
            updateService(){
              if(this.form.name == ''){
                this.$message.error('产品名称不能为空')
                return
              }
              if(this.fileList.length == 0){
                this.$message.error('服务图片未上传')
                return
              }
              apiServiceListSave({
                id: this.updateId,
                name: this.form.name,
                img: this.fileList[0].response.data.url,
                sort: 1
              })
              .then((res)=>{
                if(res.code == 200){
                  this.updateDialog = false
                  this.$message.success('修改成功')
                  this.getData()
                }else{
                  this.$message.error(res.message)
                }
              })
            },
            handleDelete(row){
              this.deleteId = row.id
              this.$confirm('确定删除当前菜谱?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                      }).then(() => {
                        this.deleteRow()
                      }).catch(() => {
                        this.$message({
                          type: 'info',
                          message: '已取消删除'
                        });          
                      })
            },
            // 确定删除
            deleteRow(){
               apiServiceListDelete({
                 id: this.deleteId
               })
               .then((res)=>{
                if(res.code == 200){
                  this.$message.success('删除成功')
                  this.getData()
                }else{
                  this.$message.error(res.message)
                }
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
