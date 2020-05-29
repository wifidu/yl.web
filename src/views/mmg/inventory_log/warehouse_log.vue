<template>
  <div class="app-container" >
    <el-card class="filter-container" shadow="never" style="text-align: center">
      <div style="margin-top: 15px">
        <el-form :inline="true" size="small">
          <el-select v-model="valueName" placeholder="单号" size="small" style="width: 125px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-form-item>
            <el-input v-model="input" placeholder="请输入内容" style="width: 250px"></el-input>
          </el-form-item>
          <el-button type="info" icon="el-icon-search" size="small"></el-button>
          <el-select v-model="valueY" placeholder="全部操作类型" size="small" style="width:150px">
            <el-option v-for="item in years" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-model="valueHouse" placeholder="全部仓库" size="small" style="width: 150px">
            <el-option v-for="item in House" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-button type="info" size="small" style="float:right" @click="handleDownloadExcel">导出</el-button>
        </el-form>
        <el-form :inline="true">
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

        </el-form>
      </div>
    </el-card>
    <el-table :data="value"
              style="margin-top: 15px;width:100%"
              border>
      <el-table-column label="单号" align="center">
        <template slot-scope="scope">{{scope.row.odd_number}}</template>
      </el-table-column>
      <el-table-column label="操作类型" align="center">
        <template slot-scope="scope">{{scope.row.type}}</template>
      </el-table-column>
      <el-table-column label="仓库名称" align="center">
        <template slot-scope="scope">{{scope.row.warehouse_name}}</template>
      </el-table-column>
      <el-table-column label="物资名称" align="center">
        <template slot-scope="scope">{{scope.row.material_name}}</template>
      </el-table-column>
      <el-table-column label="品牌规格" align="center">
        <template slot-scope="scope">{{scope.row.brand}}</template>
      </el-table-column>
      <el-table-column label="供应商" align="center">
        <template slot-scope="scope">{{scope.row.supplier}}</template>
      </el-table-column>
      <el-table-column label="单位" align="center">
        <template slot-scope="scope">{{scope.row.unit}}</template>
      </el-table-column>
      <el-table-column label="单价" align="center">
        <template slot-scope="scope">{{scope.row.price}}</template>
      </el-table-column>
      <el-table-column label="操作数量" align="center">
        <template slot-scope="scope">{{scope.row.number}}</template>
      </el-table-column>
      <el-table-column label="金额" align="center">
        <template slot-scope="scope">{{scope.row.total}}</template>
      </el-table-column>
      <el-table-column label="操作人" align="center">
        <template slot-scope="scope">{{scope.row.operator}}</template>
      </el-table-column>
      <el-table-column label="变动时间" align="center" width="250">
        <template slot-scope="scope">{{scope.row.operator_time | formatDate}}</template>
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
  import {warehouse_logSearch, downloadExcel} from '@/api/mmg_inventory_log'
  import {formatDate} from '@/utils/date.js';

  const defaultQueryList = {
    search_index: null,
    content: null,
    operator_type: null,
    warehouse_name: null,
    time_range: null,
  };
  export default {
    name: 'warehouseLog',
    data() {
      return{
        value: null,
        total: 1,
        currentPage: 5,
        options:[{
          value:'1',label:'单号'
        }, {
          value:'2',label:'物资名称'
        }],
        years:[{
          value:'1', label:'全部操作类型'
        }, {
          value:'2', label:'出库'
        }, {
          value:'3', label:'入库'
        }, {
          value:'4', label:'盘点'
        }],
        House:[{
          value:'1', label:'全部仓库'
        }, {
          value:'2', label:'A库'
        }, {
          value:'3', label:'B库'
        }],
        plan_s: '',
        plan_e: '',
        valueName: '1',
        valueY: '1',
        valueHouse: '1',
        input: '',
        page: 1,
        pageSize: 5,
        queryList: Object.assign({}, defaultQueryList),
      }
    },
    created() {
      this.getlist();
    },
    filters:{
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      }
    },
    methods: {
      getlist(){
        warehouse_logSearch(this.queryList).then(response => {
          this.value = response.data;
          console.log(this.value);
        })
      },
      handleSizeChange(val) {
        console.log('???');
      },
      handleCurrentChange(val) {
        console.log('!!');
      },
      handleDownloadExcel() {
        this.$confirm('是否确定下载Excel?', '提示', {
          confirmButtonText: '确定',
          cancelButtonClass: '取消',
          type: 'warning'
        }).then(() => {
          downloadExcel().then(response => {
            console.log('download Excel');
          });
        })
      }
    }
  }
</script>

<stype>

</stype>
