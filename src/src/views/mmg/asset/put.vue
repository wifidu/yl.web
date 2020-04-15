<template> 
  <div>
    <el-card class="form-container" shadow="never">
      <el-form :rules="rules" size="small" :inline="true" label-width="140px">
        <p>
          <el-form-item  label="仓库名称：" prop="name">
            <el-select v-model="warehouse_ope" :disabled="true" placeholder="A库">
              <el-option v-for="item in warehouse_name"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="入库单号：">
            <el-input :disabled="true" style="width: 203px" placeholder="2333333"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="来源：" prop="name">
            <el-select v-model="origin_ope" placeholder="购入">
              <el-option
                v-for="item in origin"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="批号：" prop="name">
            <el-input style="width: 203px"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="入库时间：" prop="name">
            <el-date-picker v-model="in_time"
                            type="datetime"
                            style="width: 203px"
                            placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item  label="操作人：">
            <el-input :disabled="true" style="width: 203px" placeholder="2333333"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="备注：">
            <el-input type="textarea" style="width: 558px"></el-input>
          </el-form-item>
        </p>
        <b>入库清单</b><br/>
        <div class="table-layout">
          <el-row>
            <el-col :span="6" class="table-cell-title">物资名称</el-col>
            <el-col :span="6" class="table-cell-title">品牌</el-col>
            <el-col :span="6" class="table-cell-title">型号</el-col>
            <el-col :span="6" class="table-cell-title">入库单位</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="table-cell">物资名称</el-col>
            <el-col :span="6" class="table-cell">品牌</el-col>
            <el-col :span="6" class="table-cell">型号</el-col>
            <el-col :span="6" class="table-cell">？？</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="table-cell-title">入库数量</el-col>
            <el-col :span="6" class="table-cell-title">入库单价</el-col>
            <el-col :span="6" class="table-cell-title">有效期</el-col>
            <el-col :span="6" class="table-cell-title">供应商</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="table-cell">Are you kidding?</el-col>
            <el-col :span="6" class="table-cell">I don't know</el-col>
            <el-col :span="6" class="table-cell">who care</el-col>
            <el-col :span="6" class="table-cell">？？</el-col>
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
  export default {
    name: "outAsset",
    data() {
      return {
        total: null,
        warehouse_name: [{value:0, label:'A库'}],
        origin: [{value:0, label:'购入'}],
        warehouse_ope: '',
        origin_ope: '',
        in_time: '',
        rules: {
          name: [{required: true, message: '该项为必填项', trigger: 'blur'}]
        }
      }
    },
    methods: {
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
