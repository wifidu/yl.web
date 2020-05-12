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
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">押金总额：{{this.deposit}}</div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-table :data="tableData"
              style="margin-top: 15px;width:100%"
              v-loading="listLoading"
              border>
      <el-table-column label="会员姓名" prop="member_number" align="center"></el-table-column>
      <el-table-column label="床位" prop="beds" align="center"></el-table-column>
      <el-table-column label="身份证" prop="cd_card" align="center"></el-table-column>
      <el-table-column label="押金金额" prop="deposit" align="center"></el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <p>
            <el-button size="mini" @click="handleShow(scope.$index, scope.row)">详情</el-button>
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
    name: "depositMG",
    data() {
      return{
        total: 1,
        currentPage: 5,
        options:[{
          value: 0, label:'会员姓名'
        }, {
          value: 1, label:'床号'
        }, {
          value: 2, label: '身份证号'
        }],
        valueName: 0,
        valueY: '1',
        valueCost: '1',
        input: '',
        tableData: [{
          member_number: 1,
          beds: 2,
          cd_card: 3,
          deposit: 4
        }],
        listLoading: false,
        deposit: 0,
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
