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
          <el-form-item label="床位号：" prop="bed_number" >
            <el-input v-model="add_list.bed_number" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="外出时间：" prop="out_time">
            <el-input v-model="add_list.out_time" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="计划返回时间：" prop="plan_to_return">
            <el-input v-model="add_list.plan_to_return" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="请假天数：" prop="leave_days">
            <el-input v-model="add_list.leave_days" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="陪同人电话：" prop="accompany_number">
            <el-input v-model="add_list.accompany_number" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="陪同人姓名：" prop="accompany_name">
            <el-input v-model="add_list.accompany_name" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="外出原因：" prop="out_reason">
            <el-input v-model="add_list.out_reason" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="登记人：" prop="register_person">
            <el-input v-model="add_list.register_person" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="登记时间：" prop="check-in_time">
            <el-input v-model="add_list['check-in_time']" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="返回时间：" prop="return_time">
            <el-input v-model="add_list.return_time" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="实际请假天数：" prop="actual_leave_days">
            <el-input v-model="add_list.actual_leave_days" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="总计：" prop="total">
            <el-input v-model="add_list.total" :disabled="edit" class="input-width" style="width:320px"></el-input>
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
          bed_number: [{required: true, message: '请输入床位号'}],
          out_time: [{required: true, message: '请输入外出时间'}],
          "check-in_time": [{required: true, message: '请输入登记时间'}],
          plan_to_return: [{required: true, message: '请输入计划返回时间'}],
          leave_days: [{required: true, message: '请输入请假天数'}],
          accompany_number: [{required: true, message: '请输入陪同人电话'}],
          accompany_name: [{required: true, message: '请输入陪同人姓名'}],
          out_reason: [{required: true, message: '请输入外出原因'}],
          register_person: [{required: true, message: '请输入登记人'}],
          return_time: [{required: true, message: '请输入返回时间'}],
          actual_leave_days: [{required: true, message: '请输入实际外出天数'}],
          total: [{required: true, message: '请输入总计'}],
        },
        add_list: {
          "member_name": "",
          "bed_number": "",
          "out_time": null,
          "plan_to_return":null,
          "leave_days": null,
          "accompany_number":"",
          "accompany_name": "",
          "out_reason":"",
          "register_person":"",
          "check-in_time":null,
          "return_time":null,
          "actual_leave_days":null,
          "total":null,
          "expense_item": {
            "type": "吃饭",
            "cost": "12323"
          }

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
      console.log('this.id:'+this.id)
      console.log('this.edit:'+this.edit)
      if(this.id){
        getList('/member-manage/out-manage/',this.id).then(response => {
          console.log(response.data)
          this.add_list = response.data
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
        if (this.add_list.member_name !== "" && this.add_list.out_time !== null && this.add_list.bed_number !== '' && this.add_list.plan_to_return !== null && this.add_list.leave_days !== null && this.add_list.accompany_number !== ""&& this.add_list.accompany_name !== "" && this.add_list.out_reason !== "" && this.add_list.register_person !== ""  && this.add_list['check-in_time'] !== null && this.add_list.return_time !== null && this.add_list.actual_leave_days !== null && this.add_list.total !== null){
          update('/member-manage/out-manage/',this.add_list).then(response => {
            this.listLoading = false
            this.listLoading=true;
            if(response.status === 200){
              this.$message({
                type: 'success',
                message: response.message
              });
            }
            this.$router.push({path:'/oms/outgoing'})
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


