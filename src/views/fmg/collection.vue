<template>
  <div class="app-container">
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
          <el-select v-model="valueCost" size="small" style="width: 150px">
            <el-option v-for="item in Cost" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
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
              style="margin-top: 15px;width:100%"
              v-loading="listLoading"
              border>
      <el-table-column label="业务时间" align="center" style="width: 100px">
        <template slot-scope="scope">{{scope.business_time}}</template>
      </el-table-column>
      <el-table-column label="收款单号" align="center">
        <template slot-scope="scope">{{scope.voucher_no}}</template>
      </el-table-column>
<!--      <el-table-column label="会员姓名" align="center">-->
<!--        <template slot-scope="scope">{{scope.account.member_name}}</template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="床位" align="center">-->
<!--        <template slot-scope="scope">{{scope.account.beds}}</template>-->
<!--      </el-table-column>-->
      <el-table-column label="收款类型" align="center">
        <template slot-scope="scope">{{scope.payment_type}}</template>
      </el-table-column>
      <el-table-column label="应收金额(元)" align="center">
        <template slot-scope="scope">{{scope.amount_receivable}}</template>
      </el-table-column>
      <el-table-column label="账户余额" align="center">
        <template slot-scope="scope">{{scope.amount_balance}}</template>
      </el-table-column>
      <el-table-column label="账单日期" align="center">
        <template slot-scope="scope">{{scope.billing_date}}</template>
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
<!--      <el-button @click="addtest(adddata)">+</el-button>-->
    </div>
  </div>
</template>

<script>
  import {getcollectionList, add} from "@/api/fmg";

  export default {
    name: 'collection',
    data() {
      return{
        value: null,
       total: 1,
       currentPage: 5,
       options:[{
        value:'1', label:'收款单号'
        }, {
          value:'2', label:'会员姓名'
        }, {
          value: '3', label: '床号'
        }],
        Cost:[{
         value:'1', label:'未缴费'
        }, {
          value:'2', label:'缴费'
        }],
        plan_s: '',
        plan_e: '',
        valueName: '1',
        valueY: '1',
        valueCost: '1',
        input: '',
        listLoading: true,
        page: 1,
        pageSize: 15,
        adddata: {
          id: 1,
          business_time: "1993-07-23",
          voucher_no: "SK41993072399612032",
          account_id: 9,
          payment_type: '1',
          amount_receivable: 83676.00,
          account_balance: 4682.01,
          billing_date: "1993-07-23 23:28:13",
          if_pay: 1,
          account: {
            id: 9,
            created_at: "1976-12-20 08:40:54",
            updated_at: "1976-12-20 08:40:54",
            account_number: "A1363773",
            member_number: "7777",
            member_name: "桂志强",
            beds: "1号楼-2-574-113",
            account_balance: "1767.61",
            beds_cost: "388.52",
            meal_cost: "998.02",
            nursing_cost: "627.72",
            other_cost: "260.48",
            cd_card: "323600533637433257"
          }
        }
      }
    },
    created() {
      this.getTableData();
    },
    methods: {
      getTableData(){
        this.listLoading = true;
        getcollectionList(this.page, this.pageSize).then(response => {
          this.listLoading = false;
          this.value = response.data.data;
        })
      },
      handleSizeChange(val) {
        console.log('???');
      },
      handleCurrentChange(val) {
        console.log('!!');
      },
      addtest(data) {
        //
        console.log(data)
        add(data).then(response => {
          console.log(response);
        })
      },
    }
  }
</script>

<stype>

</stype>
