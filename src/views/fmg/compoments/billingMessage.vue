<template>
  <div>
    <el-card class="form-container" shadow="never">
      <el-form :disabled="true" :inline="true" label-width="120px" size="small">
        <p>
          <el-form-item  label="账单编号：" prop="account_number">
            <el-input size="mini"></el-input>
          </el-form-item>
          <el-form-item  label="会员编号：" prop="vip_number">
            <el-input size="mini"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item  label="会员姓名：" prop="vip_name">
            <el-input size="mini"></el-input>
          </el-form-item>
          <el-form-item  label="床位：" prop="bed">
            <el-input size="mini"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item  label="身份证号：" prop="account_balance">
            <el-input size="mini"></el-input>
          </el-form-item>
          <el-form-item  label="押金金额：" prop="bed_money">
            <el-input size="mini"></el-input>
          </el-form-item>
        </p>
      </el-form>
      <el-form style="text-align: center">
        <el-button size="mini" @click="handleCancel">返回</el-button>
      </el-form>
    </el-card>

  </div>
</template>

<script>
  export default {
    name: "billingMessage",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      },
      editId: {
        type: Boolean,
        default: false
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
        other_fee: ''
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
