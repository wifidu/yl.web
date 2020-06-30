<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never" style="text-align: center">
      <div style="margin-top: 15px">
        <el-form :inline="true" size="small">
          <el-select v-model="valueName" placeholder="盘点名称" size="small" style="width: 125px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-form-item>
            <el-input v-model="input" placeholder="请输入内容" style="width: 250px"></el-input>
          </el-form-item>
          <el-button type="info" icon="el-icon-search" size="small"></el-button>
          <el-select v-model="valueY" placeholder="全部" size="small" style="width:125px">
            <el-option v-for="item in years" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form>
        <el-form :inline="true">
          <span>计划盘点时间</span>
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
        <el-form :inline="true"  style="margin-top: 15px">
          <span>实际盘点时间</span>
          <el-date-picker
            size="small"
            v-model="real_s"
            type="datetime"
            align="right"
            placeholder="开始">
          </el-date-picker>
          <i class="el-icon-caret-right"></i>
          <el-date-picker
            size="small"
            v-model="real_e"
            type="datetime"
            align="right"
            placeholder="结束">
          </el-date-picker>

        </el-form>
      </div>
    </el-card>
    <el-table :data="value"
              v-loading="listLoading"
              border
              style="margin-top: 15px;width:100%">
      <el-table-column label="盘点时间" align="center">
        <template slot-scope="scope">{{scope.row.inventory_time | formatDate}}</template>
      </el-table-column>
      <el-table-column label="盘点名称" align="center">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column label="盘点数量" align="center">
        <template slot-scope="scope">{{scope.row.number}}</template>
      </el-table-column>
      <el-table-column label="合计金额" align="center">
        <template slot-scope="scope">{{scope.row.total}}</template>
      </el-table-column>
      <el-table-column label="盘亏" prop="lose" align="center">
        <template slot-scope="scope">{{scope.row.lose}}</template>
      </el-table-column>
      <el-table-column label="盘盈" prop="surplus" align="center">
        <template slot-scope="scope">{{scope.row.surplus}}</template>
      </el-table-column>
      <el-table-column label="盘点人" align="center">
        <template slot-scope="scope">{{scope.row.check_person}}</template>
      </el-table-column>
      <el-table-column label="完成时间" prop="finish_time" align="center">
        <template slot-scope="scope">{{scope.row.completion_time | formatDate}}</template>
      </el-table-column>
    </el-table>
    <div class="modal-bg" v-show="show">
      <div class="modal-container">
        <div class="modal-header">
          {{ title }}
        </div>
<!--        <div class="modal-main">-->
<!--          <slot>-->
<!--            <el-table-->
<!--              style="margin-top: 15px;width:100%">-->
<!--              <el-table-column label="单号" prop="odd" align="center">{{wlog.odd_number}}</el-table-column>-->
<!--              <el-table-column label="操作类型" prop="ope_name" align="center">{{wlog.type}}</el-table-column>-->
<!--              <el-table-column label="仓库名称" prop="house_name" align="center">{{wlog.warehouse_name}}</el-table-column>-->
<!--              <el-table-column label="物资名称" prop="pro_name" align="center">{{wlog.material_name}}</el-table-column>-->
<!--              <el-table-column label="品牌规格" prop="brand" align="center">{{wlog.brand}}</el-table-column>-->
<!--              <el-table-column label="供应商" prop="supplier" align="center">{{wlog.supplier}}</el-table-column>-->
<!--              <el-table-column label="单位" prop="unit" align="center">{{wlog.unit}}</el-table-column>-->
<!--              <el-table-column label="单价" prop="price" align="center">{{wlog.price}}</el-table-column>-->
<!--              <el-table-column label="操作数量" prop="ope_num" align="center">{{wlog.number}}</el-table-column>-->
<!--              <el-table-column label="金额" prop="sum" align="center">{{wlog.total}}</el-table-column>-->
<!--              <el-table-column label="操作人" prop="people" align="center">{{wlog.operator}}</el-table-column>-->
<!--              <el-table-column label="变动时间" prop="change_time" align="center" width="250">{{wlog.operator_time}}</el-table-column>-->
<!--            </el-table>-->
<!--          </slot>-->
<!--        </div>-->
        <div class="modal-footer">
          <el-button type="primary" @click="submit()" size="small">确认</el-button>
        </div>
      </div>
    </div>
<!--    <div class="pagination-container">-->
<!--      <el-pagination-->
<!--        background-->
<!--        @size-change="handleSizeChange"-->
<!--        @current-change="handleCurrentChange"-->
<!--        :current-page="currentPage"-->
<!--        :page-sizes="[5, 10, 15]"-->
<!--        layout="total, sizes, prev, pager, next, jumper"-->
<!--        :total="total">-->
<!--      </el-pagination>-->
<!--    </div>-->
  </div>
</template>

<script>
  import {inventoryList, warehouse_logSearch} from "@/api/mmg_inventory_log";
  import {formatDate} from '@/utils/date.js';

  export default {
    name: "inventoryManagement",
    data(){
      return{
        listLoading: false,
        wlog: null,
        value: null,
        total: 1,
        currentPage: 5,
        node: null,
        options:[{
          value:'1',label:'盘点名称'
        }, {
          value:'2',label:'盘点时间'
        }, {
          value:'3',label:'盘点数量'
        }],
        years:[{
          value:'1', label:'全部'
        }, {
          value:'2', label:'近三年'
        }, {
          value:'3', label:'近五年'
        }],
        title: '',
        plan_s: '',
        plan_e: '',
        real_s: '',
        real_e: '',
        valueName: '1',
        valueY: '1',
        input: '',
        page: 1,
        pageSize: 5,
        show: false
      }
    },
    created(){
      this.getList();
    },
    filters:{
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      }
    },
    methods: {
      getList(){
        inventoryList().then(response => {
          this.value = response.data.data;
          for(let i = 0;i < this.value.length;++i){
            this.value[i].status = '盘点';
          }
        })
      },
      submit() {
        this.show = false;
        this.$emit('submit')
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

<style scoped>
  .modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 10;
  }
  .modal-container {
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .modal-header {
    height: 50px;
    background: #555c66;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: move;
  }
  .modal-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 57px;
    border-top: 1px solid #ddd;
  }
  .modal-footer button {
    width: 100px;
  }
  .modal-main {
    padding: 15px 40px;
  }
</style>
