<template>
  <div>
    <el-card class="form-container" shadow="never">
      <el-form :inline="true" label-width="120px" size="small">
        <p>
          <el-form-item  label="会员姓名：">
            <el-input :disabled="!isEdit" size="mini" v-model="value.member_name"></el-input>
          </el-form-item>
          <el-form-item  label="床位：">
            <el-input :disabled="!isEdit" size="mini" v-model="value.beds"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="事故等级：">
            <el-input :disabled="!isEdit" size="mini" v-model="value.level_accident"></el-input>
          </el-form-item>
          <el-form-item  label="发生时间：">
            <el-input :disabled="!isEdit" size="mini" v-model="value.occurrence_time"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item  label="值班人员：">
            <el-input :disabled="!isEdit" size="mini" v-model="value.duty_personnel"></el-input>
          </el-form-item>
          <el-form-item  label="负责人：">
            <el-input :disabled="!isEdit" size="mini" v-model="value.head"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="事故描述：">
            <el-input
              :disabled="!isEdit"
              v-model="value.description"
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
  import {accidentadd} from "@/api/fmg";
  const defualtValue = {
    beds: null,
    member_name: null,
    level_accident: null,
    occurrence_time: null,
    duty_personnel: null,
    head: null,
    description: null
  };
  export default {
    name: "accidentEditor",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: true
      },
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
    created() {
      if(this.$route.query.id){
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
