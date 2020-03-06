<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never" style="text-align: center">
      <div style="margin-top: 15px">
        <el-form :inline="true" size="medium">
          <el-select v-model="valueName" placeholder="盘点名称" size="medium" style="width: 125px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-form-item>
            <el-input v-model="input" placeholder="请输入内容" style="width: 250px"></el-input>
          </el-form-item>
          <el-button type="info" icon="el-icon-search" size="medium"></el-button>
          <el-select v-model="valueY" placeholder="全部" size="medium" style="width:125px">
            <el-option v-for="item in years" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form>
        <el-form :inline="true" size="medium">
          <span>计划盘点时间</span>
          <el-date-picker
            size="medium"
            v-model="plan_s"
            type="datetime"
            align="right"
            placeholder="开始">
          </el-date-picker>
          <i class="el-icon-caret-right"></i>
          <el-date-picker
            size="medium"
            v-model="plan_e"
            type="datetime"
            align="right"
            placeholder="结束">
          </el-date-picker>

        </el-form>
        <el-form :inline="true" size="medium"  style="margin-top: 15px">
          <span>实际盘点时间</span>
          <el-date-picker
            size="medium"
            v-model="real_s"
            type="datetime"
            align="right"
            placeholder="开始">
          </el-date-picker>
          <i class="el-icon-caret-right"></i>
          <el-date-picker
            size="medium"
            v-model="real_e"
            type="datetime"
            align="right"
            placeholder="结束">
          </el-date-picker>

        </el-form>
      </div>
    </el-card>
    <el-table
        :data="tableData"
        style="margin-top: 15px;width:100%">
      <el-table-column label="盘点时间" prop="plate_time" align="center"></el-table-column>
      <el-table-column label="盘点名称" prop="plate_name" align="center"></el-table-column>
      <el-table-column label="盘点数量" prop="plate_number" align="center"></el-table-column>
      <el-table-column label="合计金额" prop="sum" align="center"></el-table-column>
      <el-table-column label="盘亏" prop="lose" align="center"></el-table-column>
      <el-table-column label="盘盈" prop="surplus" align="center"></el-table-column>
      <el-table-column label="盘点人" prop="people" align="center"></el-table-column>
      <el-table-column label="完成时间" prop="finish_time" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
            <el-button size="mini" @click="handleIsDisplay(scope.$index, scope.row)">{{scope.row.ope}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="modal-bg" v-show="show">
        <div class="modal-container">
          <div class="modal-header">
            {{ title }}
          </div>
          <div class="modal-main">
            <slot>
              <el-table
                :data="tableData"
                style="margin-top: 15px;width:100%">
                <el-table-column label="盘点时间" prop="plate_time" align="center"></el-table-column>
                <el-table-column label="盘点名称" prop="plate_name" align="center"></el-table-column>
                <el-table-column label="盘点数量" prop="plate_number" align="center"></el-table-column>
                <el-table-column label="合计金额" prop="sum" align="center"></el-table-column>
                <el-table-column label="盘亏" prop="lose" align="center"></el-table-column>
                <el-table-column label="盘盈" prop="surplus" align="center"></el-table-column>
                <el-table-column label="盘点人" prop="people" align="center"></el-table-column>
                <el-table-column label="完成时间" prop="finish_time" align="center"></el-table-column>
              </el-table>
            </slot>
          </div>
          <div class="modal-footer">
            <el-button type="primary" @click="submit()" size="medium">确认</el-button>
          </div>
        </div>
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
      name: "brand",
      props: {
          show: {
            type: Boolean,
            default: false
          },
          title: {
            type: String,
            default: ''
          }
        },
      data(){
          return{
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
            plan_s: '',
            plan_e: '',
            real_s: '',
            real_e: '',
            valueName: '1',
            valueY: '1',
            input: '',
            tableData: [{
              plate_time: '2018-02-22 09:02',
              plate_name: '2月份盘点',
              plate_number: '200',
              sum: '10000',
              people: 'me',
              ope: '盘点'
            }],
          }
      },
      methods: {
        handleIsDisplay(index, row) {
            if(row.ope === '盘点'){
              row.ope = '详情';
              row.lose = '亏惨了';
              row.finish_time = 'today';
              row.surplus = '这个显示弄了我好久'
            }
            else{
              this.show = true;
              this.title = row.plate_name;
            }
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
