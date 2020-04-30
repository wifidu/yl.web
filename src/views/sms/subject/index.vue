<template> 
  <div class="app-container" >
    <el-card class="filter-container" shadow="never">
      <div style="margin-bottom: 15px">
        <span>团队管理</span>
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


      <el-card style="margin-top: 15px" shadow="never">
        <span style="font-size: small;width: 500px;padding: 10px;border-radius: 5px">团队信息</span>
        <el-form :inline="true" :model="listQuery" size="small" label-width="180px" style="margin-top: 30px">
          <el-form-item label="团队名称：">
            <el-input v-model="listQuery.team_name" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="服务类型：">
            <el-input v-model="listQuery.service_type" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>

          <el-form-item label="团队描述：">
            <el-input v-model="listQuery.team_description" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="团队成员：">
            <el-input v-model="listQuery.team_members" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="负责人：">
            <el-input v-model="listQuery.header" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
<!--          <el-form-item label="床位分配：">-->
<!--            <el-input v-model="listQuery.bed_assignment" class="input-width" placeholder="必填" style="width:300px"></el-input>-->
<!--          </el-form-item>-->
        </el-form>
      </el-card>
    </el-card>

    <el-card class="operate-container" shadow="never" >
      <i class="el-icon-tickets"></i>
      <span>团队信息列表</span>
    </el-card>
    <el-card class="filter-container" shadow="never" style="margin-top: 20px">

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
        <el-table-column label="团队名称" width="180" align="center">
          <template slot-scope="scope">{{scope.row.team_name}}</template>
        </el-table-column>
        <el-table-column label="服务类型" width="" align="center">
          <template slot-scope="scope">{{scope.row.service_type}}</template>
        </el-table-column>
        <el-table-column label="团队描述" width="" align="center">
          <template slot-scope="scope">{{scope.row.team_description}}</template>
        </el-table-column>
        <el-table-column label="团队成员" align="center">
          <template slot-scope="scope">{{scope.row.team_members}}</template>
        </el-table-column>
        <el-table-column label="负责人" align="center">
          <template slot-scope="scope">{{scope.row.header}}</template>
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
  import {deleteApply,appointList} from '@/api/returnApply';
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
        query_string:{
          'page':1,
          'page_size':10
        },
        multipleSelection:[],
        operateType:1,
        listQuery:{
          "team_name":"",
          "service_type":"",
          "team_description":"",
          "team_members":"",
          "header":"",
          "bed_assignment":{
            "小明":"1",
            "小张":"2",
            "小陈":"3"
          }
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
          getList(this.searchList,"/member-manage/check-out/search").then(response => {
            this.listLoading = false;
            this.list = response.data;
            console.log(response)
          });
        }
      },
      addList(){
        this.listQuery.bed_assignment = this.listQuery.bed_assignment.toString();
        console.log(this.listQuery)
        this.listLoading=true;
        appointList(this.listQuery,'/personnel-management/team-manage/').then(response => {
          this.listLoading = false;
          if(response.status == 200){
            this.$message({
              type: 'success',
              message: response.message
            });
          };
          console.log(response.data)
          this.getList()
        });
      },
      handleViewDetail(index,row){
        this.$router.push({path:'/sms/subjectDetail',query:{id:row.id}})
      },

      handleDeleteDetail(index,row){
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteOrder('/personnel-management/team-manage/',row.id).then(response=>{
            this.getList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
          this.getList()
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
            deleteOrder('/personnel-management/team-manage/',ids[i]).then(response=>{
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
        getList(this.query_string,'/personnel-management/team-manage/list').then(response => {
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




