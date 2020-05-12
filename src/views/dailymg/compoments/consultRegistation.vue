<template>
  <div>
    <el-card class="form-container" shadow="never">
      <el-form :inline="true" label-width="120px" size="small">
        <p>
          <el-form-item  label="咨询人姓名：" prop="account_number">
            <el-input :disabled="!isEdit" siez="mini"></el-input>
          </el-form-item>
          <el-form-item  label="咨询人电话：" prop="vip_number">
            <el-input :disabled="!isEdit" size="mini"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item  label="咨询时间：" prop="vip_name">
            <el-input :disabled="!isEdit" size="mini"></el-input>
          </el-form-item>
          <el-form-item  label="咨询方式：" prop="bed">
            <el-input :disabled="!isEdit" size="mini"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item  label="老人姓名：" prop="bed_money">
            <el-input :disabled="!isEdit" size="mini"></el-input>
          </el-form-item>
          <el-form-item  label="年龄：" prop="bed_money">
            <el-input :disabled="!isEdit" size="mini"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="备注：">
            <el-input
              :disabled="!isEdit"
              v-model="remarks"
              type="textarea"
              :rows="2"
              style="width: 500px">
            </el-input>
          </el-form-item>
        </p>
      </el-form>
      <el-form style="text-align: center">
        <el-button type="success" size="mini">保存</el-button>
        <el-button size="mini" @click="handleCancel">返回</el-button>
      </el-form>
    </el-card>

  </div>
</template>

<script>
  export default {
    name: "consultRegistation",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        account_number: '',
        vip_number: '',
        vip_name: '',
        bed: '',
        account_balance: '',
        bed_money: '',
        meals: '',
        month_fee: '',
        other_fee: '',
        remarks: null,
      }
    },
    methods: {
      handleCancel() {
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .form-container {
    width: 800px;
  }
</style>
