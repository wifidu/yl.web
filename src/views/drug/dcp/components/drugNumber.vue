<template>
  <div class="app-container" style="margin-top: 15px;text-align: center;">
    <el-form :inline="true" size="mini" label-width="120px" ref="DMessage">
      <p>
        <el-form-item label="会员名称" prop="name">
          <el-input v-model="dName" style="width: 250px" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="床位号" prop="name">
          <el-input v-model="specification" style="width: 250px" :disabled="true"></el-input>
        </el-form-item>
      </p>
      <p>
        <el-form-item label="药品名称" prop="name">
          <el-input v-model="manufacturer" style="width: 250px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用药单位" prop="name">
          <el-input v-model="specification" style="width: 250px" :disabled="true"></el-input>
        </el-form-item>
      </p>
      <p>
        <el-form-item label="剩余药品" prop="name">
          <el-input v-model="specification" style="width: 250px" :disabled="!number"></el-input>
        </el-form-item>
        <el-form-item label="预警数量" prop="name">
          <el-input v-model="specification" style="width: 250px" :disabled="!remaining"></el-input>
        </el-form-item>
      </p>
    </el-form>
    <el-form style="text-align: center;">
      <el-button type="success" size="mini" @click="handleIndex" v-if="isEdit">保存</el-button>
      <el-button size="mini" @click="handleRet">取消</el-button>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "drugNumber",
    props: {
      value: Object,
      remaining: {
        type: Boolean,
        default: false
      },
      number: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        UseUnit: [{
          value: '1', label: ''
        }],
        DosageForm: [{
          value: '1', label: ''
        }],
        Category: [{
          value: '1', label:''
        }],
        DosageForm_ope: '1',
        UseUnit_ope: '1',
        Category_ope: '1',
        manufacturer: '',
        specification: '',
        dName: '',
        rules: {
          name: [{required: true, message: '该项为必填项', trigger: 'blur'}]
        }
      }
    },
    methods: {
      handleIndex() {
        this.$message ({
          message: '已保存',
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

</style>
