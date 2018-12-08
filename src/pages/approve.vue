<!-- 课程列表 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>课程列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <el-button type="primary" plain @click="addCourse">添加课程</el-button>
            </div>
            <div class="handle-box">
              <el-input v-model="searchName" placeholder="请输入课程名称" clearable style="width:200px;"></el-input>
              <el-input v-model="searchMobile" placeholder="请输入课程讲师" clearable style="width:200px;"></el-input>
              <div style="margin-left:10px;display:inline-block;"></div>
              <el-button type="primary" plain @click="serarchPage">搜索</el-button>
              <!-- <el-button type="primary" plain>导出</el-button> -->
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="id" label="课程id"></el-table-column>
                <el-table-column prop="create_time" label="创建日期"></el-table-column>
                <el-table-column prop="course_title" label="课程标题"></el-table-column>
                <el-table-column prop="course_lecturer" label="课程讲师"></el-table-column>
                <el-table-column prop="course_ticket_price" label="课程费用"></el-table-column>
                <el-table-column prop="course_share_money" label="分销价格"></el-table-column>
                <el-table-column prop="view_numbers" label="报名人数"></el-table-column>
                <el-table-column prop="course_introduce" label="课程介绍"></el-table-column>
                <el-table-column label="课程图片" width="130">
                  <template slot-scope="props">
                    <img :src="props.row.course_img" alt="" style="width:100px;height:auto;cursor:pointer;" @click="checkImage(props.row.course_img)">
                  </template>
                </el-table-column>
                <el-table-column prop="course_film" label="视频链接"></el-table-column>
                <el-table-column label="操作" width="150">
                   <template slot-scope="scope">
                      <el-button
                         size="mini"
                         type="primary"
                         @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                      <el-button
                         size="mini"
                         type="danger"
                         @click="accountDetailPage(scope.$index, scope.row)">删除</el-button>
                      <el-button
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>


        <!-- 添加课程 -->
        <el-dialog title="添加课程" :visible.sync="dialogAdd" width="500px">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="课程名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="课程标题">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="课程价格">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
                <el-form-item label="分销价格">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
                <el-form-item label="课程介绍">
                    <el-input v-model="form.remark" type="textarea"></el-input>
                    <p>(审核不通过时填写)</p>
                </el-form-item>
                <el-form-item label="课程图片">
                  <el-upload
                    class="upload-demo"
                    action="/api/admin/upload/img"
                    :on-change="handleChangeMain"
                    :on-remove="handleRemoveMain"
                    name="img"
                    multiple
                    :limit="1"
                    :file-list="fileList"
                    list-type="picture">
                    <el-button size="small" type="primary">上传课程图片</el-button>
                  </el-upload>
                </el-form-item>
                
                <el-form-item label="课程视频">
                  <el-upload
                    class="upload-demo"
                    action="/api/admin/upload/img"
                    :on-change="handleChangeMain"
                    :on-remove="handleRemoveMain"
                    name="img"
                    multiple
                    :limit="1"
                    :file-list="fileList"
                    list-type="picture">
                    <el-button size="small" type="primary">上传课程视频</el-button>
                  </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogAdd = false">取消</el-button>
                <el-button type="primary">添加</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import { apiCourseList } from '@/service'
    export default {
        data() {
            return {
                tableData: [],
                fileList: [],
                status: 1,
                searchName: '',
                searchMobile: '',
                cur_page: 1,
                pageSize: 10,
                total: 0,
                startTime: '',
                select_cate: '',
                select_word: '',
                is_search: false,
                editVisible: false,
                dialogAdd: false,
                dialogUpdate: false,
                form: {
                    remark: '',
                    name: '',
                    price: 0
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
            handleChangeMain(){

            },
            handleRemoveMain(){

            },
            checkImage(url){
              window.open(url)
            },
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
                  courseName: this.searchName,
                  teacher: this.searchMobile,
                  limit: this.pageSize,
                  page: this.cur_page 
                }
                apiCourseList(data)
                .then((res) => {
                    this.tableData = res.data.list
                    this.total = res.data.totalRows
                })
            },
            handleEdit(index,row){
              this.dialogUpdate = true
              this.updateId = row.id
            },
            checkAccount(status){
  
            },
            addCourse(){ // 添加课程
              this.dialogAdd = true
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
