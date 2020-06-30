<template>
  <div class="app-container" style="margin-top: 15px;text-align: center;">
    <el-form :inline="true" size="mini" label-width="120px" :rules="rules" ref="DMessage">
      <p>
        <el-form-item label="药品名称" prop="name">
          <el-input v-model="dName" style="width: 250px" :disabled="!isEdit"></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="name">
          <el-select v-model="Category_ope" size="medium" style="width:250px" :disabled="!isEdit">
            <el-option v-for="item in Category" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </p>
      <p>
        <el-form-item label="厂家" prop="name">
          <el-input v-model="manufacturer" style="width: 250px" :disabled="!isEdit"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="name">
          <el-input v-model="specification" style="width: 250px" :disabled="!isEdit"></el-input>
        </el-form-item>
      </p>
      <p>
        <el-form-item label="用药单位" prop="name">
          <el-select v-model="UseUnit_ope" size="medium" style="width:250px" :disabled="!isEdit">
            <el-option v-for="item in UseUnit" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="剂型" prop="name">
          <el-select v-model="DosageForm_ope" size="medium" style="width:250px" :disabled="!isEdit">
            <el-option v-for="item in DosageForm" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
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
      name: "DMessage",
      props: {
        value: Object,
        isEdit: {
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
          this.$router.push({path:'/drug/drugMessage'});
        }
      }
    }
</script>

<style scoped>

</style>
