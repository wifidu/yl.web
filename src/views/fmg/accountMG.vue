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
      </div>
    </el-card>
    <el-table :data="value"
              style="margin-top: 15px;width:100%"
              v-loading="listLoading"
              border>
      <el-table-column type="selection" width="60" align="center"></el-table-column>
      <el-table-column label="账号编号" prop="account_number" align="center">
        <template slot-scope="scope">{{value.account_number}}</template>
      </el-table-column>
      <el-table-column label="会员编号" align="center">
        <template slot-scope="scope">{{value.member_number}}</template>
      </el-table-column>
      <el-table-column label="会员姓名" align="center">
        <template slot-scope="scope">{{value.member_name}}</template>
      </el-table-column>
      <el-table-column label="床位" align="center">
        <template slot-scope="scope">{{value.beds}}</template>
      </el-table-column>
      <el-table-column label="账户余额" prop="account_balance" align="center">
        <template slot-scope="scope">{{value.account_balance}}</template>
      </el-table-column>
      <el-table-column label="床位费" prop="bed_money" align="center">
        <template slot-scope="scope">{{value.beds_cost}}</template>
      </el-table-column>
      <el-table-column label="膳食费" prop="meals" align="center">
        <template slot-scope="scope">{{value.meal_cost}}</template>
      </el-table-column>
      <el-table-column label="护理费" prop="month_fee" align="center">
        <template slot-scope="scope">{{value.nursing_cost}}</template>
      </el-table-column>
      <el-table-column label="其他月度费" prop="month_fee" align="center">
        <template slot-scope="scope">{{value.other_cost}}</template>
      </el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <p>
            <el-button size="mini" @click="handleShow(scope.$index, scope.row)">查看账单</el-button>
            <el-button size="mini">充值</el-button>
          </p>
          <p>
            <el-button size="mini">退费</el-button>
            <el-button size="mini">提取</el-button>
          </p>
        </template>
      </el-table-column>
    </el-table>
    <div class="batch-operate-container">
      <el-button style="margin-left: 20px" size="mini" type="danger">批量补贴</el-button>
    </div>
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
  import {accountMGList} from '@/api/fmg';

  export default {
    name: 'accountMG',
    data() {
      return{
        total: 1,
        currentPage: 5,
        options:[{
          value:'1', label:'账户编号'
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
        listLoading: false,
        page: null,
        pageSize: null,
        value: null
      }
    },
    methods: {
      getList() {
        this.listLoading = true;
        accountMGList(this.page, this.pageSize).then(response => {
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
      handleShow(index, row) {
        this.$router.push({path: '/fmg/accountMS', query:{id:row.id}});
      }
    }
  }
</script>

<stype>

</stype>
