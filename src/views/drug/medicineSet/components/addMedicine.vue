<template> 
  <div>
    <el-card class="form-container" shadow="never">
      <el-form :value="value" :rules="rules" size="small" :inline="true" label-width="140px">
        <p>
          <el-form-item  label="会员姓名：" prop="warehouse_name">
            <el-input :disabled="!isEdit" size="mini" style="width: 203px" ></el-input>
          </el-form-item>
          <el-form-item  label="床位号：">
            <el-input :disabled="true" style="width: 203px" v-model="in_value.in_number"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="备注：">
            <el-input type="textarea" style="width: 558px" v-model="in_value.remarks" :disabled="!isEdit"></el-input>
          </el-form-item>
        </p>
        <div class="table-container">
          <el-table :data="tableData"
                    style="width:100%"
                    border>
            <el-table-column label="药品名称" prop="drugName" align="center"></el-table-column>
            <el-table-column label="用药单位" prop="what" align="center"></el-table-column>
            <el-table-column label="用药剂量" prop="people" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.cnt" size="mini" :disabled="!isEdit"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="用法" align="center">
              <template slot-scope="scope">
                <el-select v-model="in_value.origin" :disabled="!isEdit" size="mini">
                  <el-option
                    v-for="item in origin"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="频率" align="center" width="150">
              <template slot-scope="scope">
                <el-input v-model="scope.row.cnt" size="mini" style="width: 30px" :disabled="!isEdit"></el-input>次
                <el-input v-model="scope.row.cnt" size="mini" style="width: 30px" :disabled="!isEdit"></el-input>天
              </template>
            </el-table-column>
            <el-table-column label="服药时间" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.cnt" size="mini" :disabled="!isEdit"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <p>
                  <el-button size="mini">删除</el-button>
                </p>
              </template>
            </el-table-column>
          </el-table>
          <el-select :disabled="!isEdit" v-model="in_value.origin" placeholder="请添加药品" size="small">
            <el-option
              v-for="item in origin"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-form style="text-align: center;margin-top: 15px">
          <el-button type="success" size="mini" @click="handleSave">保存</el-button>
          <el-button size="mini" @click="handleRet">返回</el-button>
        </el-form>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {formatDate} from '@/utils/date.js';
  import {search_id} from '@/api/materialData';
  import {search_mate_id} from '@/api/material_in'

  const defaultvalue = {
    name: null,
    brand: null,
    model: null,
    unit: null
  };
  const defaultin_value = {
    warehouse_name: null,
    in_number: null,
    origin: null,
    batch_number: null,
    in_time: null,
    operator: null,
    remarks: null,
    in_material:{
      number: null,
      price: null,
      expiry_date: null,
      supplier: null
    }
  };
  export default {
    name: "addMedicine",
    props: {
      isEdit: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        material_id: null,
        value: null,
        in_value: null,
        total: null,
        warehouse_name: [{value:0, label:'A库'}],
        origin: [{value:0, label:'??'}],
        rules: {
          name: [{required: true, message: '该项为必填项', trigger: 'blur'}],
          warehouse_name: [{required: true, message: '该项为必填项', trigger: 'blur'}],
          origin: [{required: true, message: '该项为必填项', trigger: 'blur'}],
          batch_number: [{required: true, message: '该项为必填项', trigger: 'blur'}],
          in_time: [{required: true, message: '该项为必填项', trigger: 'blur'}],
        },
        tableData:[{
          drugName: 1,
          what:2,
          people: 3,
          cnt : 4,
        }]
      }
    },
    created() {
      this.getvalue();
      this.getin_value();
    },
    filters:{
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      }
    },
    methods: {
      getvalue() {
        if(this.$route.query.id){
          search_id(this.$route.query.id).then(response => {
            this.value = response.data;
            this.material_id = response.data.mate.material_id
          })
        }else{
          this.value = Object.assign({}, defaultvalue);
        }
      },
      getin_value(){
        if(this.material_id){
          search_mate_id(this.material_id).then(response => {
            this.in_value = response.data;
          })
        }else{
          this.in_value = Object.assign({},defaultin_value);
        }
      },
      handleSave() {
        this.$message({
          message: '出库成功',
          center: true,
          type: 'success'
        })
      },
      handleRet() {
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .form-container {
    width: 1000px;
  }
  .table-layout {
    margin-top: 20px;
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
  }
  .table-cell-title {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    background: #F2F6FC;
    text-align: center;
    font-size: 14px;
    color: #303133;
  }
  .table-cell {
    height: 60px;
    line-height: 40px;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    text-align: center;
    overflow: hidden;
  }
</style>
