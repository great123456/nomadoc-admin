<!-- 用户审核 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>用户审核</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <el-input v-model="searchName" placeholder="请输入姓名" style="width:200px;"></el-input>
              <el-input v-model="searchName" placeholder="请输入手机号" style="width:200px;"></el-input>
              <el-button type="primary" plain>搜索</el-button>
              <el-button type="primary" plain>导出</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="name" label="用户id"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="name" label="手机号码"></el-table-column>
                <el-table-column prop="name" label="实名认证"></el-table-column>
                <el-table-column prop="name" label="运营商认证"></el-table-column>
                <el-table-column prop="name" label="通讯录认证"></el-table-column>
                <el-table-column prop="name" label="支付宝认证"></el-table-column>
                <el-table-column prop="name" label="订单时间"></el-table-column>
                <el-table-column prop="name" label="审核状态"></el-table-column>
                <el-table-column label="操作">
                   <template slot-scope="scope">
                      <el-button
                         size="mini"
                         type="primary"
                         @click="handleEdit(scope.$index, scope.row)">审核</el-button>
                      <el-button
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>


        <!-- 审核信息 -->
        <el-dialog title="审核信息" :visible.sync="dialogUpdate" width="500px">
            <!-- <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="账号名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="账号密码">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form> -->
            <span slot="footer" class="dialog-footer">
                <el-button type="danger">不通过</el-button>
                <el-button type="primary" @click="updateCookBook">通过</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import { apiAddCookbook,apiCookbookList,apiCookbookDelete,apiCookbookSave } from '@/service'
    export default {
        data() {
            return {
                fileList: [],
                tableData: [{
                  name: 'aaa'
                }],
                cur_page: 1,
                pageSize: 10,
                total: 0,
                select_cate: '',
                select_word: '',
                is_search: false,
                editVisible: false,
                dialogUpdate: false,
                form: {
                    name: '',
                    address: ''
                },
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
                apiCookbookList({
                  page: this.cur_page
                })
                .then((res) => {
                    this.tableData = res.data.list
                    this.total = res.data.total
                })
            },
            addSchool(){
              this.editVisible = true
              this.form.name = ''
              this.fileList = []
            },
            // 添加菜谱
            saveEdit() {
              if(this.form.name == ''){
                this.$message.error('菜谱名称不能为空')
                return
              }
              if(this.fileList.length == 0){
                this.$message.error('菜谱图标未上传')
                return
              }
              apiAddCookbook({
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
              this.dialogUpdate = true
              this.form.name = row.name
              this.updateId = row.id
              this.fileList = []
            },
            updateCookBook(){
               if(this.form.name == ''){
                 this.$message.error('菜谱名称不能为空')
                 return
               }
               if(this.fileList.length == 0){
                 this.$message.error('菜谱图标未上传')
                 return
               }
               apiCookbookSave({
                 id: this.updateId,
                 name: this.form.name,
                 img: this.fileList[0].response.data.url,
                 sort: 1
               })
               .then((res)=>{
                  if(res.code == 200){
                    this.dialogUpdate = false
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
              apiCookbookDelete({
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
