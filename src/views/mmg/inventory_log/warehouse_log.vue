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
          <el-button type="info" size="small" style="float:right">导出</el-button>
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
    <el-table :data="tableData"
              style="margin-top: 15px;width:100%"
              border>
      <el-table-column label="单号" prop="odd" align="center"></el-table-column>
      <el-table-column label="操作类型" prop="ope_name" align="center"></el-table-column>
      <el-table-column label="仓库名称" prop="house_name" align="center"></el-table-column>
      <el-table-column label="物资名称" prop="pro_name" align="center"></el-table-column>
      <el-table-column label="品牌规格" prop="brand" align="center"></el-table-column>
      <el-table-column label="供应商" prop="supplier" align="center"></el-table-column>
      <el-table-column label="单位" prop="unit" align="center"></el-table-column>
      <el-table-column label="单价" prop="price" align="center"></el-table-column>
      <el-table-column label="操作数量" prop="ope_num" align="center"></el-table-column>
      <el-table-column label="金额" prop="sum" align="center"></el-table-column>
      <el-table-column label="操作人" prop="people" align="center"></el-table-column>
      <el-table-column label="变动时间" prop="change_time" align="center" width="250"></el-table-column>
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
    name: 'warehouseLog',
    data() {
      return{
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
        tableData: [{
          odd: '??',
          ope_name: '!!',
          house_name: 'oh',
          pro_name: 'soga',
          brand: 'kawayi',
          supplier: 'like this',
          unit: 'know',
          price: '-100',
          ope_num: 'hehe',
          sum: 'ai',
          people: 'me',
          change_time: 'today'
        }],
      }
    },
    methods: {
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
