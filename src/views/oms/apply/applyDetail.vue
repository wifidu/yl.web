<template>
  <div class="detail-container">
    <span>预约信息</span>
  <el-card shadow="never" style="margin-top: 15px" class="form-border">
    <div style="margin-top: 20px">
      <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
      <span class="font-small">基本信息</span>
    </div>
    <div class="form-container-border">
      <el-row>
        <el-col :span="4" class="table-cell-title">老人姓名</el-col>
        <el-col :span="4" class="table-cell-title">性别</el-col>
        <el-col :span="4" class="table-cell-title">年龄</el-col>
        <el-col :span="4" class="table-cell-title">预约人</el-col>
        <el-col :span="4" class="table-cell-title">床位号</el-col>
        <el-col :span="4" class="table-cell-title">床位费用</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="table-cell">{{detailData.elderly_name}}</el-col>
        <el-col :span="4" class="table-cell">{{detailData.elderly_gender=='0'?'男':'女'}}</el-col>
        <el-col :span="4" class="table-cell">{{detailData.elderly_age}}</el-col>
        <el-col :span="4" class="table-cell">{{detailData.appoint_person}}</el-col>
        <el-col :span="4" class="table-cell" >{{detailData.bed_number}}</el-col>
        <el-col :span="4" class="table-cell" >{{detailData.bed_cost}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="table-cell-title">创建时间</el-col>
        <el-col :span="4" class="table-cell-title">身份证号</el-col>
        <el-col :span="4" class="table-cell-title">联系方式</el-col>
        <el-col :span="4" class="table-cell-title">编号</el-col>
        <el-col :span="4" class="table-cell-title">地址</el-col>
        <el-col :span="4" class="table-cell-title">备注</el-col>

      </el-row>
      <el-row>
        <el-col :span="4" class="table-cell">{{detailData.created_at}}</el-col>
        <el-col :span="4" class="table-cell">{{detailData.elderly_ID}}</el-col>
        <el-col :span="4" class="table-cell">{{detailData.contract_number}}</el-col>
        <el-col :span="4" class="table-cell">{{detailData.id}}</el-col>
        <el-col :span="4" class="table-cell">{{detailData.adress}}</el-col>
        <el-col :span="4" class="table-cell">{{detailData.remark}}</el-col>
      </el-row>
    </div>
  </el-card>
  </div>

</template>
<script>
  import {getApplyDetail,updateApplyStatus} from '@/api/returnApply';
  import {fetchList} from '@/api/companyAddress';
  import {formatDate} from '@/utils/date';

  const defaultUpdateStatusParam = {
    companyAddressId: null,
    handleMan: 'admin',
    handleNote: null,
    receiveMan: 'admin',
    receiveNote: null,
    returnAmount: 0,
    status: 0
  };
  const defaultOrderReturnApply = {
    id: null,
    orderId: null,
    companyAddressId: null,
    productId: null,
    orderSn: null,
    createTime: null,
    memberUsername: null,
    returnAmount: null,
    returnName: null,
    returnPhone: null,
    status: null,
    handleTime: null,
    productPic: null,
    productName: null,
    productBrand: null,
    productAttr: null,
    productCount: null,
    productPrice: null,
    productRealPrice: null,
    reason: null,
    description: null,
    proofPics: null,
    handleNote: null,
    handleMan: null,
    receiveMan: null,
    receiveTime: null,
    receiveNote: null
  };
  export default {
    name: 'returnApplyDetail',
    data() {
      return {
        id: null,
        detailData:null,
        orderReturnApply: Object.assign({},defaultOrderReturnApply),
        productList: null,
        proofPics: null,
        updateStatusParam: Object.assign({}, defaultUpdateStatusParam),
        companyAddressList: null
      }
    },
    created() {
      this.id = this.$route.query.id;
      this.getDetail();
    },
    computed: {
      totalAmount() {
        if (this.orderReturnApply != null) {
          return this.orderReturnApply.productRealPrice * this.orderReturnApply.productCount;
        } else {
          return 0;
        }
      },
      currentAddress() {
        console.log("currentAddress()");
        let id = this.updateStatusParam.companyAddressId;
        if(this.companyAddressList==null)return {};
        for (let i = 0; i < this.companyAddressList.length; i++) {
          let address = this.companyAddressList[i];
          if (address.id === id) {
            return address;
          }
        }
        return null;
      }
    },
    filters: {
      formatStatus(status) {
        if (status === 0) {
          return "待处理";
        } else if (status === 1) {
          return "退货中";
        } else if (status === 2) {
          return "已完成";
        } else {
          return "已拒绝";
        }
      },
      formatTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatRegion(address) {
        let str = address.province;
        if (address.city != null) {
          str += "  " + address.city;
        }
        str += "  " + address.region;
        return str;
      }
    },
    methods: {
      handleViewOrder(){
        this.$router.push({path:'/oms/orderDetail',query:{id:this.orderReturnApply.orderId}});
      },
      getDetail() {
        getApplyDetail(this.id).then(response => {
          console.log("getDetail")
          // console.log(response.data)
          this.detailData = response.data
          // console.log(this.detailData)
          // this.orderReturnApply = response.data;
          // this.productList = [];
          // this.productList.push(this.orderReturnApply);
          // if (this.orderReturnApply.proofPics != null) {
          //   this.proofPics = this.orderReturnApply.proofPics.split(",")
          // }
          // //退货中和完成
          // if(this.orderReturnApply.status===1||this.orderReturnApply.status===2){
          //   this.updateStatusParam.returnAmount=this.orderReturnApply.returnAmount;
          //   this.updateStatusParam.companyAddressId=this.orderReturnApply.companyAddressId;
          // }
          // this.getCompanyAddressList();
        });
      },
      getCompanyAddressList() {
        fetchList().then(response => {
          console.log("getCompanyAddressList()")
          this.companyAddressList = response.data;
          for (let i = 0; i < this.companyAddressList.length; i++) {
            if (this.companyAddressList[i].receiveStatus === 1&&this.orderReturnApply.status===0) {
              this.updateStatusParam.companyAddressId = this.companyAddressList[i].id;
            }
          }
        });
      },
      handleUpdateStatus(status){
        this.updateStatusParam.status=status;
        this.$confirm('是否要进行此操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateApplyStatus(this.id,this.updateStatusParam).then(response=>{
            this.$message({
              type: 'success',
              message: '操作成功!',
              duration:1000
            });
            this.$router.back();
          });
        });
      }
    }
  }
</script>
<style scoped>


  .standard-margin {
    margin-top: 15px;
  }
  .form-border {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
  }

  .form-container-border {
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
    margin-top: 15px;
  }

  .form-left-bg {
    background: #F2F6FC;
  }

  .detail-container {
    width: 80%;
    padding: 20px 20px 20px 20px;
    margin: 20px auto;
  }

  .operate-container {
    background: #F2F6FC;
    height: 80px;
    margin: -20px -20px 0;
    line-height: 80px;
  }

  .operate-button-container {
    float: right;
    margin-right: 20px
  }

  .table-layout {
    margin-top: 20px;
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
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


