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
          v-if=" edit && this.id"
          size="small">
          返回
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="add_list" :rules="rules" size="small" label-width="180px">
          <el-form-item label="会员名称：" prop="member_name">
            <el-input v-model="add_list.member_name" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="床位名称：" prop="bed_name">
            <el-input v-model="add_list.bed_name" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="就餐时间：" prop="eat_time">
            <el-input v-model="add_list.eat_time" class="input-width" style="width:320px" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="餐次：" prop="meal_times" >
            <el-input v-model="add_list.meal_times" class="input-width"  style="width:320px" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="菜品名称：" prop="dishes_name">
            <el-input v-model="add_list.dishes_name" class="input-width" style="width:320px" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="就餐方式：" prop="dining_style" >
            <el-radio v-model="add_list.dining_style" label=0 :disabled="edit" >喂食</el-radio>
            <el-radio v-model="add_list.dining_style" label=1 :disabled="edit" >自行</el-radio>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="add_list" :rules="rules" size="small" label-width="180px">
          <el-form-item label="状态：" prop="type" >
            <el-radio v-model="add_list.type" label=0 :disabled="edit" >未出餐</el-radio>
            <el-radio v-model="add_list.type" label=1 :disabled="edit" >已出餐</el-radio>
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
          bed_name: [{required: true, message: '请输入床位名称'}],
          eat_time: [{required: true, message: '请输入就餐时间'}],
          meal_times: [{required: true,  message: '请输入餐次'}],
          dishes_name: [{required: true, message: '请输入菜品名称'}],
          dining_style: [{required: true,  message: '请选择就餐方式'}],
          type: [{required: true,  message: '请选择状态'}],
        },
        add_list:{
          "id": null,
          "member_name": "",
          "bed_name": "",
          "eat_time": null,
          "meal_times": "",
          "dishes_name": "",
          "dining_style": 0,
          "type": 0,
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
        this.add_list.id = this.id
        getList('/diet-manage/delivery-manage/',this.id).then(response => {
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
      handleBack(){
        this.$router.push({path:'/food/distribution'})
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
        this.add_list.dining_style = parseInt(this.add_list.dining_style)
        this.add_list.type = parseInt(this.add_list.type)
        console.log(this.add_list)
        if (this.add_list.member_name !== "" && this.add_list.bed_name !== "" && this.add_list.eat_time !== null && this.add_list.meal_times !== "" && this.add_list.dishes_name !== "" && this.add_list.dining_style !== null && this.add_list.type !== null){
          update('/diet-manage/delivery-manage/',this.add_list).then(response => {
            this.listLoading = false
            this.listLoading=true;
            if(response.status === 200){
              this.$message({
                type: 'success',
                message: response.message
              });
            }
            this.$router.push({path:'/food/distribution'})
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


