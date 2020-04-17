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
          <el-col :span="4" class="table-cell-title">家庭住址</el-col>
          <el-col :span="4" class="table-cell-title">联系方式</el-col>
          <el-col :span="4" class="table-cell-title">入住主诊断</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{listDetail.id}}</el-col>
          <el-col :span="4" class="table-cell">{{listDetail.member_name}}</el-col>
          <el-col :span="4" class="table-cell">{{listDetail.member_ID}}</el-col>
          <el-col :span="4" class="table-cell">{{listDetail.family_address}}</el-col>
          <el-col :span="4" class="table-cell">{{listDetail.contact_number}}</el-col>
          <el-col :span="4" class="table-cell" >{{listDetail['check-in_main_diagnosis']}}</el-col>
        </el-row>
        <el-row>

          <el-col :span="4" class="table-cell-title">死亡时间</el-col>
          <el-col :span="4" class="table-cell-title">开具证明时间</el-col>
          <el-col :span="4" class="table-cell-title">致死疾病</el-col>
          <el-col :span="4" class="table-cell-title">开具证明医生</el-col>
        </el-row>
        <el-row>

          <el-col :span="4" class="table-cell" >{{listDetail.death_time}}</el-col>
          <el-col :span="4" class="table-cell">{{listDetail.certificate_time}}</el-col>
          <el-col :span="4" class="table-cell">{{listDetail.death_disease}}</el-col>
          <el-col :span="4" class="table-cell">{{listDetail.certificate_doctor}}</el-col>
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
        returnDetail(this.id,'/member-manage/death-registration/').then(response=>{
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


