<template> 

  <el-card class="filter-container" shadow="never" style="margin-top: 10px">
    <div >
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets"></i>
        <span>外出返回</span>
        <el-button
          size="mini"
          @click="handleAdd"
          class="btn-add"
          style="margin:10px">保存
        </el-button>
        <el-button
          size="mini"
          @click="handleAdd"
          class="btn-add"
          style="margin:10px">返回
        </el-button>
        <el-form :inline="true" :model="listQuery" size="small" label-width="180px" style="margin-top: 25px">
          <el-form-item label="会员姓名：">
            <el-input v-model="listQuery.id" class="input-width" placeholder="姓名" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="床位：">
            <el-input v-model="listQuery.id" class="input-width" placeholder="姓名" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="外出时间：">
            <el-input v-model="listQuery.id" class="input-width" placeholder="姓名" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="计划返回时间：">
            <el-input v-model="listQuery.id" class="input-width" placeholder="姓名" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="请假天数：">
            <el-input v-model="listQuery.id" class="input-width" placeholder="姓名" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="陪同人姓名：">
            <el-input v-model="listQuery.id" class="input-width" placeholder="姓名" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="陪同人电话：">
            <el-input v-model="listQuery.id" class="input-width" placeholder="姓名" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="外出原因：">
            <el-input v-model="listQuery.id" class="input-width" placeholder="姓名" style="width:794px"></el-input>
          </el-form-item>
          <el-form-item label="登记人：">
            <el-input v-model="listQuery.id" class="input-width" placeholder="姓名" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="登记时间：">
            <el-input v-model="listQuery.id" class="input-width" placeholder="姓名" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="返回时间：">
            <el-input v-model="listQuery.id" class="input-width" placeholder="姓名" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="实际请假天数：">
            <el-input v-model="listQuery.id" class="input-width" placeholder="姓名" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="总计：">
            <el-input v-model="listQuery.id" class="input-width" placeholder="姓名" style="width:300px"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets"></i>
        <span>费用项目</span>
      <div class="app-container">
        <div class="table-container">
          <el-table ref="returnReasonTable"
                    :data="list"
                    style="width:800px"
                    @selection-change="handleSelectionChange"
                    v-loading="listLoading" border>
            <el-table-column label="项目类型" width="200" align="center">
              <template slot-scope="scope">{{scope.row.id}}</template>
            </el-table-column>
            <el-table-column label="项目名称"  align="center">
              <template slot-scope="scope">{{scope.row.name}}</template>
            </el-table-column>
            <el-table-column label="价格" width="200" align="center">
              <template slot-scope="scope">{{scope.row.sort }}</template>
            </el-table-column>
            <el-table-column label="应退金额" width="200" align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
      </el-card>
    </div>


  </el-card>
</template>
<script>
  import {formatDate} from '@/utils/date';
  import {fetchList,deleteReason,updateStatus,addReason,getReasonDetail,updateReason} from '@/api/returnReason';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5
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
      handleAdd() {
        this.dialogVisible=true;
        this.operateReasonId=null;
        this.returnReason=Object.assign({},defaultReturnReason);
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
      handleDelete(index, row){
        let ids=[];
        ids.push(row.id);
        this.deleteReason(ids);
      },
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
      handleBatchOperate(){
        if(this.multipleSelection==null||this.multipleSelection.length<1){
          this.$message({
            message: '请选择要操作的条目',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        if(this.operateType===1){
          let ids=[];
          for(let i=0;i<this.multipleSelection.length;i++){
            ids.push(this.multipleSelection[i].id);
          }
          this.deleteReason(ids);
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
      getList(){
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
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


