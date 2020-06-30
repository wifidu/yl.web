<template>
  <div>
    <el-card class="form-container" shadow="never">
      <el-form :inline="true"  label-width="120px" size="small">
        <p>
          <el-form-item label="会员名字">
            <el-input :disabled="true" size="mini" v-model="value.account.member_name"></el-input>
          </el-form-item>
          <el-form-item label="床位">
            <el-input :disabled="true" size="mini" v-model="value.account.beds"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="身份证号">
            <el-input :disabled="true" size="mini" v-model="value.cd_card"></el-input>
          </el-form-item>
          <el-form-item label="退费类型">
            <el-select :disabled="true" v-model="value.refundtype">
              <el-option v-for="item in refundtypeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="费用名称">
            <el-input size="mini" v-model="value.fee_name"></el-input>
          </el-form-item>
          <el-form-item label="退费金额">
            <el-input size="mini" v-model="value.refund_amount"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="支付方式">
            <el-radio v-model="value.spending_way" label="1">现金</el-radio>
            <el-radio v-model="value.spending_way" label="2">刷卡</el-radio>
            <el-radio v-model="value.spending_way" label="3">转账</el-radio>
            <el-radio v-model="value.spending_way" label="4">微信</el-radio>
            <el-radio v-model="value.spending_way" label="5">支付宝</el-radio>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="实退金额">
            <el-input :disabled="true" size="mini" v-model="value.real_refund"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="存入个人账户">
            <el-input :disabled="true" size="mini" v-model="value.account.deposit"></el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="备注：">
            <el-input
              v-model="value.remarks"
              type="textarea"
              :rows="2"
              style="width: 500px">
            </el-input>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="经办人">
            <el-input :disabled="true" size="mini" v-model="value.agent"></el-input>
          </el-form-item>
        </p>
      </el-form>
      <el-form style="text-align: center">
        <el-button type="success" size="mini" @click="handleSave">直接退款</el-button>
        <el-button size="mini" @click="handleCancel">返回</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>

  const defaultValue = {
    agent: null,
    refund_amount: null,
    cd_card: null,
    fee_name: null,
    real_refund: null,
    spending_way: null,
    remarks: null,
    account: {
      member_number: null,
      beds: null,
      deposit: null,
    }
  };
    export default {
      name: "initiativeRefund",
      data() {
          return{
            refundtype: 0,
            refundtypeOptions: [{value: 0, label:'直接退费'}],
            value: null,
          };
      },
      created() {
        this.value = Object.assign({}, defaultValue);
      },
      methods: {
        handleSave() {
          this.$confirm('是否提交数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            })
        },
        handleCancel() {
        }
      }
    }
</script>

<style scoped>
  .form-container {
    width: 800px;
  }
</style>
