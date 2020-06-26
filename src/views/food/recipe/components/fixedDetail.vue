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
          <el-form-item label="周次：" prop="weekly">
            <el-input v-model="add_list.weekly" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="套餐名称：" prop="package_name">
            <el-input v-model="add_list.package_name" :disabled="edit" class="input-width" style="width:320px"></el-input>
          </el-form-item>
<!--          <el-form-item label="预定人数：" prop="reserve_number">-->
<!--            <el-input v-model="add_list.reserve_number" class="input-width" style="width:320px" :disabled="edit"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="套餐描述：" prop="package_describe" >-->
<!--            <el-input v-model="add_list.package_describe" class="input-width"  style="width:320px" :disabled="edit"></el-input>-->
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
          weekly: [{required: true, message: '请输入套餐名称'}],
          package_name: [{required: true, message: '请输入套餐价格'}],
          // reserve_number: [{required: true, message: '请输入预定人数'}],
          // package_describe: [{required: true,  message: '请输入预定人数'}],
        },
        add_list:{
          "id": null,
          "weekly": "",
          "package_name": "",
          "package_detail": "",
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
      this.add_list.id = this.id
      if(this.id){
        getList('/diet-manage/recipes-manage/',this.id).then(response => {
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
        this.$router.push({path:'/food/recipe'})
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
        console.log(this.add_list)
        if (this.add_list.food_name !== "" && this.add_list.food_price !== "" && this.add_list.food_type !== null && this.add_list.subordinate_species !== ""){
          update('/diet-manage/recipes-manage/',this.add_list).then(response => {
            this.listLoading = false
            this.listLoading=true;
            console.log(this.add_list.food_type)
            if(response.status === 200){
              this.$message({
                type: 'success',
                message: response.message
              });
            }
            this.$router.push({path:'/food/recipe'})
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


