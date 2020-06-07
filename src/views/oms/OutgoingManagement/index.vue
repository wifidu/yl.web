<template> 
  <el-card class="filter-container" shadow="never" style="margin-top: 10px">
    <div >

      <el-card class="filter-container" shadow="never" style="margin-top: 20px">
        <div>
          <i class="el-icon-search"></i>
          <span>搜索</span>
          <el-button
            style="float:right"
            type="primary"
            @click="handleSearchList()"
            size="small">
            查询搜索
          </el-button>
          <el-button
            style="float:right;margin-right: 15px"
            @click="handleResetSearch()"
            size="small">
            重置列表
          </el-button>
        </div>
        <div style="margin-top: 15px">
          <el-form :inline="true" :model="searchList" size="small" label-width="140px">
            <el-form-item label="会员名称：">
              <el-input v-model="searchList.member_name" class="input-width" placeholder="会员名称"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets"></i>
        <span>外出登记档案</span>
        <el-button
          size="mini"
          type="primary"
          @click="handleAdd"
          class="btn-add"
          style="margin:10px">新增
        </el-button>
      </el-card>
      <div class="table-container">
        <div></div>
        <el-table ref="orderTable"
                  :data="list"
                  style="width: 100%;"
                  @selection-change="handleSelectionChange"
                  v-loading="listLoading" border>
          <el-table-column type="selection" width="60" align="center"></el-table-column>
          <el-table-column label="会员编号" width="120" align="center">
            <template slot-scope="scope">{{scope.row.id}}</template>
          </el-table-column>
          <el-table-column label="会员姓名" width="180" align="center">
            <template slot-scope="scope">{{scope.row.member_name}}</template>
          </el-table-column>
          <el-table-column label="床位号" width="180" align="center">
            <template slot-scope="scope">{{scope.row.bed_number}}</template>
          </el-table-column>
          <el-table-column label="电话号码" width="180" align="center">
            <template slot-scope="scope">{{scope.row.accompany_number}}</template>
          </el-table-column>
          <el-table-column label="预计外出时间"  align="center">
            <template slot-scope="scope">{{scope.row.leave_days}}天</template>
          </el-table-column>
<!--          <el-table-column label="实际外出时间"  align="center">-->
<!--            <template slot-scope="scope">{{scope.row.actual_leave_days}}天</template>-->
<!--          </el-table-column>-->
<!--          <el-table-column label="总计"  align="center">-->
<!--            <template slot-scope="scope">{{scope.row.total}}</template>-->
<!--          </el-table-column>-->
          <el-table-column label="操作"  align="center">
            <!--进入详情页-->
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleChangeOrder(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                @click="handleViewOrder(scope.$index, scope.row)"
              >详情</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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


  </el-card>
</template>
<script>
  import {formatDate} from '@/utils/date';
  import {fetchList,deleteReason,updateStatus,addReason,getReasonDetail,updateReason} from '@/api/returnReason';
  import {deleteOrder,getList} from '@/api/order'
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10
  };
  const defaultReturnReason = {
    name:null,
    sort:0,
    status:1,
    createTime:null
  };
  export default {
    name: 'returnReasonList',
    data() {
      return {
        add_list:{
          "member_name": "",
          "bed_number": "",
          "out_time": 0,
          "plan_to_return": 0,
          "leave_days": 0,
          "accompany_number": "",
          "accompany_name": "",
          "out_reason": "",
          "register_person": "",
          "check-in_time": 0,
          "return_time": 0,
          "actual_leave_days": 0,
          "total": 0.0,
          "expense_item": {
            "type": "吃饭",
            "cost": "12323"
          }
        },
        searchList:{
          'member_name':''
        },
        list: null,
        total: null,
        multipleSelection: [],
        listLoading:true,
        listQuery:Object.assign({}, defaultListQuery),
        operateType:null,
        operateOptions: [
          {
            label: "删除",
            value: 1
          }
        ],
        dialogVisible:false,
        returnReason:Object.assign({},defaultReturnReason),
        operateReasonId:null
      }
    },
    created(){
      this.getList();
    },
    filters:{
      formatCreateTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      // handleAdd() {
      //   this.add_list.total=parseFloat(this.add_list.total)
      //   this.add_list.out_time=parseInt(this.add_list.out_time)
      //   this.add_list.plan_to_return=parseInt(this.add_list.plan_to_return)
      //   this.add_list.leave_days=parseInt(this.add_list.leave_days)
      //   this.add_list['check-in_time']=parseInt(this.add_list['check-in_time'])
      //   this.add_list.return_time=parseInt(this.add_list.return_time)
      //   this.add_list.actual_leave_days=parseInt(this.add_list.actual_leave_days)
      //   console.log(this.add_list)
      //   addReason(this.add_list,'/member-manage/out-manage/').then(response=>{
      //     this.$message({
      //       message: '登记成功！',
      //       type: 'success',
      //       duration:1000
      //     });
      //   })
      //   this.getList()
      // },
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
          getList(this.searchList,"/member-manage/out-manage/search").then(response => {
            this.listLoading = false;
            this.list = response.data;
            console.log(response)
          });
        }
      },
      handleConfirm(){
        if(this.operateReasonId==null){
          //添加操作
          addReason(this.returnReason).then(response=>{
            this.dialogVisible=false;
            this.operateReasonId=null;
            this.$message({
              message: '添加成功！',
              type: 'success',
              duration:1000
            });
            this.getList();
          });
        }else{
          //编辑操作
          updateReason(this.operateReasonId,this.returnReason).then(response=>{
            this.dialogVisible=false;
            this.operateReasonId=null;
            this.$message({
              message: '修改成功！',
              type: 'success',
              duration:1000
            });
            this.getList();
          });
        }
      },
      handleUpdate(index, row){
        this.dialogVisible=true;
        this.operateReasonId=row.id;
        getReasonDetail(row.id).then(response=>{
          this.returnReason=response.data;
        });
      },
      // handleDelete(index, row){
      //   let ids=[];
      //   ids.push(row.id);
      //   this.deleteReason(ids);
      // },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleStatusChange(index,row){
        let ids=[];
        ids.push(row.id);
        let param = new URLSearchParams();
        param.append("status",row.status);
        param.append("ids",ids);
        updateStatus(param).then(response=>{
          this.$message({
            message: '状态修改成功',
            type: 'success'
          });
        });
      },
      handleDelete(index,row){
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteOrder('/member-manage/out-manage/',row.id).then(response=>{
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
            deleteOrder('/member-manage/out-manage/',ids[i]).then(response=>{
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
      handleAdd(){
        this.$router.push({path:'/oms/outgoing_newDetail',query:{id:0,edit:false}})
      },
      handleChangeOrder(index, row){
        this.$router.push({path:'/oms/outgoing_editDetail',query:{id:row.id,edit:false}})
      },
      handleViewOrder(index, row) {
        this.$router.push({path: '/oms/outgoing_viewDetail', query: {id: row.id, edit: true}})
      },
      getList(){
        this.listLoading = true;
        getList(this.listQuery,"/member-manage/out-manage/list").then(response => {
          this.listLoading = false;
          this.list = response.data.data;
          console.log(response)
        });
      },
      deleteReason(ids){
        this.$confirm('是否要进行该删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          params.append("ids",ids);
          deleteReason(params).then(response=>{
            this.$message({
              message: '删除成功！',
              type: 'success',
              duration: 1000
            });
            this.listQuery.pageNum=1;
            this.getList();
          });
        })
      },
    }
  }
</script>
<style scoped>
  .input-width {
    width: 80%;
  }
</style>


