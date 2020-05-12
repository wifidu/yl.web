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
          <el-date-picker
            size="small"
            v-model="plan_s"
            type="datetime"
            align="right"
            placeholder="开始日期">
          </el-date-picker>
          <i class="el-icon-caret-right"></i>
          <el-date-picker
            size="small"
            v-model="plan_e"
            type="datetime"
            align="right"
            placeholder="结束日期">
          </el-date-picker>
          <el-button type="info" icon="el-icon-search" size="small"></el-button>
        </el-form>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">收入：{{this.income}}</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple-light">支出：{{this.spending}}</div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-table :data="tableData"
              style="margin-top: 15px;width:100%"
              v-loading="listLoading"
              border>
      <el-table-column label="流水号" prop="account_number" align="center"></el-table-column>
      <el-table-column label="业务单号" prop="vip_number" align="center"></el-table-column>
      <el-table-column label="财务类型" prop="vip_name" align="center"></el-table-column>
      <el-table-column label="记录时间" prop="bed" align="center"></el-table-column>
      <el-table-column label="资金流向" prop="account_balance" align="center"></el-table-column>
      <el-table-column label="交易金额" prop="bed_money" align="center"></el-table-column>
      <el-table-column label="支付渠道" prop="meals" align="center"></el-table-column>
      <el-table-column label="备注" prop="month_fee" align="center"></el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <p>
            <el-button size="mini" @click="handleShow(scope.$index, scope.row)">备注</el-button>
          </p>
        </template>
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
    export default {
        name: "organizationMG",
      data() {
        return{
          total: 1,
          currentPage: 5,
          options:[{
            value: 0, label:'业务单号'
          }, {
            value: 1, label:'财务类型'
          }, {
            value: 2, label: '流水号'
          }],
          plan_s: '',
          plan_e: '',
          valueName: 0,
          valueY: '1',
          valueCost: '1',
          input: '',
          tableData: null,
          listLoading: false,
          income: 0,
          spending: 0,
        }
      },
      methods: {
        handleSizeChange(val) {
          console.log('???');
        },
        handleCurrentChange(val) {
          console.log('!!');
        },
        handleShow(index, row) {
          this.$router.push({path: '/fmg/billingMessage', query:{id:row.id}});
        }
      }
    }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
</style>
