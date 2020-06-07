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
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="add_list" :rules="rules" size="small" label-width="180px">
          <el-form-item label="会员姓名：" prop="member_name" >
            <el-input v-model="add_list.member_name" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="床位号：" prop="bed" >
            <el-input v-model="add_list.bed" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="member_ID">
            <el-input v-model="add_list.member_ID" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="退住时间：" prop="check-out_time">
            <el-input v-model="add_list['check-out_time']" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="退住原因：" prop="check-out_reason">
            <el-input v-model="add_list['check-out_reason']" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="经办人：" prop="manager">
            <el-input v-model="add_list.manager" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            <el-input v-model="add_list.remark" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="登记时间：" prop="manage_time">
            <el-input v-model="add_list.manage_time" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="账户余额：" prop="account_balance">
            <el-input v-model="add_list.account_balance" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
<!--          <el-form-item label="费用项目：" prop="expense_item">-->
<!--            <el-input v-model="add_list.expense_item" :disabled="edit" class="input-width" style="width:320px"></el-input>-->
<!--          </el-form-item>-->
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
          member_name: [{required: true, message: '请输入会员名称'}],
          member_ID: [{required: true, message: '请输入身份证号'}],
          // // 'check-in_time': [{required: true, message: '请输入床位费'}],
          // number: [{required: true,  message: '请选择床位号'}],
          // standard: [{required: true, message: '请输入床位标准'}],
          // cost: [{required: true, message: '请输入床位费'}],
          // type: [{required: true, message: '请输入膳食类别'}],
          // cost: [{required: true, message: '请输入膳食费'}],
          // 'one-time_cost.cost': [{required: true, message: '请输入一次性消费'}],
          bed: [{required: true, message: '请输入床位号'}],
          "check-out_time": [{required: true, message: '请输入退住日期'}],
          "check-out_reason": [{required: true, message: '请输入退住原因'}],
          manager: [{required: true, message: '请输入经办人'}],
          manage_time: [{required: true, message: '请输入登记时间'}],
          remark: [{required: true, message: '请输入备注'}],
          account_balance: [{required: true, message: '请输入账户余额'}],
        },
        add_list:{
          "id": null,
          "member_name": "",
          "member_ID": "",
          "bed": "",
          "check-out_time": null,
          "check-out_reason": "",
          "manager": "",
          "manage_time": null,
          "remark": "",
          "account_balance": "",
          "expense_item":{
            "吃饭":1234
          },
          "deleted_at": null,
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
      this.add_list['self-care_ability'] = '0';
      console.log('this.id:'+this.id)
      console.log('this.edit:'+this.edit)
      if(this.id){
        getList('/member-manage/check-out/',this.id).then(response => {
          console.log(response.data)
          this.add_list = response.data
          this.add_list.care_level = this.add_list.care_level.toString()
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
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
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
      handleViewDetail(index,row){
        this.$router.push({path:'/oms/returnApplyDetail',query:{id:row.id}})
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
        this.add_list.care_level = parseInt(this.add_list.care_level)
        console.log(this.add_list)
        if (this.add_list.member_name !== "" && this.add_list.member_ID !== null && this.add_list.bed !== "" && this.add_list['check-out_time'] !== "" && this.add_list['check-out_reason'] !== "" && this.add_list.manager !== ""&& this.add_list.manage_time !== "" && this.add_list.remark !== "" && this.add_list.account_balance !== "" ){
          update('/member-manage/check-out/',this.add_list).then(response => {
            this.listLoading = false
            this.listLoading=true;
            if(response.status === 200){
              this.$message({
                type: 'success',
                message: response.message
              });
            }
            this.$router.push({path:'/oms/withdraw'})
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


