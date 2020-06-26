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
          <el-form-item label="会员名称：" prop="member_name">
            <el-input v-model="add_list.member_name" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="gender">
            <el-radio v-model="add_list.gender" label="0" :disabled="edit">男</el-radio>
            <el-radio v-model="add_list.gender" label="1" :disabled="edit">女</el-radio>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="add_list" :rules="rules" size="small" label-width="180px">
          <el-form-item label="身份证号：">
            <el-input v-model="add_list.member_ID" class="input-width" style="width:320px" :disabled="edit"></el-input>
            <!--            <el-select v-model="listQuery.status" placeholder="正在使用" clearable class="input-width">-->
            <!--              <el-option v-for="item in statusOptions"-->
            <!--                         :key="item.value"-->
            <!--                         :label="item.label"-->
            <!--                         :value="item.value">-->
            <!--              </el-option>-->
            <!--            </el-select>-->
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
          <el-form-item label="民族：">
            <el-input v-model="add_list.nation" class="input-width" placeholder="" style="width:300px" :disabled="edit">族</el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="phone_number" >
            <el-input v-model="add_list.phone_number" class="input-width"  style="width:320px" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="签约医生：">
            <el-input v-model="add_list.sign_doctor" class="input-width"  style="width:320px" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="出生日期：">
<!--            <el-date-picker-->
<!--              v-model="add_list.birth_date"-->
<!--              type="date"-->
<!--              :disabled="edit"-->
<!--              style="width:320px"-->
<!--              placeholder="选择日期">-->
<!--            </el-date-picker>-->
            <el-input v-model="add_list.birth_date" class="input-width"  style="width:320px" :disabled="edit"></el-input>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="add_list" :rules="rules" size="small" label-width="180px">
          <el-form-item label="身高：" prop="height">
            <el-input v-model="add_list.height" class="input-width" :disabled="edit" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="体重：" prop="weight" >
            <el-input v-model="add_list.weight" class="input-width" :disabled="edit" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="所属系统：" prop="own_system">
            <el-input v-model="add_list.own_system" class="input-width" :disabled="edit" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="居住地址：">
            <el-input v-model="add_list.adress" class="input-width" :disabled="edit" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="社区：">
            <el-input v-model="add_list.community" class="input-width" :disabled="edit" style="width:320px"></el-input>
          </el-form-item>
          <!--          <el-form-item label="邮箱：">-->
          <!--            <el-input v-model="add_list.email" class="input-width" placeholder="" style="width:320px"></el-input>-->
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
          member_name: [{required: true, message: '请输入会员名称'}],
          height: [{required: true, message: '请输入身高'}],
          weight: [{required: true, message: '请输入体重'}],
          gender: [{required: true,  message: '请选择'}],
          own_system: [{required: true, message: '请输入所属系统'}],
          phone_number: [{required: true, message: '请输入电话号码'}],
        },
        add_list:{
          "member_name":"",
          "member_ID":"",
          "gender": '0',
          "nation":"",
          "height": "",
          "weight": "",
          "birth_date": "",
          "own_system": "",
          "sign_doctor":"",
          "community":"",
          "email":"",
          "phone_number": "",
          "adress":"",
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
        getList('/member-manage/member-profile/',this.id).then(response => {
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
        if (this.add_list.gender !== "" && this.add_list.height !== "" && this.add_list.weight !== "" && this.add_list.name !== "" && this.add_list.phone !== ""){
          update('/member-manage/member-profile/',this.add_list).then(response => {
            this.listLoading = false
            this.listLoading=true;
            this.add_list.gender = parseInt(this.add_list.gender)
            this.add_list.height = parseInt(this.add_list.height)
            this.add_list.weight = parseInt(this.add_list.weight)
            if(response.status === 200){
              this.$message({
                type: 'success',
                message: response.message
              });
            }
            this.$router.push({path:'/oms/files'})
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


