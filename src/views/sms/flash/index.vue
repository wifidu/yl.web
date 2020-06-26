<template> 
  <div class="app-container" >
    <el-card class="filter-container" shadow="never">
      <div style="margin-bottom: 15px">
        <span>部门配置</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSaveList()"
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


      <el-card style="margin-top: 15px" shadow="never">
        <span style="font-size: small;width: 500px;padding: 10px;border-radius: 5px">部门信息</span>
        <el-form :inline="true" :model="listQuery" size="small" label-width="180px" style="margin-top: 30px">
          <el-form-item label="工位名称：">
            <el-input v-model="listQuery.department_name" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="工作描述：">
            <el-input v-model="listQuery.department_description" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>

        </el-form>
      </el-card>

    </el-card>

    <el-card class="operate-container" shadow="never" >
      <i class="el-icon-tickets"></i>
      <span>部门配置列表</span>
    </el-card>

    <div class="table-container" style="width: 100%">
      <el-table ref="orderTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="180" align="center">
          <template slot-scope="scope">{{scope.row.created_at | formatCreateTime}}</template>
        </el-table-column>

        <el-table-column label="工位名称" width="180" align="center">
          <template slot-scope="scope">{{scope.row.department_name}}</template>
        </el-table-column>
        <el-table-column label="工作描述" width="" align="center">
          <template slot-scope="scope">{{scope.row.department_description}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <!--进入详情页-->
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleViewDetail(scope.$index, scope.row)"
            >查看详情</el-button>

            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteDetail(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        style="margin: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="danger"
        size="small">
        批量删除
      </el-button>
    </div>



  </div>
</template>
<script>
  import {formatDate} from '@/utils/date';
  import {fetchList,deleteApply,appointList} from '@/api/returnApply';
  import {deleteOrder,getList} from '@/api/order'
  const defaultListQuery = {
    'member_name':'',
    'member_ID': '',
    'bed': '',
    'check-out_time': 0,
    'check-out_reason': '',
    'manager': '',
    'remark': '',
    'manage_time': '',
    'account_balance': 0.0,
    'expense_item': {}
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
        // listQuery:Object.assign({},defaultListQuery),
        statusOptions: Object.assign({},defaultStatusOptions),
        list:null,
        total:null,
        listLoading:false,
        searchList:{
          'member_name':''
        },
        multipleSelection:[],
        operateType:1,
        listQuery:{
          'department_name':'',
          'department_description': '',
        },
        query_string:{
          'page':1,
          'page_size':10
        },
        operateOptions: [
          {
            label: "批量删除",
            value: 1
          }
        ],
      }
    },
    created(){
      this.getList();
    },
    filters:{
      // formatTime(time) {
      //   if(time==null||time===''){
      //     return 'N/A';
      //   }
      //   let date = new Date(time);
      //   return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      // },
      // formatStatus(status){
      //   for(let i=0;i<defaultStatusOptions.length;i++){
      //     if(status===defaultStatusOptions[i].value){
      //       return defaultStatusOptions[i].label;
      //     }
      //   }
      // },
      // formatReturnAmount(row){
      //   return row.productRealPrice*row.productCount;
      // }
    },
    methods:{
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleResetSearch() {
        this.getList()
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.listLoading = true;
        console.log(this.searchList)
        if(this.searchList.member_name == ''){
          this.getList()
        } else {
          getList(this.searchList,"/personnel-management/department-manage/search").then(response => {
            this.listLoading = false;
            this.list = response.data;
            console.log(response)
          });
        }
      },
      handleSaveList() {
        this.listQuery['check-out_time']=parseInt(this.listQuery['check-out_time'])
        this.listQuery['account_balance']=parseFloat(this.listQuery['account_balance'])
        console.log(this.listQuery)
        appointList(this.listQuery,'/personnel-management/department-manage/').then(response=>{
          this.$message({
            type: 'success',
            message: '退住成功!',
            duration:1000
          });
          this.getList()
        })
      },
      handleViewDetail(index,row){
        this.$router.push({path:'/sms/flashDetail',query:{id:row.id}})
      },
      // handleBatchOperate(){
      //   if(this.multipleSelection==null||this.multipleSelection.length<1){
      //     this.$message({
      //       message: '请选择要操作的申请',
      //       type: 'warning',
      //       duration: 1000
      //     });
      //     return;
      //   }
      //   if(this.operateType===1){
      //     //批量删除
      //     this.$confirm('是否要进行删除操作?', '提示', {
      //       confirmButtonText: '确定',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }).then(() => {
      //       let params = new URLSearchParams();
      //       let ids=[];
      //       for(let i=0;i<this.multipleSelection.length;i++){
      //         ids.push(this.multipleSelection[i].id);
      //       }
      //       params.append("ids",ids);
      //       deleteOrder('/api/member-manage/check-out/',ids).then(response=>{
      //         this.getList();
      //         this.$message({
      //           type: 'success',
      //           message: '删除成功!'
      //         });
      //       });
      //     })
      //   }
      // },
      handleDeleteDetail(index,row){
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteOrder('/member-manage/check-out/',row.id).then(response=>{
            this.getList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        })
      },
      handleBatchOperate(){
        let ids=[];
        for(let i=0;i<this.multipleSelection.length;i++){
          ids.push(this.multipleSelection[i].id);
        }
        this.$confirm('是否要进行该删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for(let i=0;i<ids.length;i++){
            console.log('删除编号:'+ids[i])
            deleteOrder('/member-manage/check-out/',ids[i]).then(response=>{
              this.$message({
                message: '删除成功！',
                type: 'success',
                duration: 1000
              });
            });
            this.getList();
          }
        })
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
      getList(){
        this.listLoading=true;
        getList(this.query_string,'/personnel-management/department-manage/list').then(response => {
          this.listLoading = false;
          this.list = response.data.data;
          console.log(this.list)
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

