<!-- 论文检测类型 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>检测类型</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <!-- <el-select v-model="cateId" placeholder="请选择客房服务" @change="selectService">
                  <el-option
                    v-for="item in cateList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
              </el-select>
              <el-button type="primary" plain @click="addSchool">添加服务产品</el-button> -->
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="type" label="检测类型" sortable></el-table-column>
                <el-table-column prop="name" label="原价"></el-table-column>
                <el-table-column prop="price" label="现价"></el-table-column>
                
                <el-table-column label="操作">
                   <template slot-scope="scope">
                      <el-button
                         size="mini"
                         type="primary"
                         @click="handleEdit(scope.$index, scope.row)">设置价格</el-button>
                     <!--  <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>


        <!-- 修改检测类型价格 -->
        <el-dialog title="编辑价格" :visible.sync="updateDialog" width="500px">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="价格">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateDialog = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">修改</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
  import { apiServiceList,apiServiceProList,apiServiceProListAdd,apiServiceProListDelete,apiServiceProListSave } from '@/service/index'
    export default {
        data() {
            return {
                cateList: [],
                cateId: '',
                fileList: [],
                tableData: [{
                  type: '万方'
                }],
                cur_page: 1,
                pageSize: 10,
                total: 0,
                select_cate: '',
                select_word: '',
                is_search: false,
                editVisible: false,
                updateDialog: false,
                form: {
                    name: '',
                    price: ''
                },
                deleteId: '',
                updateId: ''
            }
        },
        created() {
            this.getServiceList()
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
            getServiceList(){
               apiServiceList()
                .then((res) => {
                    this.cateList = res.data.list
                    if(this.cateList.length>0){
                      this.cateId = this.cateList[0].id
                      this.getData()
                    }
                })
            },
            selectService(){
               this.getData()
            },
            getData() {
                const self = this
                apiServiceProList({
                  id: this.cateId,
                  page: this.cur_page
                })
                .then((res) => {
                    self.tableData = res.data.list
                    self.total = res.data.total
                })
            },
            search() {
                this.is_search = true;
            },
            addSchool(){
              if(this.cateId == ''){
                this.$message('请先选择一个服务')
                return
              }
              this.editVisible = true
              this.form.name = ''
              this.form.price = ''
              this.fileList = []
            },
            // 添加服务产品
            saveEdit() {
              if(this.form.name == ''){
                this.$message.error('产品名称不能为空')
                return
              }
              if(this.form.price == ''){
                this.$message.error('产品价格不能为空')
                return
              }
              if(this.fileList.length == 0){
                this.$message.error('产品图片未上传')
                return
              }
              apiServiceProListAdd({
                name: this.form.name,
                img: this.fileList[0].response.data.url,
                price: this.form.price,
                sort: 1,
                service_id: this.cateId
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
              this.form.price = row.price
            },
            updateServiceManage(){
              if(this.form.name == ''){
                this.$message.error('产品名称不能为空')
                return
              }
              if(this.form.price == ''){
                this.$message.error('产品价格不能为空')
                return
              }
              if(this.fileList.length == 0){
                this.$message.error('产品图片未上传')
                return
              }
              apiServiceProListSave({
                id: this.updateId,
                name: this.form.name,
                img: this.fileList[0].response.data.url,
                price: this.form.price,
                sort: 1,
                service_id: this.cateId
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
              apiServiceProListDelete({
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
