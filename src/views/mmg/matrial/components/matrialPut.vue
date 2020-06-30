<template> 
  <div>
    <el-card class="form-container" shadow="never">
      <el-form :value="value" :rules="rules" size="small" :inline="true" label-width="140px">
        <p>
          <el-form-item  label="仓库名称：" prop="warehouse_name">
            <el-select v-model="in_value.warehouse_name" :disabled="true">
              <el-option
                         v-for="item in warehouse_nameOption"
                         :key="item.value"
                         :label="item.lable"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="入库单号：">
            <el-input :disabled="!isEdit" style="width: 203px" v-model="in_value.in_number"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="来源：" prop="origin">
            <el-select v-model="in_value.origin" :disabled="!isEdit">
              <el-option
                v-for="item in originOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="批号：" prop="batch_number">
            <el-input :disabled="!isEdit" style="width: 203px" v-model="in_value.batch_number"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="入库时间：" prop="in_time">
            <el-date-picker :disabled="!isEdit"
                            v-model="in_value.in_time"
                            type="datetime"
                            style="width: 203px"
                            placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item  label="操作人：">
            <el-input :disabled="!isEdit" style="width: 203px" v-model="in_value.operator"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="备注：">
            <el-input :disabled="!isEdit" type="textarea" style="width: 558px" v-model="in_value.remarks"></el-input>
          </el-form-item>
        </p>
        <b>入库清单</b><br/>
<!--        <div class="table-layout">-->
<!--          <el-row>-->
<!--            <el-col :span="6" class="table-cell-title">物资名称</el-col>-->
<!--            <el-col :span="6" class="table-cell-title">品牌</el-col>-->
<!--            <el-col :span="6" class="table-cell-title">型号</el-col>-->
<!--            <el-col :span="6" class="table-cell-title">入库单位</el-col>-->
<!--          </el-row>-->
<!--          <el-row>-->
<!--            <el-col :span="6" class="table-cell">{{value.name}}</el-col>-->
<!--            <el-col :span="6" class="table-cell">{{value.brand}}</el-col>-->
<!--            <el-col :span="6" class="table-cell">{{value.model}}</el-col>-->
<!--            <el-col :span="6" class="table-cell">{{value.unit}}</el-col>-->
<!--          </el-row>-->
<!--          <el-row>-->
<!--            <el-col :span="6" class="table-cell-title">入库数量</el-col>-->
<!--            <el-col :span="6" class="table-cell-title">入库单价</el-col>-->
<!--            <el-col :span="6" class="table-cell-title">有效期</el-col>-->
<!--            <el-col :span="6" class="table-cell-title">供应商</el-col>-->
<!--          </el-row>-->
<!--          <el-row>-->
<!--            <el-col :span="6" class="table-cell">{{in_value.in_material.number}}</el-col>-->
<!--            <el-col :span="6" class="table-cell">{{in_value.in_material.price}}</el-col>-->
<!--            <el-col :span="6" class="table-cell">{{in_value.in_material.expiry_date}}</el-col>-->
<!--            <el-col :span="6" class="table-cell">{{in_value.in_material.supplier}}</el-col>-->
<!--          </el-row>-->
<!--        </div>-->
        <el-form style="text-align: center;margin-top: 15px">
          <el-button type="success" size="mini" @click="handleSave" v-if="isEdit">保存</el-button>
          <el-button size="mini" @click="handleRet">返回</el-button>
        </el-form>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {formatDate} from '@/utils/date.js';
  import {search_id, search_in_id} from '@/api/mmg_material';

  const defaultvalue = {
    name: null,
    brand: null,
    model: null,
    unit: null
  };
  const defaultin_value = {
    warehouse_name: 0,
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
    name: "matrialPut",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        material_id: null,
        value: null,
        in_value: null,
        total: null,
        warehouse_nameOption: [{value:0, lable:'A仓'}, {value:1, lable:'B仓'}],
        originOption: [{value:0, lable:'购入'}, {value: 1, lable:'捐赠'}],
        rules: {
          name: [{required: true, message: '该项为必填项', trigger: 'blur'}],
          warehouse_name: [{required: true, message: '该项为必填项', trigger: 'blur'}],
          origin: [{required: true, message: '该项为必填项', trigger: 'blur'}],
          batch_number: [{required: true, message: '该项为必填项'}],
          in_time: [{required: true, message: '该项为必填项', trigger: 'blur'}],
        }
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
            console.log(response.data);
            this.value = response.data;
            this.material_id = response.data.mate.material_id
          })
        }else{
          this.value = Object.assign({}, defaultvalue);
        }
      },
      getin_value(){
        if(this.material_id){
          search_in_id(this.material_id).then(response => {
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
