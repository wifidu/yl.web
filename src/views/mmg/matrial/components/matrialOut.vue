<template> 
  <div>
    <el-card class="form-container" shadow="never">
      <el-form :rules="rules" size="small" :inline="true" label-width="140px">
        <p>
          <el-form-item  label="选择仓库：" prop="warehouse_name">
            <el-select v-model="out_value.warehouse_name" :disabled="true" placeholder="A库">
              <el-option v-for="item in warehouse_name"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="出库单号：">
            <el-input :disabled="true" style="width: 203px" v-model="out_value.out_number"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="去向：" prop="whereabouts">
            <el-select v-model="out_value.whereabouts">
              <el-option
                v-for="item in whereabouts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="领用人：" prop="user">
            <el-input style="width: 203px" v-model="out_value.user"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="出库时间：" prop="out_time">
            <el-date-picker v-model="out_value.out_time"
                            type="datetime"
                            style="width: 203px"
                            placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item  label="操作人：">
            <el-input :disabled="true" style="width: 203px" v-model="out_value.operator"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="备注：">
            <el-input type="textarea" style="width: 558px" v-model="out_value.remarks"></el-input>
          </el-form-item>
        </p>
        <b>出库清单</b><br/>
        <div class="table-layout">
          <el-row>
            <el-col :span="6" class="table-cell-title">物资名称</el-col>
            <el-col :span="6" class="table-cell-title">品牌</el-col>
            <el-col :span="6" class="table-cell-title">型号</el-col>
            <el-col :span="6" class="table-cell-title">原仓库</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="table-cell">{{value.name}}</el-col>
            <el-col :span="6" class="table-cell">{{value.brand}}</el-col>
            <el-col :span="6" class="table-cell">{{value.model}}</el-col>
            <el-col :span="6" class="table-cell">{{out_value.warehouse_name}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="table-cell-title">出库单位</el-col>
            <el-col :span="6" class="table-cell-title">库存数量</el-col>
            <el-col :span="6" class="table-cell-title">出库数量</el-col>
            <el-col :span="6" class="table-cell-title">有效期</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="table-cell">{{value.unit}}</el-col>
            <el-col :span="6" class="table-cell">{{value.number}}</el-col>
            <el-col :span="6" class="table-cell">{{out_value.out_material.number}}</el-col>
            <el-col :span="6" class="table-cell">{{out_value.out_material.expiry_date}}</el-col>
          </el-row>
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
  import {search_id} from '@/api/mmg_material';
  import {search_mate_id} from '@/api/material_out'

  const defaultvalue = {
    name: null,
    brand: null,
    model: null,
    unit: null,
    number: null
  };
  const defaultout_value = {
    user: null,
    warehouse_name: null,
    out_number: null,
    whereabouts: null,
    out_time: null,
    operator: null,
    remarks: null,
    out_material:{
      material_id: null,
      number: null,
      price: null,
      expiry_date: null,
      supplier: null
    }
  };
  export default {
    name: "outAsset",
    data() {
      return {
        value: null,
        out_value: null,
        material_id: null,
        total: null,
        warehouse_name: [{value:0, label:'A库'}],
        whereabouts: [{value:0, label:'领用'}],
        rules: {
          warehouse_name: [{required: true, message: '该项为必填项', trigger: 'blur'}],
          whereabouts: [{required: true, message: '该项为必填项', trigger: 'blur'}],
          user: [{required: true, message: '该项为必填项', trigger: 'blur'}],
          out_time: [{required: true, message: '该项为必填项', trigger: 'blur'}],
        }
      }
    },
    created() {
      this.getvalue();
      this.getout_value();
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
            this.material_id = response.data.out_material.material_id
          })
        }else{
          this.value = Object.assign({}, defaultvalue);
        }
      },
      getout_value(){
        if(this.isEdit){
          search_mate_id(this.material_id).then(response => {
            this.out_value = response.data;
          })
        }else{
          this.out_value = Object.assign({},defaultout_value);
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
        this.$router.push('/mmg/fixedAsset');
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


