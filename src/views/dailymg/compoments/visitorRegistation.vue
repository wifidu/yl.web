<template>
  <div>
    <el-card class="form-container" shadow="never">
      <el-form :inline="true" label-width="120px" size="small">
        <p>
          <el-form-item  label="访客姓名：">
            <el-input size="mini" v-model="value.visitor"></el-input>
          </el-form-item>
          <el-form-item  label="联系电话：">
            <el-input size="mini" v-model="value.phone"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item  label="来访时间：">
            <el-input size="mini" v-model="value.visit_time"></el-input>
          </el-form-item>
          <el-form-item  label="会员姓名：">
            <el-input size="mini" v-model="value.member_name"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item  label="床位：">
            <el-input size="mini" v-model="value.beds"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="备注：">
            <el-input
              v-model="value.visit_reason"
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
  import {visitingList} from '@/api/fmg';

  export default {
    name: "visitorRegistation",
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
        other_fee: '',
        remarks: null,
        value: null,
      }
    },
    created(){
      if(this.$route.query.id){
        visitingList(this.$route.query.id).then(response => {
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
