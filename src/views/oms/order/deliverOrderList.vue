<template> 
  <div class="detail-container">
    <el-card shadow="never" style="margin-top: 15px">
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">详细信息</span>
      </div>
      <div class="table-layout" >
        <el-row class="table_cell" >
          <el-col :span="4" class="table-cell-title">会员编号</el-col>
          <el-col :span="4" class="table-cell-title">会员名称</el-col>
          <el-col :span="4" class="table-cell-title">身份证号</el-col>
          <el-col :span="4" class="table-cell-title">床位号</el-col>
          <el-col :span="4" class="table-cell-title">退住时间</el-col>
          <el-col :span="4" class="table-cell-title">退住原因</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{listDetail.id}}</el-col>
          <el-col :span="4" class="table-cell">{{listDetail.member_name}}</el-col>
          <el-col :span="4" class="table-cell">{{listDetail.member_ID}}</el-col>
          <el-col :span="4" class="table-cell">{{listDetail.bed}}</el-col>
          <el-col :span="4" class="table-cell">{{listDetail['check-out_time']}}</el-col>
          <el-col :span="4" class="table-cell" >{{listDetail['check-out_reason']}}</el-col>
        </el-row>
        <el-row>

          <el-col :span="4" class="table-cell-title">经办人</el-col>
          <el-col :span="4" class="table-cell-title">经办时间</el-col>
          <el-col :span="4" class="table-cell-title">备注</el-col>
          <el-col :span="4" class="table-cell-title">账户余额</el-col>
        </el-row>
        <el-row>

          <el-col :span="4" class="table-cell" >{{listDetail.manager}}</el-col>
          <el-col :span="4" class="table-cell">{{listDetail.manage_time}}</el-col>
          <el-col :span="4" class="table-cell">{{listDetail.remark}}</el-col>
          <el-col :span="4" class="table-cell">{{listDetail.account_balance}}</el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
  import {deliveryOrder,returnDetail} from '@/api/order'
  import {getList} from "../../../api/order";
  const defaultLogisticsCompanies=["顺丰快递","圆通快递","中通快递","韵达快递"];
  export default {
    name: 'deliverOrderList',
    data() {
      return {
        list:[],
        listDetail:null,
        id:null,
        companyOptions:defaultLogisticsCompanies
      }
    },
    created(){
      // this.list= this.$route.query.list;
      this.id = this.$route.query.id;
      console.log(this.id)
      this.getList()
    },
    methods:{
      cancel(){
        this.$router.back();
      },
      getList(){
        returnDetail(this.id,'/member-manage/check-out/').then(response=>{
          this.listDetail=response.data
          console.log(response.data)
        })
      },
      confirm(){
        this.$confirm('是否要进行发货操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deliveryOrder(this.list).then(response=>{
            this.$router.back();
            this.$message({
              type: 'success',
              message: '发货成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发货'
          });
        });
      }
    }
  }
</script>
<style>
  .detail-container {
    width: 80%;
    padding: 20px 20px 20px 20px;
    margin: 20px auto;
  }

  .table-layout {
    margin-top: 20px;
    border-left: 1px solid #DCDFE6;
    /*border-top: 1px solid #DCDFE6;*/
  }

  .table_cell{
    border-top: 1px solid #DCDFE6
  }

  .table-cell {
    height: 60px;
    line-height: 40px;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    text-align: center;
    overflow: hidden;
  }

  .table-cell-title {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    background: #F2F6FC;
    text-align: center;
    font-size: 14px;
    color: #303133;
  }
</style>


