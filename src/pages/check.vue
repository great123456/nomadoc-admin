<!-- 菜品管理 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>人工降重</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
             <!--  <el-select v-model="cateId" placeholder="请选择菜谱" @change="selectCook">
                  <el-option
                    v-for="item in cateList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
              </el-select>
              <el-button type="primary" plain @click="addSchool">添加菜品</el-button> -->
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="date" label="订单日期"></el-table-column>
                <el-table-column prop="price" label="订单价格"></el-table-column>
                <el-table-column prop="type" label="降重类型"></el-table-column>
                <el-table-column prop="created_ata" label="用户名"></el-table-column>
                <el-table-column prop="created_ata" label="订单编号"></el-table-column>
                <el-table-column label="操作">
                   <template slot-scope="scope">
                      <el-button
                         size="mini"
                         type="primary"
                         @click="">下载</el-button>
                      <el-button
                         size="mini"
                         type="primary"
                         @click="">上传</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    import { apiCookbookList,apiMenuListAdd,apiMenuList,apiMenuListDelete,apiMenuListSave,apiMenuListDetail} from '@/service/index'
    export default {
        data() {
            return {
                cateList: [],
                cateId: '',
                fileList: [],
                tableData: [{
                  date: '2018-10-03'
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
                    price: '',
                    date: '',
                    time1: '',
                    time2:'',
                    desc: ''
                },
                deleteId: '',
                updateId: ''
            }
        },
        created() {
            
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
            getData() {
                apiMenuList({
                  id: this.cateId,
                  page: 1
                })
                .then((res) => {
                    console.log('res',res.data)
                    this.tableData = res.data.list
                    this.total = res.data.total
                })
            },
            // 确定删除
            handleDelete(){
              
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
