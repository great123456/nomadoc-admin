<!-- 借款订单 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>借款订单</el-breadcrumb-item>
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
              <el-input v-model="searchName" placeholder="请输入姓名" style="width:200px;"></el-input>
              <el-input v-model="searchMobile" placeholder="请输入手机号" style="width:200px;"></el-input>
              <el-button type="primary" plain>搜索</el-button>
              <el-button type="primary" plain>导出</el-button>
            </div>
            <div style="margin-bottom:20px;">
                <span>借款总计:</span>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="created_at" label="订单日期" sortable></el-table-column>
                <el-table-column prop="order_no" label="订单编号"></el-table-column>
                <el-table-column prop="room_no" label="借款人"></el-table-column>
                <el-table-column prop="loan_amount" label="借款金额"></el-table-column>
                <el-table-column prop="into_amount" label="放款金额"></el-table-column>
                <el-table-column prop="rate" label="费率"></el-table-column>
                <el-table-column prop="repaymen_at" label="该还款日期"></el-table-column>
                <el-table-column prop="remark" label="还款次数"></el-table-column>
                <el-table-column prop="remark" label="状态"></el-table-column>
                 <el-table-column label="操作" width="200">
                   <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="primary"
                        @click="checkInfo(scope.row)">审核</el-button>
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
        

         <!-- 审核信息 -->
        <el-dialog title="审核订单" :visible.sync="dialogUpdate" width="600px">
            <el-form ref="form" :inline="true" :model="form" label-width="90px">
                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger">审核不通过</el-button>
                <el-button type="primary">审核通过</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import { apiOrderList } from '@/service'
    export default {
        data() {
            return {
                dialogUpdate: false,
                status: '',
                options: [{
                    id: '',
                    name: '全部'
                },{
                    id: 0,
                    name: '待审核'
                },{
                    id: 1,
                    name: '审核通过待放款'
                },{
                    id: 2,
                    name: '审核不通过'
                },{
                    id: 3,
                    name: '已放款'
                },{
                   id: 4,
                   name: '已还款' 
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
                  name: '',
                  account: ''
                }
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
                    console.log('res-order',res.data)
                    this.tableData = res.data.list
                    this.total = res.data.total
                })
            },
            checkInfo(){
              this.dialogUpdate = true
            },
            ordreDetailPage(){
               this.$router.push({
                 path: 'detail'
               })
            },
            selectType(){
              this.getData()
            },
            search() {
                this.is_search = true;
            },
            // 保存编辑
            saveEdit() {

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
