<template>
  <div>
    <el-card class="form-container" shadow="never">
      <el-form :model="value"  ref="matrialDetailForm" :inline="true" label-width="120px" size="small">
        <p>
          <el-form-item  label="物资名称：" prop="name">
            <el-input size="mini" v-model="value.name"></el-input>
          </el-form-item>
          <el-form-item  label="品牌：" prop="brand">
            <el-input size="mini" v-model="value.brand"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="型号：">
            <el-input v-model="value.model"></el-input>
          </el-form-item>
          <el-form-item label="单位：">
            <el-select v-model="value.unit">
              <el-option v-for="item in unitOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="供应商：">
            <el-input v-model="value.supplier"></el-input>
          </el-form-item>
        </p>
      </el-form>
      <el-form style="text-align: center">
        <el-button type="success" size="mini" @click="handleSave('matrialDetailForm')">保存</el-button>
        <el-button size="mini" @click="handleCancel">取消</el-button>
      </el-form>
    </el-card>

  </div>
</template>

<script>
  import {save} from '@/api/materialData';

  const defaultValue = {
    id: '',
    name: null,
    brand: null,
    model: null,
    number: null,
    supplier: null,
    unit: null
  };
  export default {
    name: "matrialDetail",
    data() {
      return {
        value: null,
        unitOptions: [
          {value: 0, label: '支'},
          {value: 1, label: '个'},
          {value: 2, label: '包'}
        ]
      };
    },
    created() {
      this.value = Object.assign({},defaultValue);
    },
    methods: {
      getAssetsNumber(){
        get_asset_number().then( response =>{
          this.value.id = response.data.assets_number
        })
      },
      handleSave(formName){
        this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
        }).then(() => {
          save(this.value).then(response => {
            this.$message({
              message: '保存成功',
              type: 'error',
              duration: 1000
            });
          });
          this.$router.back();
        })
      },
      handleCancel() {
        this.$router.back();
      },
      handleRemove() {
        console.log('??');
      },
    }
  }
</script>

<style scoped>
  .form-container {
    width: 800px;
  }
</style>
