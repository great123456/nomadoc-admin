<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>订单详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <p class="title">基础信息</p>
            <el-table :data="basic" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="name" label="借款人" sortable></el-table-column>
                <el-table-column prop="id_card" label="身份证"></el-table-column>
                <el-table-column prop="phone" label="手机号"></el-table-column>
                <el-table-column prop="is_auth" label="认证状态"></el-table-column>
            </el-table>
            <p class="title">银行卡数据</p>
            <el-table :data="bank" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="created_at" label="日期" sortable></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="id_card" label="身份证"></el-table-column>
                <el-table-column prop="bank_card" label="银行卡号"></el-table-column>
                <el-table-column prop="bank_name" label="银行名称"></el-table-column>
                <el-table-column prop="mobile" label="电话"></el-table-column>
            </el-table>
            <p class="title">身份证信息</p>
            <el-table :data="card" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="created_at" label="日期" sortable></el-table-column>
                <el-table-column label="身份证正面">
                  <template slot-scope="props">
                    <img :src="props.row.front" alt="" style="width:100px;height:auto;cursor:pointer;" @click="checkImage(props.row.front)">
                  </template>
                </el-table-column>
                <el-table-column label="身份证反面">
                  <template slot-scope="props">
                    <img :src="props.row.back" alt="" style="width:100px;height:auto;cursor:pointer;" @click="checkImage(props.row.back)">
                  </template>
                </el-table-column>
                <el-table-column label="人身照">
                  <template slot-scope="props">
                    <img :src="props.row.people" alt="" style="width:100px;height:auto;cursor:pointer;" @click="checkImage(props.row.people)">
                  </template>
                </el-table-column>
            </el-table>
            <p class="title">运营商数据</p>
            <el-table :data="mobile" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="created_at" label="日期" sortable></el-table-column>
                <el-table-column prop="carrier" label="运营商"></el-table-column>
            </el-table>
            <p class="title">支付宝信息</p>
            <el-table :data="ali_pay" border style="width: 100%">
                <el-table-column prop="created_at" label="日期" sortable></el-table-column>
                <el-table-column prop="nickname" label="昵称"></el-table-column>
                <el-table-column prop="account" label="账号"></el-table-column>
                <el-table-column prop="score" label="芝麻分"></el-table-column>
                <el-table-column prop="limit" label="花呗额度"></el-table-column>
            </el-table>
            <p class="title">认证信息</p>
            <el-table :data="examine" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="created_at" label="日期" sortable></el-table-column>
                <el-table-column prop="front_remark" label="返回给 app 的意见"></el-table-column>
                <el-table-column prop="back_remark" label="后台意见"></el-table-column>
                <el-table-column prop="quota" label="额度"></el-table-column>
                <el-table-column prop="rate" label="费率"></el-table-column>
            </el-table>
            <p class="title">放款信息</p>
            <el-table :data="approve" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="created_at" label="创建日期" sortable></el-table-column>
                <el-table-column prop="order_no" label="订单编号"></el-table-column>
                <el-table-column prop="status" label="审核状态"></el-table-column>
                <el-table-column prop="loan_amount" label="借款金额"></el-table-column>
                <el-table-column prop="into_amount" label="放款金额"></el-table-column>
                <el-table-column prop="rate" label="费率"></el-table-column>
                <el-table-column prop="repaymen_at" label="该还款日期"></el-table-column>
                <el-table-column prop="status_remark" label="审核不通过说明"></el-table-column>
                <el-table-column prop="loan_remark" label="放款说明"></el-table-column>
                <el-table-column prop="return_at" label="实际还款时间"></el-table-column>
                <el-table-column prop="is_late" label="是否逾期">
                  <template slot-scope="scope">
                    <span style="color:#f73e2f;" v-if="scope.row.is_late == 1">已逾期</span>
                    <span style="color:#00D1B2;" v-else>未逾期</span>
                  </template>
                </el-table-column>
            </el-table>
            <p class="title">通讯录数据</p>
            <el-table :data="contacts" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="created_at" label="日期" sortable></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="phone" label="电话"></el-table-column>
            </el-table>
            <el-button class="editor-btn" type="primary" @click="returnPage">返回</el-button>
        </div>
    </div>
</template>

<script>
    import { apiOrderDetail } from '@/service'
    export default {
        name: 'editor',
        data: function(){
            return {
                content: '',
                tableData: [],
                basic: [],
                bank: [],
                card: [],
                mobile: [],
                ali_pay: [],
                contacts: [],
                examine: [],
                approve: [],
                id: this.$route.query.id||''
            }
        },
        watch:{
           $route(newValue, oldValue){
               if(newValue.path == '/detail'){
                 this.id = newValue.query.id
                 this.getOrderDetail()
               }
           }
        },
        mounted(){
            this.id = this.$route.query.id
            this.getOrderDetail()
        },
        methods: {
            returnPage(){
               this.$router.go(-1)
            },
            getOrderDetail(){
              this.basic = []
              this.bank = []
              this.card = []
              this.mobile = []
              this.examine = []
              this.ali_pay = []
              apiOrderDetail({
                customer_id: this.id
              })
              .then((res)=>{
                console.log('detail',res)
                let detail = res.data
                if(detail.is_auth == 0){
                  detail.is_auth = '未认证'
                }
                if(detail.is_auth == 1){
                  detail.is_auth = '已认证'
                }
                if(detail.is_auth == 2){
                  detail.is_auth = '审核不通过'
                }
                let basic = {
                  name: detail.name?detail.name:detail.phone,
                  phone: detail.phone,
                  id_card: detail.bank_card.id_card,
                  created_at: detail.created_at,
                  is_auth: detail.is_auth
                }
                this.basic.push(basic)
                console.log('basic',this.basic)
                if(detail.ali_pay){
                  this.ali_pay.push(detail.ali_pay)
                }
                if(detail.bank_card){
                    this.bank.push(detail.bank_card)
                }
                if(detail.id_card){
                   detail.id_card.front = 'https://walletapi.hxgtech.com'+detail.id_card.front
                   detail.id_card.back = 'https://walletapi.hxgtech.com'+detail.id_card.back
                   detail.id_card.people = 'https://walletapi.hxgtech.com'+detail.id_card.people
                   this.card.push(detail.id_card)
                }
                if(detail.mobile_carrier){
                    this.mobile.push(detail.mobile_carrier)
                }
                this.contacts = detail.phone_list
                if(detail.examine){
                    this.examine.push(detail.examine)
                }
                if(detail.loans){
                   detail.loans.forEach(function(item){
                      switch (item.status) {
                          case 0:
                              item.status = '待审核';
                              break;
                          case 1:
                              item.status = '审核通过待放款';
                              break;
                          case 2:
                              item.status = '审核不通过';
                              break;
                          case 3:
                              item.status = '已放款';
                              break;
                          default:
                              item.status = '已还款';
                              break;
                      }
                    })
                   this.approve = detail.loans
                }
              })
            }
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 10px;
    }
    .title{
        margin-bottom: 20px;
        margin-top: 20px;
    }
</style>