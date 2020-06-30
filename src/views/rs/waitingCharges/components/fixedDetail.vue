<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <el-button
          style="float:right"
          type="primary"
          @click="addList()"
          v-if=" !edit"
          size="small">
          保存
        </el-button>
        <el-button
          style="float:right"
          type="primary"
          @click="handleBack()"
          v-if="edit && this.id"
          size="small">
          返回
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="add_list" :rules="rules" size="small" label-width="180px">
          <el-form-item label="会员号：" prop="member_profile_id">
            <el-input v-model="add_list.member_profile_id" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
<!--          <el-form-item label="岗位类型：" prop="position_type">-->
<!--            <el-radio v-model="add_list.position_type" label=0 :disabled="edit">行政岗)</el-radio>-->
<!--            <el-radio v-model="add_list.position_type" label=1 :disabled="edit">财务岗</el-radio>-->
<!--            <el-radio v-model="add_list.position_type" label=2 :disabled="edit">护理岗</el-radio>-->
<!--            <el-radio v-model="add_list.position_type" label=3 :disabled="edit">管理岗</el-radio>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--        <el-form :inline="true" :model="add_list" :rules="rules" size="small" label-width="180px">-->
          <el-form-item label="床位号：" prop="bed_number">
            <el-input v-model="add_list.bed_number" class="input-width" style="width:320px" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="会员名称：" prop="member_name">
            <el-input v-model="add_list.member_name" class="input-width" placeholder="" style="width:320px" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="退款时间：" prop="refund_time" >
            <el-input v-model="add_list.refund_time" class="input-width"  style="width:320px" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="收费时间：" prop="charges_time">
            <el-input v-model="add_list.charges_time" class="input-width"  style="width:320px" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="床位费：" prop="beds_cost">
            <el-input v-model="add_list.beds_cost" class="input-width"  style="width:320px" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="护理费：" prop="nursing_cost">
            <el-input v-model="add_list.nursing_cost" class="input-width"  style="width:320px" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="风险保险：" prop="risk_insurance">
            <el-input v-model="add_list.risk_insurance" class="input-width"  style="width:320px" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="膳食费：" prop="meal_cost">
            <el-input v-model="add_list.meal_cost" class="input-width"  style="width:320px" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="存款余额：" prop="deposit">
            <el-input v-model="add_list.deposit" class="input-width"  style="width:320px" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="其他：" >
            <el-input v-model="add_list.incidental" class="input-width"  style="width:320px" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="其他费用：" >
            <el-input v-model="add_list.other_cost" class="input-width"  style="width:320px" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="发票号码：" >
            <el-input v-model="add_list.invoice_number" class="input-width"  style="width:320px" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="发票费用：" >
            <el-input v-model="add_list.invoice_expenses" class="input-width"  style="width:320px" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="所有费用：" >
            <el-input v-model="add_list.total_expenses" class="input-width"  style="width:320px" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="备注：" >
            <el-input v-model="add_list.mark" class="input-width"  style="width:320px" :disabled="edit"></el-input>
          </el-form-item>
        </el-form>
      </div>

    </el-card>


  </div>
