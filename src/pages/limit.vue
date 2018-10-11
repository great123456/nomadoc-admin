<!-- 逾期订单 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>逾期订单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <el-input v-model="searchName" clearable placeholder="请输入姓名" style="width:200px;"></el-input>
              <el-input v-model="searchMobile" clearable placeholder="请输入手机号" style="width:200px;"></el-input>
              <el-button type="primary" plain @click="serarchPage">搜索</el-button>
              <el-button type="primary" plain>导出</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="created_at" label="订单日期" sortable></el-table-column>
                <el-table-column prop="order_no" label="订单编号"></el-table-column>
                <el-table-column prop="customer.name" label="借款人"></el-table-column>
                <el-table-column prop="customer.phone" label="手机号"></el-table-column>
                <el-table-column prop="loan_amount" label="借款金额"></el-table-column>
                <el-table-column prop="into_amount" label="放款金额"></el-table-column>
                <el-table-column prop="rate" label="费率"></el-table-column>
                <el-table-column prop="repaymen_at" label="该还款日期"></el-table-column>
                <el-table-column prop="return_at" label="实际还款时间"></el-table-column>
                <el-table-column prop="return_ata" label="逾期天数"></el-table-column>
                <el-table-column prop="return_at" label="逾期费用"></el-table-column>
                 <el-table-column label="操作" width="200">
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
    import { apiOrderList,apiOrderCheck } from '@/service'
    export default {
        data() {
            return {
                dialogUpdate: false,
                status: '',
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
                updateId: ''
            }
        },
        created() {
            //this.getData();
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
                  size: this.pageSize,
                  page: this.cur_page 
                }
                if(this.searchName){
                    data.name = this.searchName
                }
                if(this.searchMobile){
                    data.mobile = this.searchMobile
                }
                if(this.status != ''){
                    data.status = this.status
                }
                apiOrderList(data)
                .then((res) => {
                    this.tableData = res.data.list
                    this.tableData.forEach(function(item){
                      item.customer.name = item.customer.name?item.customer.name:item.customer.phone
                    })
                    console.log('res-order',this.tableData)
                    this.total = res.data.total
                })
            },
            checkInfo(row){
              console.log('row',row)
              this.updateId = row.id
              this.dialogUpdate = true
            },
            ordreDetailPage(row){
               this.$router.push({
                 path: 'detail?id='+row.id
               })
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
