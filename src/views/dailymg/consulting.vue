<template>
  <div class="app-container" >
    <el-card class="filter-container" shadow="never">
      <div style="margin-top: 15px">
        <el-form :inline="true" size="small">
          <el-select v-model="valueName" size="small" style="width: 125px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-form-item>
            <el-input placeholder="请输入搜索内容"></el-input>
          </el-form-item>
          <el-button type="info" icon="el-icon-search" size="small"></el-button>
        </el-form>
      </div>
    </el-card>
    <el-table :data="tableData"
              style="margin-top: 15px;width:100%"
              v-loading="listLoading"
              border>
      <el-table-column label="咨询时间" prop="visitingName" align="center"></el-table-column>
      <el-table-column label="咨询人" prop="tel" align="center"></el-table-column>
      <el-table-column label="咨询人手机号码" prop="visitingTime" align="center"></el-table-column>
      <el-table-column label="咨询方式" prop="name" align="center"></el-table-column>
      <el-table-column label="媒介渠道" prop="beds" align="center"></el-table-column>
      <el-table-column label="咨询意向" prop="because" align="center"></el-table-column>
      <el-table-column label="老人姓名" prop="because" align="center"></el-table-column>
      <el-table-column label="年龄" prop="because" align="center"></el-table-column>
      <el-table-column label="自理能力" prop="because" align="center"></el-table-column>
      <el-table-column label="备注" prop="because" align="center"></el-table-column>
      <el-table-column label="回访结果" prop="because" align="center"></el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <p>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleShow(scope.$index, scope.row)">详情</el-button>
          </p>
          <p>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">回访</el-button>
            <el-button size="mini" @click="handleShow(scope.$index, scope.row)">建档</el-button>
          </p>
        </template>
      </el-table-column>
    </el-table>
    <div class="batch-operate-container">
      <el-button style="margin-left: 20px" size="mini" type="success" @click="handleRegistation">咨询登记</el-button>
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
  export default {
    name: 'consulting',
    data() {
      return{
        total: 1,
        currentPage: 5,
        options:[{
          value: 0, label:'咨询人'
        }, {
          value: 1, label:'咨询时间'
        }, {
          value: 2, label: '咨询方式'
        }, {
          value: 3, label: '床位'
        }],
        plan_s: '',
        plan_e: '',
        valueName: 0,
        valueY: '1',
        valueCost: '1',
        input: '',
        tableData: [{
          visitingName: 0,
          visitingTime: 0,
          tel: 0,
          name: 0,
          beds: 0,
          because: 0
        }],
        listLoading: false,
        time: null,
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
        this.$router.push({path: '/dailymg/consultShow', query:{id:row.id}});
      },
      handleEdit(index, row) {
        this.$router.push({path: '/dailymg/consultEdit', query:{id:row.id}});
      },
      handleRegistation() {
        this.$router.push({path:'/dailymg/consultRegistation'});
      }
    }
  }
</script>

<stype>

</stype>
