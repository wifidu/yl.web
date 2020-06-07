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
          <el-form-item label="入住时间：" prop="check-in_time" >
            <el-input v-model="add_list['check-in_time']" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="床位号：" prop="number">
            <el-input v-model="add_list.bed_cost.number" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="床位标准：" prop="standard">
            <el-input v-model="add_list.bed_cost.standard" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="床位费：" prop="cost">
            <el-input v-model="add_list.bed_cost.cost" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="膳食类型：" prop="type">
            <el-input v-model="add_list.meal_cost.type" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="膳食费：" prop="cost">
            <el-input v-model="add_list.meal_cost.cost" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="一次性消费：" prop="one-time_cost.cost">
            <el-input v-model="add_list['one-time_cost'].cost" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="业务变更原因：" prop="business_change_reason">
            <el-input v-model="add_list.business_change_reason" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="膳食变更原因：" prop="meal_change_reason">
            <el-input v-model="add_list.meal_change_reason" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="业务变更日期：" prop="meal_change_date-in_date">
            <el-input v-model="add_list.meal_change_date" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="膳食变更日期：" prop="business_change_date">
            <el-input v-model="add_list.business_change_date" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="自理能力：" prop="care_level">
            <el-radio v-model="add_list['care_level']" :disabled="edit" :label="0">全自理</el-radio>
            <el-radio v-model="add_list['care_level']" :disabled="edit" :label="1">轻度依赖</el-radio>
            <el-radio v-model="add_list['care_level']" :disabled="edit" :label="2">中度依赖</el-radio>
            <el-radio v-model="add_list['care_level']" :disabled="edit" :label="3">重度依赖</el-radio>
            <el-radio v-model="add_list['care_level']" :disabled="edit" :label="4">完全依赖</el-radio>
            <el-radio v-model="add_list['care_level']" :disabled="edit" :label="5">临终关怀</el-radio>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="add_list" :rules="rules" size="small" label-width="180px">
          <el-form-item label="体检报告路径：" prop="medical_port_path" v-if="!edit">
            <el-upload
              class="upload-demo"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
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
          care_level: [{required: true, message: '请输入照护等级'}],
          // // 'check-in_time': [{required: true, message: '请输入床位费'}],
          // number: [{required: true,  message: '请选择床位号'}],
          // standard: [{required: true, message: '请输入床位标准'}],
          // cost: [{required: true, message: '请输入床位费'}],
          // type: [{required: true, message: '请输入膳食类别'}],
          // cost: [{required: true, message: '请输入膳食费'}],
          // 'one-time_cost.cost': [{required: true, message: '请输入一次性消费'}],
          business_change_reason: [{required: true, message: '请输入业务变更原因'}],
          business_change_date: [{required: true, message: '请输入业务变更日期'}],
          meal_change_reason: [{required: true, message: '请输入膳食变更原因'}],
          meal_change_date: [{required: true, message: '请输入膳食变更日期'}],
        },
        add_list:{
          "member_name": "",
          "care_level": 0,
          "check-in_time": null,
          "bed_cost": {
            "number": "",
            "standard": "",
            "cost": ""
          },
          "meal_cost": {
            "type":"",
            "cost": ""
          },
          "one-time_cost":{
            "cost":""
          },
          "business_change_reason":"",
          "business_change_date":null,
          "meal_change_reason":"",
          "meal_change_date":null
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
        getList('/member-manage/check-in/',this.id).then(response => {
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
        if (this.add_list.member_name !== "" && this.add_list.care_level !== null && this.add_list.bed_cost.number !== "" && this.add_list.bed_cost.standard !== "" && this.add_list.bed_cost.cost !== "" && this.add_list.meal_cost.type !== ""&& this.add_list.meal_cost.cost !== "" && this.add_list['one-time_cost'].cost !== "" && this.add_list.business_change_reason !== "" && this.add_list.business_change_date !== null && this.add_list.meal_change_reason !== "" && this.add_list.meal_change_date !== null){
          update('/member-manage/check-in/',this.add_list).then(response => {
            this.listLoading = false
            this.listLoading=true;

            if(response.status === 200){
              this.$message({
                type: 'success',
                message: response.message
              });
            }
            this.$router.push({path:'/oms/checkin'})
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


