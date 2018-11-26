<!-- banner管理 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>banner管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <el-button type="primary" plain @click="addBanner">添加banner</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column label="banner">
                  <template slot-scope="props">
                    <img :src="props.row.img" alt="" style="width:100px;height:auto;cursor:pointer;" @click="checkImage(props.row.img)">
                  </template>
                </el-table-column>
                 <el-table-column label="操作">
                   <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                 </el-table-column>
            </el-table>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="上传图片" :visible.sync="addVisible" width="500px">
            <el-upload
              class="upload-demo"
              action="/api/admin/upload/img"
              :on-change="handleChangeMain"
              :on-remove="handleRemoveMain"
              name="img"
              multiple
              :limit="1"
              :headers="token"
              :file-list="fileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">添加</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
                 img: 'aaa'
                }],
                fileList: [],
                cur_page: 1,
                fileName:'',
                schoolId:'',
                addVisible: false,
                delVisible: false,
                imageUrl: '',
                deleteId: ''
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
            selectChange(){
              this.getData()
            },
            checkImage(url){
              window.open(url)
            },
            getData(){
              const self = this
              // apiBannerList({
              //   type: this.bannerType,
              //   page: this.cur_page
              // })
              // .then((res) => {
              //     self.tableData = res.data.list
              // })
            },
            addBanner(){
              this.addVisible = true
              this.fileList = []
            },
            // 添加banner
            saveEdit() {
              const self = this
            },
            handleDelete(row){
               this.deleteId = row.id
               this.$confirm('确定删除当前banner?', '提示', {
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
              
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 200px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .file-put{
            margin-top:10px;
            margin-left: 20px;
            position: relative;
            width: 90px;
            height: 26px;
            border: 1px solid #99D3F5;
            overflow: hidden;
            color: #ffffff;
            text-decoration: none;
            text-indent: 0;
            line-height: 26px;
            background: #409EFF;
            cursor: pointer;
            text-align: center;
            input{
              position: absolute;
              font-size: 16px;
              right: 0;
              top: 0;
              opacity: 0;
              cursor: pointer;
            }
          }
          .file-name{
            text-indent:20px;
          }
</style>
