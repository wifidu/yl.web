<template>
  <div class="app-container" >
    <el-card class="filter-container" shadow="never">
      <div style="margin-top: 15px">
        <el-form :inline="true" size="small">
          <el-select v-model="valueName" size="small" style="width: 125px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-form-item>
            <el-input v-model="input" placeholder="请输入搜索内容" style="width: 250px"></el-input>
          </el-form-item>
          <el-button type="info" icon="el-icon-search" size="small"></el-button>
        </el-form>
        <span>时间</span>
        <el-date-picker
            size="small"
            v-model="plan_s"
            type="datetime"
            align="right"
            placeholder="开始">
        </el-date-picker>
        <i class="el-icon-caret-right"></i>
        <el-date-picker
            size="small"
            v-model="plan_e"
            type="datetime"
            align="right"
            placeholder="结束">
        </el-date-picker>
      </div>
    </el-card>
    <el-table :data="value"
              v-loading="listLoading"
              style="margin-top: 15px;width:100%"
              border>
      <el-table-column label="业务时间" align="center">
        <template slot-scope="scope">{{scope.business_time}}</template>
      </el-table-column>
      <el-table-column label="退款单号" align="center" width="200px">
        <template slot-scope="scope">{{scope.refund_amount}}</template>
      </el-table-column>
<!--      <el-table-column label="会员姓名" align="center">-->
<!--        <template slot-scope="scope">{{scope.account.member_name}}</template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="床位" prop="bed" align="center">-->
<!--        <template slot-scope="scope">{{scope.account.beds}}</template>-->
      <el-table-column label="退款类型" prop="refund_type" align="center">
        <template slot-scope="scope">{{scope.refund_type}}</template>
      </el-table-column>
      <el-table-column label="退款金额(元)" prop="money" align="center">
        <template slot-scope="scope">{{scope.real_refund}}</template>
      </el-table-column>
      <el-table-column label="退款状态" prop="status" align="center">
        <template slot-scope="scope">{{scope.refund_status}}</template>
      </el-table-column>
      <el-table-column label="退款日期" prop="time" align="center">
        <template slot-scope="scope">{{scope.business_time}}</template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {refundList} from "@/api/fmg";

  export default {
    name: 'refund',
    data() {
      return{
        total: 1,
        currentPage: 5,
        options:[{
          value:'1', label:'退款单号'
        }, {
          value:'2', label:'会员姓名'
        }, {
          value: '3', label: '床号'
        }],
        plan_s: '',
        plan_e: '',
        valueName: '1',
        valueY: '1',
        valueCost: '1',
        input: '',
        value: null,
        page: 1,
        pageSize: 15,
        listLoading: false,
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        refundList(this.page, this.pageSize).then(response => {
          this.listLoading = false;
          this.value = response.data.data;
        })
      },
      handleSizeChange(val) {
        console.log('???');
      },
      handleCurrentChange(val) {
        console.log('!!');
      }
    }
  }
</script>

<stype>

</stype>
