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
          <el-form-item label="老人姓名：" prop="elderly_name" >
            <el-input v-model="add_list.elderly_name" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：">
            <el-input v-model="add_list.elderly_ID" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="年龄：">
            <el-input v-model="add_list.elderly_age" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="elderly_gender">
            <el-radio v-model="add_list.elderly_gender" :disabled="edit" label='0' >男</el-radio>
            <el-radio v-model="add_list.elderly_gender" :disabled="edit" label='1' >女</el-radio>
          </el-form-item>
          <el-form-item label="床位号：" prop="bed_number">
            <el-input v-model="add_list.bed_number" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="床位费用：" prop="bed_cost">
            <el-input v-model="add_list.bed_cost" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="入住日期：" prop="check-in_date">
            <el-input v-model="add_list['check-in_date']" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="contract_number">
            <el-input v-model="add_list.contract_number" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="预约人：" prop="appoint_person">
            <el-input v-model="add_list.appoint_person" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="预约押金：">
            <el-input v-model="add_list.appoint_deposit" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="add_list" :rules="rules" size="small" label-width="180px">
          <el-form-item label="居住地址：">
            <el-input v-model="add_list.address" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="自理能力：" prop="self-care_ability">
            <el-radio v-model="add_list['self-care_ability']" :disabled="edit" :label="0">自理</el-radio>
            <el-radio v-model="add_list['self-care_ability']" :disabled="edit" :label="1">半自理</el-radio>
            <el-radio v-model="add_list['self-care_ability']" :disabled="edit" :label="2">失能</el-radio>
          </el-form-item>
          <el-form-item label="预约时间：" >
            <el-input v-model="add_list.appoint_time" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            <el-input v-model="add_list.remark" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="是否入住：" >
            <el-radio v-model="add_list.is_checkin" :disabled="edit" label='0' >是</el-radio>
            <el-radio v-model="add_list.is_checkin" :disabled="edit" label='1' >否</el-radio>
          </el-form-item>
          <el-form-item label="是否取消入住：">
            <el-radio v-model="add_list.is_cancel" :disabled="edit" label='0' >是</el-radio>
            <el-radio v-model="add_list.is_cancel" :disabled="edit" label='1' >否</el-radio>
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
          elderly_name: [{required: true, message: '请输入老人名称'}],
          bed_number: [{required: true, message: '请输入床位号'}],
          bed_cost: [{required: true, message: '请输入床位费用'}],
          'check-in_date': [{required: true,  message: '请选择入住日期'}],
          contract_number: [{required: true, message: '请输入联系电话'}],
          appoint_person: [{required: true, message: '请输入预约人'}],
          elderly_gender: [{required: true, message: '请输入老人性别'}],
          'self-care_ability': [{required: true, message: '请输入自理能力'}],
          remark: [{required: true, message: '请输入备注'}],
        },
        add_list:{
          'bed_number':'',
          'bed_cost':null,
          'check-in_date':null,
          'contract_number':'',
          'appoint_person':'',
          'elderly_name':'',
          'elderly_gender':'0',
          'self-care_ability':'0',
          'remark':'',
          'appoint_deposit':'',
          'appoint_time':'',
          'elderly_ID':'',
          'elderly_age':'',
          'address':'',
          'is_checkin':'1',
          'is_cancel':	'1',
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
        getList('/member-manage/book-bed/',this.id).then(response => {
          console.log(response.data)
          this.add_list = response.data
          this.add_list.elderly_gender = this.add_list.elderly_gender.toString()
          this.add_list['self-care_ability'] = this.add_list['self-care_ability'].toString()
          this.add_list.is_checkin = this.add_list.is_checkin.toString()
          this.add_list.is_cancel = this.add_list.is_cancel.toString()
          console.log(this.add_list)
          let a = this.add_list['self-care_ability']
          if (a === 0){
            this.add_list['self-care_ability'] = '0';
          }if (a === 1){
            this.add_list['self-care_ability'] = '1';
          }if (a === 2){
            this.add_list['self-care_ability'] = '2';
          }
          console.log(this.add_list['self-care_ability'])
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
        console.log(this.add_list)
        if (this.add_list.elderly_name !== "" && this.add_list.bed_cost !== "" && this.add_list['check-in_date'] !== "" && this.add_list.contract_number !== "" && this.add_list.appoint_person !== "" && this.add_list.elderly_name !== ""&& this.add_list.elderly_gender !== "" && this.add_list['self-care_ability'] !== "" && this.add_list.remark !== ""){
          update('/member-manage/book-bed/',this.add_list).then(response => {
            this.listLoading = false
            this.listLoading=true;
            this.add_list.elderly_gender = parseInt(this.add_list.elderly_gender)
            this.add_list['self-care_ability'] = parseInt(this.add_list['self-care_ability'])
            this.add_list.is_checkin = parseInt(this.add_list.is_checkin)
            this.add_list.is_cancel = parseInt(this.add_list.is_cancel)
            if(response.status === 200){
              this.$message({
                type: 'success',
                message: response.message
              });
            }
            this.$router.push({path:'/oms/book'})
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


