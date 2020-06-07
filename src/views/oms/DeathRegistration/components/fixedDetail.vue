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
          <el-form-item label="死亡时间：" prop="death_time" >
            <el-input v-model="add_list.death_time" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="member_ID">
            <el-input v-model="add_list.member_ID" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="开具证明时间：" prop="certificate_time">
            <el-input v-model="add_list.certificate_time" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="家庭地址：" prop="family_address">
            <el-input v-model="add_list.family_address" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="contact_number">
            <el-input v-model="add_list.contact_number" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="入住主诊断：" prop="check-in_main_diagnosis">
            <el-input v-model="add_list['check-in_main_diagnosis']" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="死亡疾病名称：" prop="death_disease">
            <el-input v-model="add_list.death_disease" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="开具证明医生：" prop="certificate_doctor">
            <el-input v-model="add_list.certificate_doctor" :disabled="edit" class="input-width" style="width:320px"></el-input>
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
          family_address: [{required: true, message: '请输入家庭住址'}],
          "check-in_main_diagnosis": [{required: true, message: '请输入入住主诊断'}],
          contact_number: [{required: true, message: '请输入联系电话'}],
          death_time: [{required: true, message: '请输入死亡时间'}],
          certificate_time: [{required: true, message: '请输入开具证明时间'}],
          death_disease: [{required: true, message: '请输入死亡疾病'}],
          certificate_doctor: [{required: true, message: '请输入开具证明医生'}],
        },
        add_list: {
          "member_name": "",
          "member_ID": "",
          "family_address": "",
          "contact_number": "",
          "check-in_main_diagnosis": "",
          "death_time": null,
          "certificate_time": null,
          "death_disease": "",
          "certificate_doctor": "",
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
        getList('/member-manage/death-registration/',this.id).then(response => {
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
        if (this.add_list.member_name !== "" && this.add_list.member_ID !== null && this.add_list.death_time !== null && this.add_list['check-in_main_diagnosis'] !== "" && this.add_list.certificate_time !== null && this.add_list.family_address !== ""&& this.add_list.contact_number !== "" && this.add_list.death_disease !== "" && this.add_list.certificate_doctor !== "" ){
          update('/member-manage/death-registration/',this.add_list).then(response => {
            this.listLoading = false
            this.listLoading=true;
            if(response.status === 200){
              this.$message({
                type: 'success',
                message: response.message
              });
            }
            this.$router.push({path:'/oms/death'})
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


