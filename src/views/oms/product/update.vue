<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <!--        <i class="el-icon-search"></i>这里添加icon-->
        <span>入住登记</span>
        <el-button
          style="float:right"
          type="primary"
          @click="addList()"
          size="small">
          保存
        </el-button>
        <!--        <el-button-->
        <!--          style="float:right;margin-right: 15px"-->
        <!--          @click="handleResetSearch()"-->
        <!--          size="small">-->
        <!--          返回-->
        <!--        </el-button>-->
      </div>


      <div style="margin-top: 15px">
        <el-form :inline="true" :model="add_list" :rules="rules" size="small" label-width="180px"
        style="display: flex;flex-direction: column">
          <el-form-item label="会员名称：">
            <el-input v-model="add_list.member_name" class="input-width" prop="name" placeholder="必填" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="照护等级：" >
            <el-radio v-model="add_list.care_level" label='0'>全自理</el-radio>
            <el-radio v-model="add_list.care_level" label='1'>轻度依赖</el-radio>
            <el-radio v-model="add_list.care_level" label='2'>中度依赖</el-radio>
            <el-radio v-model="add_list.care_level" label='3'>重度依赖</el-radio>
            <el-radio v-model="add_list.care_level" label='4'>完全依赖</el-radio>
            <el-radio v-model="add_list.care_level" label='5'>临终关怀</el-radio>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="add_list" :rules="rules" size="small" label-width="180px">
          <el-form-item label="床位费：">
            <el-input v-model="add_list.bed_cost.cost" class="input-width" placeholder="必填" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="床位号：">
            <el-input v-model="add_list.bed_cost.number" class="input-width" placeholder="必填" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="床位标准：">
            <el-input v-model="add_list.bed_cost.standard" class="input-width" placeholder="必填" style="width:320px"></el-input>
          </el-form-item>
          <!--          <el-form-item label="入住日期：">-->
          <!--            <el-date-picker-->
          <!--              class="input-width"-->
          <!--              v-model="listQuery.handleTime"-->
          <!--              value-format="yyyy-MM-dd"-->
          <!--              type="date"-->
          <!--              placeholder="选择入住日期" style="width:300px">-->
          <!--            </el-date-picker>-->
          <!--          </el-form-item>-->
          <el-form-item label="膳食费：">
            <el-input v-model="add_list.meal_cost.cost" class="input-width" placeholder="必填" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="膳食类别：">
            <el-input v-model="add_list.meal_cost.type" class="input-width" placeholder="必填" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="一次性费：">
            <el-input v-model="add_list['one-time_cost'].cost" class="input-width" prop="phone" placeholder="必填" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="业务变更原因：">
            <el-input v-model="add_list.business_change_reason" class="input-width" placeholder="必填" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="膳食变更原因：">
            <el-input v-model="add_list.meal_change_reason" class="input-width" placeholder="必填" style="width:320px"></el-input>
          </el-form-item>
          <!--          <el-form-item label="预约时间：">-->
          <!--            <el-date-picker-->
          <!--              class="input-width"-->
          <!--              v-model="listQuery.handleTime"-->
          <!--              value-format="yyyy-MM-dd"-->
          <!--              type="date"-->
          <!--              placeholder="选择时间" style="width:300px">-->
          <!--            </el-date-picker>-->
          <!--          </el-form-item>-->
        </el-form>
        <el-form :inline="true" :model="add_list" :rules="rules" size="small" label-width="180px">

          <el-form-item label="业务变更日期：">
            <el-input v-model="add_list.heigbusiness_change_date" class="input-width" prop="height" placeholder="必填" style="width:320px"></el-input>
            <!--            <el-select v-model="listQuery.status" placeholder="正在使用" clearable class="input-width">-->
            <!--              <el-option v-for="item in statusOptions"-->
            <!--                         :key="item.value"-->
            <!--                         :label="item.label"-->
            <!--                         :value="item.value">-->
            <!--              </el-option>-->
            <!--            </el-select>-->
          </el-form-item>
          <el-form-item label="膳食变更日期：">
            <el-input v-model="add_list.meal_change_date" class="input-width" prop="weight" placeholder="必填" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="体检报告路径：">
            <el-upload
              class="upload-demo"
              headers="post"
              data="this.add_list.id"
              drag
              :auto-upload="false"
              action=" http://59.110.212.116:32801/api/member-manage/check-in/upload/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击选择</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>

            </el-upload>
<!--            <el-input v-model="add_list.medical_port_path" class="input-width" prop="system" placeholder="" style="width:320px"></el-input>-->
          </el-form-item>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </el-form>
      </div>

    </el-card>


  </div>
</template>
<script>
  import {formatDate} from '@/utils/date';
  import {inList,deleteApply} from '@/api/returnApply';
  import axios from 'axios'
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
        listQuery:Object.assign({},defaultListQuery),
        statusOptions: Object.assign({},defaultStatusOptions),
        list:null,
        rules: {
          name: [
            {required: true, message: '请输入会员名称', trigger: 'blur'},
            {min: 2, max: 30, message: '长度在 1 到 15 个字', trigger: 'blur'}
          ],
          height: [{required: true, message: '请输入身高', trigger: 'blur'},
            {min: 2, max: 4, message: '长度在 1 到 3 个数字', trigger: 'blur'}],
          weight: [{required: true, message: '请输入体重', trigger: 'blur'},
            {min: 2, max: 4, message: '长度在 1 到 3 个数字', trigger: 'blur'}],
          gender: [{required: true,  message: '请选择', trigger: 'blur'},
            { message: '', trigger: 'blur'}],
          system: [
            {required: true, message: '请输入所属系统', trigger: 'blur'},
            {min: 2, max: 14, message: '长度在 1 到 7 个字', trigger: 'blur'}
          ],
          phone: [{required: true, message: '请输入体重', trigger: 'blur'},
            {min: 2, max: 22, message: '长度在 1 到 11 个数字', trigger: 'blur'}],
        },
        add_list:{
          "member_name": "",
          "care_level": '0',
          "check-in_time": 0,
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
          "business_change_date":0,
          "meal_change_reason":"",
          "meal_change_date":0,
          'medical_port_path':''
        }
        ,
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
      // this.getList();
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
      // postData(){
      //   var api='http://59.110.212.116:32801/api/member-manage/member-profile'
      //   axios.post(api, this.add_list).then(function (response) {
      //     console.log(response);
      //   }).catch(function (error) {
      //     console.log(error);
      //   });

      // },
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
      submitUpload(){
        this.$refs.upload.submit();
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
        this.addList.care_level=parseInt(this.addList.care_level)
        // if(this.addList.care_level==='0'){
        //   this.addList['care_level'] = 0
        // } else if(this.add_list.care_level==='1'){
        //   this.add_list['care_level'] = 1
        // }else if(this.add_list.care_level==='2'){
        //   this.add_list['care_level'] = 2
        // }else if(this.add_list.care_level==='3'){
        //   this.add_list['care_level'] = 3
        // }else if(this.add_list.care_level==='4'){
        //   this.add_list['care_level'] = 4
        // }else if(this.add_list.care_level==='5'){
        //   this.add_list['care_level'] = 5
        // }
        console.log(this.add_list)
        this.listLoading=true;
        inList(this.add_list).then(response => {
          this.listLoading = false;
          if(response.status == 200){
            this.$message({
              type: 'success',
              message: response.message
            });
          };
          console.log(response.data)
          this.$router.push({path:'/oms/add'})
       });
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


