<template>
  <div>
    <el-card class="form-container" shadow="never">
      <el-form :inline="true" label-width="120px" size="small">
        <p>
          <el-form-item  label="咨询人姓名：">
            <el-input :disabled="!isEdit" siez="mini" v-model="value.consultant"></el-input>
          </el-form-item>
          <el-form-item  label="咨询人电话：">
            <el-input :disabled="!isEdit" size="mini" v-model="value.phone"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item  label="咨询时间：">
            <el-input :disabled="!isEdit" size="mini" v-model="value.time"></el-input>
          </el-form-item>
          <el-form-item  label="咨询方式：">
            <el-input :disabled="!isEdit" size="mini" v-model="value.consult_type"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item  label="老人姓名：">
            <el-input :disabled="!isEdit" size="mini" v-model="value.member_name"></el-input>
          </el-form-item>
          <el-form-item  label="年龄：">
            <el-input :disabled="!isEdit" size="mini" v-model="value.age"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="备注：">
            <el-input
              :disabled="!isEdit"
              v-model="value.note"
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
  import {consultid} from "@/api/fmg";

  const defaultValue = {
    id: null,
    time: null,
    consultant: null,
    phone: null,
    consult_type: null,
    intention: null,
    member_name: null,
    age: null,
    selfcare_ability: null,
    note: null,
    result: null
  };
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
        value: null,
      }
    },
    created() {
      if(this.$route.query.id){
        consultid(this.$route.query.id).then(response => {
          this.value = response.data.data
        })
      }
      else{
        this.value = Object.assign({}, defaultValue);
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
