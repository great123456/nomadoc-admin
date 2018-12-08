<!-- 课程订单 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>课程订单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
               <el-select v-model="status" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
              </el-select>
              <el-input v-model="searchName" clearable placeholder="请输入用户名" style="width:190px;"></el-input>
              <span>订单日期:</span>
              <el-date-picker
                v-model="startTime"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <el-button type="primary" plain @click="serarchPage">搜索</el-button>
            </div>
            <!-- <div style="margin-bottom:20px;">
                <span>借款总计:</span>
            </div> -->
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="created_at" label="订单日期" sortable></el-table-column>
                <el-table-column prop="order_no" label="订单编号"></el-table-column>
                <el-table-column prop="customer.name" label="用户昵称"></el-table-column>
                <el-table-column prop="loan_amount" label="订单金额"></el-table-column>
                <el-table-column prop="into_amount" label="课程名称"></el-table-column>
                <el-table-column prop="loan_at" label="课程讲师"></el-table-column>
                <el-table-column prop="repaymen_at" label="订单类型"></el-table-column>
                <el-table-column label="操作" width="230">
                   <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="primary"
                        @click="ordreDetailPage(scope.row)">详情</el-button>
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
    import { apiCourseList } from '@/service'
    export default {
        data() {
            return {
                dialogUpdate: false,
                dialogDelay: false,
                status: '',
                startTime: '',
                endTime: '',
                options: [{
                    id: '',
                    name: '全部'
                },{
                    id: 0,
                    name: '自然订单'
                },{
                    id: 1,
                    name: '分销订单'
                }],
                searchName: '',
                searchMobile: '',
                typeId: 1,
                tableData: [{
                  created_at: '2018-10-03'
                }],
                cur_page: 1,
                pageSize: 10,
                total: 0,
                select_cate: '',
                select_word: '',
                is_search: false,
                form: {
                  remark: ''
                },
                updateId: '',
                period: 1,
                delayFee: 0,
                delayAccount: 0,
                delay_to: '',
                delay_fee: '',
                multipleSelection: []
            }
        },
        created() {
            this.getData();
        },
        computed: {

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
                  limit: this.pageSize,
                  page: this.cur_page
                }
                apiCourseList(data)
                .then((res) => {
                  this.total = res.data.total
                })
            },
            ordreDetailPage(row){
               this.$router.push({
                 path: '/detail?id='+row.id
               })
            },
            selectType(){
              this.getData()
            },
            search() {
                this.is_search = true;
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
