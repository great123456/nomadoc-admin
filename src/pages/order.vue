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
                        @click="checkInfo(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>
        

        <!-- 审核信息 -->
        <el-dialog title="审核订单" :visible.sync="dialogUpdate" width="500px">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="审核不通过说明">
                    <el-input v-model="form.remark" type="textarea"></el-input>
                    <p>(审核不通过时填写)</p>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" size="mini" @click="checkOrder(2)">审核不通过</el-button>
                <el-button type="primary" size="mini" @click="checkOrder(1)">审核通过</el-button>
            </span>
        </el-dialog>

        <!-- 延期 -->
        <el-dialog title="延期确认" :visible.sync="dialogDelay" width="500px">
            <el-form label-width="100px">
                <el-form-item label="延期时间">
                  <el-date-picker
                    v-model="delay_to"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="延期费用">
                    <!-- <span>{{delayFee}}元</span> -->
                    <el-input v-model="delay_fee" style="width:160px;marign-right:3px;"></el-input>元
                </el-form-item>
                <!-- <el-form-item label="延期数">
                   <el-input-number v-model="period" @change="handleChange" :min="1" :max="10"></el-input-number>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogDelay = false">取消</el-button>
                <el-button type="primary" @click="comfirmDelayOrder">确认延期</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import { apiOrderList,apiOrderCheck,apiOrderDelay,apiOrdersendMessage } from '@/service'
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
            exportOrderList(){
              window.location.href = 'http://wallet.hxgtech.com'+'/api/admin/loan/excel?token='+`${localStorage.getItem('admin-token')}`
            },
            serarchPage(){
              this.getData()
            },
            handleSelectionChange(val){
              this.multipleSelection = val
            },
            sendMessage(){ //群发信息
              console.log(this.multipleSelection)
              if(!this.multipleSelection.length){
                this.$message('请先选择群发用户')
                return
              }
              let ids = []
              this.multipleSelection.forEach(function(item){
                ids.push(item.id)
              })
              this.$confirm('确认给选择用户群发信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    apiOrdersendMessage({
                      id: ids.join(',')
                    })
                    .then((res)=>{
                       if(res.code == 200){
                          this.$message.success('群发成功')
                       }else{
                         this.$message.error(res.message)
                       }
                    })
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消群发操作'
                    });          
              });
            },
            getData() {
                const data = {
                  size: this.pageSize,
                  page: this.cur_page
                }
                // apiOrderList(data)
                // .then((res) => {
                //   this.total = res.data.total
                // })
            },
            handleChange(value) {
              this.delayFee = this.delayAccount*value
            },
            delayOrder(row){   //延期还款
              this.dialogDelay = true
              this.periodId = row.id
              this.period = 1
              this.delayFee = parseFloat(row.loan_amount) - parseFloat(row.into_amount)
              this.delayAccount = parseFloat(row.loan_amount) - parseFloat(row.into_amount)
            },
            comfirmDelayOrder(){
               apiOrderDelay({
                 id: this.periodId,
                 delay_fee: this.delay_fee,
                 delay_to: this.delay_to
               })
               .then((res)=>{
                if(res.code == 200){
                   this.$message.success('操作成功')
                   this.dialogDelay = false
                   this.getData()
                }else{
                  this.$message.error(res.message)
                }
              })
            },
            setUserState(row,type){
               this.updateId = row.id
               if(type == 3){
                 this.$confirm('确认已经放款给用户?', '提示', {
                           confirmButtonText: '确定',
                           cancelButtonText: '取消',
                           type: 'warning'
                         }).then(() => {
                           this.checkOrder(3)
                         }).catch(() => {
                           this.$message({
                             type: 'info',
                             message: '已取消操作'
                           });          
                         });
               }
               if(type == 4){
                 this.$confirm('确认用户已经完成还款?', '提示', {
                           confirmButtonText: '确定',
                           cancelButtonText: '取消',
                           type: 'warning'
                         }).then(() => {
                           this.checkOrder(4)
                         }).catch(() => {
                           this.$message({
                             type: 'info',
                             message: '已取消操作'
                           });          
                         });
               }
            },
            checkOrder(status){
              let data = {
                id: this.updateId,
                status: status
              }
              if(status == 2){
                if(this.form.remark == ''){
                  this.$message.error('审核不通过需填写不通过意见信息')
                  return
                }
                data.status_remark = this.form.remark
              }
              apiOrderCheck(data)
              .then((res)=>{
                console.log('check',res)
                if(res.code == 200){
                   this.$message.success('操作成功')
                   this.dialogUpdate = false
                   this.getData()
                }else{
                  this.$message.error(res.message)
                }
              })
            },
            checkInfo(row){
              // console.log('row',row)
              // this.updateId = row.id
              // this.dialogUpdate = true
            },
            ordreDetailPage(row){
               this.$router.push({
                 path: 'detail?id='+row.customer_id
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
