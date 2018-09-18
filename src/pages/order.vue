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
              <el-input v-model="searchName" placeholder="请输入姓名" style="width:200px;"></el-input>
              <el-input v-model="searchName" placeholder="请输入手机号" style="width:200px;"></el-input>
              <el-button type="primary" plain>搜索</el-button>
              <el-button type="primary" plain>导出</el-button>
            </div>
            <div style="margin-bottom:20px;">
                <span>借款总计:</span>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="created_at" label="订单日期" sortable></el-table-column>
                <el-table-column prop="order" label="订单编号"></el-table-column>
                <el-table-column prop="room_no" label="借款人"></el-table-column>
                <el-table-column prop="order_no" label="信用额度"></el-table-column>
                <el-table-column prop="total" label="借款金额"></el-table-column>
                <el-table-column prop="productName" label="放款金额"></el-table-column>
                <el-table-column prop="productPrice" label="借款手续费"></el-table-column>
                <el-table-column prop="productPrice" label="借款周期"></el-table-column>
                <el-table-column prop="remark" label="申请周期"></el-table-column>
                <el-table-column prop="remark" label="放款日期"></el-table-column>
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
                <el-form-item label="姓名:" style="width:250px;">
                   <span>张三</span>
                </el-form-item>
                <el-form-item label="手机号:" style="width:250px;">
                   <span>张三</span>
                </el-form-item>
                <div style="width:100%;height:1px;backgroud:red:"></div>
                <el-form-item label="身份证号:" style="width:250px;">
                   <span>张三</span>
                </el-form-item>
                <el-form-item label="芝麻分:" style="width:250px;">
                   <span>张三</span>
                </el-form-item>
                <el-form-item label="花呗额度:" style="width:250px;">
                   <span>张三</span>
                </el-form-item>
                <el-form-item label="开户行:" style="width:250px;">
                   <span>张三</span>
                </el-form-item>
                <el-form-item label="卡号:" style="width:250px;">
                   <span>张三</span>
                </el-form-item>
                <el-form-item label="实名认证:" style="width:250px;">
                   <span>张三</span>
                </el-form-item>
                <el-form-item label="运营商认证:" style="width:250px;">
                   <span>张三</span>
                </el-form-item>
                <el-form-item label="借款金额:" style="width:250px;">
                   <span>张三</span>
                </el-form-item>
                <el-form-item label="借款周期:" style="width:250px;">
                   <span>张三</span>
                </el-form-item>
                <el-form-item label="预期天数:" style="width:250px;">
                   <span>张三</span>
                </el-form-item>
                <el-form-item label="预期滞纳金:" style="width:250px;">
                   <span>张三</span>
                </el-form-item>
                <el-form-item label="放款时间:" style="width:250px;">
                   <span>张三</span>
                </el-form-item>
                <el-form-item label="还款期限:" style="width:250px;">
                   <span>张三</span>
                </el-form-item>
                <el-form-item label="借款费率:">
                   <el-select v-model="form.account">
                        <el-option label="20%" value="0"></el-option>
                        <el-option label="30%" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="借款额度:">
                   <el-select v-model="form.account">
                        <el-option label="3000" value="0"></el-option>
                        <el-option label="5000" value="1"></el-option>
                    </el-select>
                </el-form-item>
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
                typeList: [{
                    label: '美食订单',
                    id: 1
                },{
                    label: '服务订单',
                    id: 2
                }],
                dialogUpdate: false,
                searchName: '',
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
            getData() {
                apiOrderList({
                    type: this.typeId,
                    page: this.cur_page
                })
                .then((res) => {
                    console.log('res-order',res.data)
                    this.tableData = res.data.list
                    this.tableData.forEach(function(item){
                        item.type = item.type == 1?'美食订单':'服务订单'
                        item.productName = item.detail[0].name
                        item.productPrice = item.detail[0].price
                        item.productAmount = item.detail[0].amount
                    })
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
