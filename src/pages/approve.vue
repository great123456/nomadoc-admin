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
                <el-table-column label="是否免费">
                  <template slot-scope="props">
                    <span>{{props.course_type == 1 ? '免费':'收费'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="course_ticket_price" label="课程费用"></el-table-column>
                <el-table-column prop="course_share_money" label="分销价格"></el-table-column>
                <el-table-column prop="view_numbers" label="报名人数"></el-table-column>
                <el-table-column prop="course_introduce" label="课程介绍"></el-table-column>
                <el-table-column label="课程图片" width="130">
                  <template slot-scope="props">
                    <img :src="props.row.course_img" alt="" style="width:100px;height:auto;cursor:pointer;" @click="checkImage(props.row.course_img)">
                  </template>
                </el-table-column>
                <el-table-column prop="course_film" label="视频链接">
                  <template slot-scope="props">
                    <span @click="checkImage(props.row.course_film)" style="cursor:pointer;color:#00D1B2;">{{props.row.course_film}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                   <template slot-scope="scope">
                      <el-button
                         size="mini"
                         type="primary"
                         @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                      <el-button
                         size="mini"
                         type="danger"
                         @click="deleteCourse(scope.$index, scope.row)">删除</el-button>
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
                <el-form-item label="课程讲师">
                    <el-input v-model="form.course_lecturer"></el-input>
                </el-form-item>
                <el-form-item label="课程标题">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="课程分类">
                    <el-select v-model="form.course_category" placeholder="请选择课程分类" style="width:100%;">
                      <el-option
                        v-for="item in categoryList"
                        :key="item.id"
                        :label="item.cate_name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否免费">
                  <el-switch
                    v-model="form.course_type"
                    active-color="#13ce66">
                  </el-switch>
                </el-form-item>
                <el-form-item label="课程价格(元)">
                    <el-input v-model.number="form.price"></el-input>
                </el-form-item>
                <el-form-item label="分销价格(元)">
                    <el-input v-model.number="form.course_share_money"></el-input>
                </el-form-item>
                <el-form-item label="课程介绍">
                    <el-input v-model="form.remark" type="textarea"></el-input>
                    <p>(审核不通过时填写)</p>
                </el-form-item>
                <el-form-item label="课程图片">
                  <el-upload
                    class="upload-demo"
                    action="/admin/course/uploadimg"
                    :on-success="handleUploadSuccess"
                    :on-remove="handleRemoveMain"
                    name="file"
                    :headers="token"
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
                    action="/admin/course/uploadfilm"
                    :on-success="handleChangeMain"
                    :on-remove="handleRemoveMain"
                    name="file"
                    :headers="token"
                    multiple
                    :limit="1"
                    list-type="picture"
                    :file-list="fileList">
                    <el-button size="small" type="primary">上传课程视频</el-button>
                  </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogAdd = false">取消</el-button>
                <el-button type="primary" @click="saveCourse">添加</el-button>
            </span>
        </el-dialog>
        
        <!-- 编辑课程 -->
        <el-dialog title="课程编辑" :visible.sync="dialogUpdate" width="500px">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="课程讲师">
                    <el-input v-model="form.course_lecturer"></el-input>
                </el-form-item>
                <el-form-item label="课程标题">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="课程分类">
                    <el-select v-model="form.course_category" placeholder="请选择课程分类" style="width:100%;">
                      <el-option
                        v-for="item in categoryList"
                        :key="item.id"
                        :label="item.cate_name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否免费">
                  <el-switch
                    v-model="form.course_type"
                    active-color="#13ce66">
                  </el-switch>
                </el-form-item>
                <el-form-item label="课程价格(元)">
                    <el-input v-model.number="form.price"></el-input>
                </el-form-item>
                <el-form-item label="分销价格(元)">
                    <el-input v-model.number="form.course_share_money"></el-input>
                </el-form-item>
                <el-form-item label="课程介绍">
                    <el-input v-model="form.remark" type="textarea"></el-input>
                    <p>(审核不通过时填写)</p>
                </el-form-item>
                <el-form-item label="课程图片">
                  <el-upload
                    class="upload-demo"
                    action="/admin/course/uploadimg"
                    :on-success="handleUploadSuccess"
                    :on-remove="handleRemoveMain"
                    name="file"
                    :headers="token"
                    multiple
                    :limit="1"
                    :file-list="imgList"
                    list-type="picture">
                    <el-button size="small" type="primary">上传课程图片</el-button>
                  </el-upload>
                </el-form-item>
                
                <el-form-item label="课程视频">
                  <el-upload
                    class="upload-demo"
                    action="/admin/course/uploadfilm"
                    :on-success="handleChangeMain"
                    :on-remove="handleRemoveMain"
                    name="file"
                    :headers="token"
                    multiple
                    :limit="1"
                    list-type="picture"
                    :file-list="fileList">
                    <el-button size="small" type="primary">上传课程视频</el-button>
                  </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogUpdate = false">取消</el-button>
                <el-button type="primary" @click="uploadCourse">确定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import { apiCourseList, apiAddCourse, apiDeleteCourse, apiCourseDetail, apiCourseUpdate,apiAccountCategory } from '@/service'
    export default {
        data() {
            return {
                tableData: [],
                imgList: [],
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
                    price: 0,
                    course_share_money: 0,
                    course_lecturer: '',
                    course_film: '',
                    course_img: '',
                    course_category: '',
                    course_type: false
                },
                updateId: '',
                categoryList: []
            }
        },
        created() {
           this.getData()
           this.getCategoryList()
        },
        computed: {
            token(){
             return {
               Authorization: `${localStorage.getItem('admin-token')}`
             }
           }
        },
        methods: {
            handleUploadSuccess(res, file) {
              // console.log('img',res)
              if (res.code == 200) {
                this.$message.success('上传成功')
                this.form.course_img = res.data.url
              }else {
                this.$message.error(res.msg)
              }
            },
            handleChangeMain(res, file){
              if (res.code == 200) {
                this.$message.success('上传成功')
                this.form.course_film = res.data.url
              }else {
                this.$message.error(res.msg)
              }
            },
            handleRemoveMain(){

            },
            checkImage(url){
              window.open(url)
            },
            getCategoryList() {
              apiAccountCategory()
              .then((res) => {
                console.log('category',res)
                this.categoryList = res.data
              })
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
              console.log('row',row)
              this.dialogUpdate = true
              this.updateId = row.id
              this.form.remark = row.course_introduce
              this.form.name = row.course_title
              this.form.price = row.course_ticket_price
              this.form.course_share_money = row.course_share_money
              this.form.course_lecturer = row.course_lecturer
              this.form.course_category = row.course_category
              this.form.course_type = row.course_type == 1 ? true:false
              this.form.course_img = row.course_img
              this.form.course_film = row.course_film
              this.imgList = [{
                name: 'png',
                url: row.course_img
              }]
              this.fileList = [{
                name: 'mp4',
                url: row.course_film
              }]
              // this.gerCourseDetail()
            },
            gerCourseDetail(){
              apiCourseDetail({
                id: this.updateId
              })
              .then((res) => {
                console.log('detail',res)
              })
            },
            deleteCourse(index,row) { // 删除课程
              this.$confirm('确定删除当前课程?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                apiDeleteCourse({
                  id: row.id
                })
                .then((res) => {
                  if (res.code == 200) {
                     this.$message.success('删除成功')
                     this.getData()
                  }else{
                    this.$message.error(res.msg)
                  }
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              })
            },
            uploadCourse() { // 编辑课程
              const data = {
                 id: this.updateId,
                 course_title: this.form.name,
                 course_film: this.form.course_film,
                 course_img: this.form.course_img,
                 course_ticket_price: this.form.price,
                 course_type: this.form.course_type ? 1: 2,
                 course_lecturer: this.form.course_lecturer,
                 course_share_money: this.form.course_share_money,
                 course_introduce: this.form.remark,
                 course_category: this.form.course_category
               }
               apiCourseUpdate(data)
               .then((res) => {
                 if (res.code == 200) {
                   this.$message.success('修改成功')
                   this.dialogUpdate = false
                   this.getData()
                 }else {
                  this.$message.error(res.msg)
                 }
               })
            },
            addCourse(){ // 添加课程
              this.dialogAdd = true
              this.updateId = ''
              this.form.remark = ''
              this.form.name = ''
              this.form.price = ''
              this.form.course_share_money = ''
              this.form.course_lecturer = ''
              this.form.course_img = ''
              this.form.course_film = ''
              this.imgList = []
              this.fileList = []
            },
            saveCourse() {
              const data = {
                 course_title: this.form.name,
                 course_film: this.form.course_film,
                 course_img: this.form.course_img,
                 course_ticket_price: this.form.price,
                 course_type: this.form.course_type ? 1: 2,
                 course_lecturer: this.form.course_lecturer,
                 course_share_money: this.form.course_share_money,
                 course_introduce: this.form.remark,
                 course_category: this.form.course_category
               }
               apiAddCourse(data)
               .then((res) => {
                 if (res.code == 200) {
                   this.$message.success('添加成功')
                   this.dialogAdd = false
                   this.getData()
                 }else {
                  this.$message.error(res.msg)
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
