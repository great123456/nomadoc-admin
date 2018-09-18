<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>订单详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <p class="title">基础信息</p>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="created_at" label="借款人" sortable></el-table-column>
                <el-table-column prop="order" label="身份证"></el-table-column>
                <el-table-column prop="room_no" label="手机号"></el-table-column>
                <el-table-column prop="order_no" label="订单状态"></el-table-column>
                <el-table-column prop="total" label="紧急联系人"></el-table-column>
                <el-table-column prop="productName" label="联系电话"></el-table-column>
            </el-table>
            <p class="title">借款金额</p>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="created_at" label="借款金额" sortable></el-table-column>
                <el-table-column prop="order" label="借款周期"></el-table-column>
                <el-table-column prop="room_no" label="放款实际金额"></el-table-column>
                <el-table-column prop="order_no" label="银行"></el-table-column>
                <el-table-column prop="total" label="卡号"></el-table-column>
                <el-table-column prop="productName" label="预期天数"></el-table-column>
                <el-table-column prop="productName" label="预期金额"></el-table-column>
            </el-table>
            <p class="title">借条</p>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="created_at" label="贷款人" sortable></el-table-column>
                <el-table-column prop="order" label="身份证号"></el-table-column>
                <el-table-column prop="room_no" label="借条内容"></el-table-column>
                <el-table-column prop="order_no" label="借款人"></el-table-column>
            </el-table>
            <p class="title">放款时间</p>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="created_at" label="申请时间" sortable></el-table-column>
                <el-table-column prop="order" label="放款时间"></el-table-column>
                <el-table-column prop="room_no" label="到期时间"></el-table-column>
                <el-table-column prop="order_no" label="还款时间"></el-table-column>
                <el-table-column prop="total" label="借款次数"></el-table-column>
                <el-table-column prop="productName" label="信用评价"></el-table-column>
                <el-table-column prop="productName" label="审核描述"></el-table-column>
                <el-table-column prop="productName" label="放款描述"></el-table-column>
            </el-table>
            <el-button class="editor-btn" type="primary" @click="returnPage">返回</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'editor',
        data: function(){
            return {
                content: '',
                tableData: []
            }
        },
        methods: {
            returnPage(){
               this.$router.go(-1)
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