</template>
<script>
  import {formatDate} from '@/utils/date';
  import {update,addList,deleteApply,getList} from '@/api/returnApply';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    receiverKeyword: null,
    status: null,
    createTime: null,
    handleMan: null,
    handleTime: null
  };
  const  sex=[{
    label:'男',
    value:0
  },
    {
      label:'女',
      value:1
    }]
  const defaultStatusOptions=[
    {
      label: '正在使用',
      value: 0
    },
    {
      label: '空闲中',
      value: 1
    },
    // {
    //   label: '已完成',
    //   value: 2
    // },
    // {
    //   label: '已拒绝',
    //   value: 3
    // }
  ];
  export default {
    name:'returnApplyList',
    data() {
      return {
        edit: true,
        listQuery:Object.assign({},defaultListQuery),
        statusOptions: Object.assign({},defaultStatusOptions),
        list:null,
        rules: {
          member_profile_id: [{required: true, message: '请输入会员号'}],
          bed_number: [{required: true, message: '请输入床位号'}],
          member_name: [{required: true, message: '请输入会员名称'}],
          refund_time: [{required: true,  message: '请输入退款时间'}],
          charges_time: [{required: true, message: '请输入收费时间'}],
          beds_cost: [{required: true, message: '请输入床位费'}],
          nursing_cost: [{required: true, message: '请输入护理费'}],
          risk_insurance: [{required: true, message: '请输入风险保险'}],
          meal_cost: [{required: true, message: '请输入膳食费'}],
          deposit: [{required: true, message: '请输入存款余额'}],
        },
        add_list:{
          "member_profile_id": null,
          "bed_number": null,
          "member_name": "",
          "refund_time": null,
          "charges_time": null,
          "beds_cost": "",
          "nursing_cost": "",
          "risk_insurance": "",
          "meal_cost": "",
          "deposit": "",
          "incidental": "",
          "other_cost": "",
          "invoice_number": null,
          "invoice_expenses": "",
          "total_expenses": "",
          "mark": null,
          "is_ charges": 0,
        },
        total:null,
        listLoading:false,
        multipleSelection:[],
        operateType:1,
        array:[],
        operateOptions: [
          {
            label: "批量删除",
            value: 1
          }
        ],
      }
    },
    created(){
      this.id = this.$route.query.id;
      this.edit = this.$route.query.edit;
      console.log(this.id)
      console.log(this.edit)
      if(this.id){
        getList('/report-management/waiting_charges/',this.id).then(response => {
          console.log(response)
          this.add_list = response.data
          this.add_list.gender = this.add_list.gender.toString()
          console.log(this.add_list)
        })
      }
    },
    filters:{
      formatTime(time) {
        if(time==null||time===''){
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatStatus(status){
        for(let i=0;i<defaultStatusOptions.length;i++){
          if(status===defaultStatusOptions[i].value){
            return defaultStatusOptions[i].label;
          }
        }
      },
      formatReturnAmount(row){
        return row.productRealPrice*row.productCount;
      }
    },
    methods:{
      handleBack(){
        this.$router.push({path:'/rs/waitingCharges',query:{id:row.id}})
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleBatchOperate(){
        if(this.multipleSelection==null||this.multipleSelection.length<1){
          this.$message({
            message: '请选择要操作的申请',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        if(this.operateType===1){
          //批量删除
          this.$confirm('是否要进行删除操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params = new URLSearchParams();
            let ids=[];
            for(let i=0;i<this.multipleSelection.length;i++){
              ids.push(this.multipleSelection[i].id);
            }
            params.append("ids",ids);
            deleteApply(params).then(response=>{
              this.getList();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            });
          })
        }
      },
      handleSizeChange(val){
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val){
        this.listQuery.pageNum = val;
        this.getList();
      },
      addList(){
        this.listLoading=true;
        this.add_list.member_profile_id = parseInt(this.add_list.member_profile_id)
        this.add_list.bed_number = parseInt(this.add_list.bed_number)
        this.add_list.refund_time = parseInt(this.add_list.refund_time)
        this.add_list.charges_time = parseInt(this.add_list.charges_time)
        this.add_list.invoice_number = parseInt(this.add_list.invoice_number)
        this.add_list.mark = parseInt(this.add_list.mark)
        console.log(this.add_list)

        if (this.add_list.member_profile_id !== null && this.add_list.bed_number !== null && this.add_list.member_name !== '' && this.add_list.refund_time !== null && this.add_list.charges_time !== null && this.add_list.beds_cost !== '' && this.add_list.nursing_cost !== '' && this.add_list.risk_insurance !== '' && this.add_list.meal_cost !== '' && this.add_list.deposit !== ''){
          update('/report-management/waiting_charges/',this.add_list).then(response => {
            this.listLoading = false
            if(response.status === 200){
              this.$message({
                type: 'success',
                message: response.message
              });
            }
            this.$router.push({path:'/rs/waitingCharges'})
          })
        } else {
          this.$message({
            type: 'warning',
            message: '请将信息补充完整'
          });
        }
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


