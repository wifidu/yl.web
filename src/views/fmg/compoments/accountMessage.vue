<template>
  <div>
    <el-card class="form-container" shadow="never">
      <el-form :inline="true" label-width="120px" size="small">
        <p>
          <el-form-item  label="账单编号：">
            <el-input size="mini" v-model="value.account_number"></el-input>
          </el-form-item>
          <el-form-item  label="会员编号：">
            <el-input size="mini" v-model="value.member_name"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item  label="会员姓名：">
            <el-input size="mini" v-model="value.member_name"></el-input>
          </el-form-item>
          <el-form-item  label="床位：">
            <el-input size="mini" v-model="value.beds"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item  label="账单余额：">
            <el-input size="mini" v-model="value.account_balance"></el-input>
          </el-form-item>
          <el-form-item  label="床位费：">
            <el-input size="mini" v-model="value.beds_cost"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item  label="膳食费：">
            <el-input size="mini" v-model="value.meal_cost"></el-input>
          </el-form-item>
          <el-form-item  label="护理费：">
            <el-input size="mini" v-model="value.nursing_cost"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item  label="其他费用：">
            <el-input size="mini" v-model="value.other_cost"></el-input>
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
  import {accountMGList} from "@/api/fmg";

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
    created(){
      if(this.$route.query.id){
        accountMGList(this.$route.query.id).then(response => {
          this.value = response.data.data
        })
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
