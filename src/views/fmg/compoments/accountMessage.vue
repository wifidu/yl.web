<template>
  <div>
    <el-card class="form-container" shadow="never">
      <el-form :inline="true" label-width="120px" size="small">
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
          <el-form-item  label="账单余额：" prop="account_balance">
            <el-input size="mini"></el-input>
          </el-form-item>
          <el-form-item  label="床位费：" prop="bed_money">
            <el-input size="mini"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item  label="膳食费：" prop="meals">
            <el-input size="mini"></el-input>
          </el-form-item>
          <el-form-item  label="护理费：" prop="month_fee">
            <el-input size="mini"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item  label="其他费用：" prop="other_fee">
            <el-input size="mini"></el-input>
          </el-form-item>
        </p>
      </el-form>
      <el-form style="text-align: center">
        <el-button type="success" size="mini">充值</el-button>
        <el-button type="success" size="mini">退费</el-button>
        <el-button type="success" size="mini">提现</el-button>
        <el-button size="mini" @click="handleCancel">返回</el-button>
      </el-form>
    </el-card>

  </div>
</template>

<script>
  export default {
    name: "accountMessage",
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
