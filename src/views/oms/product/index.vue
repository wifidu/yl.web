<template> 
  <div class="detail-container">
    <el-card shadow="never" style="margin-top: 15px">
<!--      <div class="operate-container">-->
<!--        <i class="el-icon-view " style="margin-left: 20px;color:#67C23A"></i>-->
<!--        <span class="color" style="margin-left: 20px;color:#67C23A">所属系统：{{order.own_system}}</span>-->
<!--        <div class="operate-button-container" v-show="order.status===0">-->
<!--          <el-button size="mini" @click="showUpdateReceiverDialog">修改会员信息</el-button>-->
<!--          <el-button size="mini">修改商品信息</el-button>-->
<!--          <el-button size="mini" @click="showUpdateMoneyDialog">修改费用信息</el-button>-->
<!--          <el-button size="mini" @click="showMessageDialog">发送站内信</el-button>-->
<!--          <el-button size="mini" @click="showCloseOrderDialog">关闭</el-button>-->
<!--          <el-button size="mini" @click="showMarkOrderDialog">备注</el-button>-->
<!--        </div>-->
<!--        <div class="operate-button-container" v-show="order.status===1">-->
<!--          <el-button size="mini" @click="showUpdateReceiverDialog">修改收货人信息</el-button>-->
<!--          <el-button size="mini" @click="showMessageDialog">发送站内信</el-button>-->
<!--          <el-button size="mini">取消</el-button>-->
<!--          <el-button size="mini" @click="showMarkOrderDialog">备注</el-button>-->
<!--        </div>-->
<!--        <div class="operate-button-container" v-show="order.status===2||order.status===3">-->
<!--          <el-button size="mini" @click="showLogisticsDialog">订单跟踪</el-button>-->
<!--          <el-button size="mini" @click="showMessageDialog">发送站内信</el-button>-->
<!--          <el-button size="mini" @click="showMarkOrderDialog">备注</el-button>-->
<!--        </div>-->
<!--        <div class="operate-button-container" v-show="order.status===4">-->
<!--          <el-button size="mini" @click="handleDeleteOrder">删除</el-button>-->
<!--          <el-button size="mini" @click="showMarkOrderDialog">备注</el-button>-->
<!--        </div>-->
<!--      </div>-->
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">详细信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" class="table-cell-title">会员编号</el-col>
          <el-col :span="4" class="table-cell-title">注册时间</el-col>
          <el-col :span="4" class="table-cell-title">照护等级</el-col>
          <el-col :span="4" class="table-cell-title">会员名称</el-col>
          <el-col :span="4" class="table-cell-title">性别</el-col>
          <el-col :span="4" class="table-cell-title">床位号</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{order.id}}</el-col>
          <el-col :span="4" class="table-cell">{{order.created_at}}</el-col>
          <el-col :span="4" class="table-cell">{{order.care_level== 0 ?'全自理':'轻度自理'}}</el-col>
          <el-col :span="4" class="table-cell">{{order.member_name}}</el-col>
          <el-col :span="4" class="table-cell" >{{order.gender == 0 ?'男':'女'}}</el-col>
          <el-col :span="4" class="table-cell" >{{order.bed_cost.number}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell-title">床位费</el-col>
          <el-col :span="4" class="table-cell-title">膳食费</el-col>
          <el-col :span="4" class="table-cell-title">膳食等级</el-col>
          <el-col :span="4" class="table-cell-title">一次性消费</el-col>
          <el-col :span="4" class="table-cell-title">业务变更</el-col>
          <el-col :span="4" class="table-cell-title">膳食变更</el-col>

        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{order.bed_cost.cost}}</el-col>
          <el-col :span="4" class="table-cell">{{order.meal_cost.cost}}</el-col>
          <el-col :span="4" class="table-cell">{{order.meal_cost.type}}</el-col>
          <el-col :span="4" class="table-cell">{{order.business_change_date}}</el-col>
          <el-col :span="4" class="table-cell">{{order.business_change_reason}}</el-col>
          <el-col :span="4" class="table-cell">{{order.meal_change_reason}}</el-col>
          <!--          <el-col :span="4" class="table-cell">-->
          <!--            <el-popover-->
          <!--              placement="top-start"-->
          <!--              title="活动信息"-->
          <!--              width="200"-->
          <!--              trigger="hover"-->
          <!--              :content="order.promotionInfo">-->
          <!--              <span slot="reference">{{order.promotionInfo | formatLongText}}</span>-->
          <!--            </el-popover>-->
          <!--          </el-col>-->
        </el-row>
      </div>

    </el-card>

  </div>
</template>
<script>
  import {getDetail,updateReceiverInfo,updateMoneyInfo,closeOrder,updateOrderNote,deleteOrder} from '@/api/order';
  import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';
  import {formatDate} from '@/utils/date';
  import VDistpicker from 'v-distpicker';
  const defaultReceiverInfo = {
    orderId:null,
    receiverName:null,
    receiverPhone:null,
    receiverPostCode:null,
    receiverDetailAddress:null,
    receiverProvince:null,
    receiverCity:null,
    receiverRegion:null,
    status:null
  };
  export default {
    name: 'orderDetail',
    components: { VDistpicker, LogisticsDialog},
    data() {
      return {
        id: null,
        order: {},
        receiverDialogVisible:false,
        receiverInfo:Object.assign({},defaultReceiverInfo),
        moneyDialogVisible:false,
        moneyInfo:{orderId:null, freightAmount:0, discountAmount:0,status:null},
        messageDialogVisible:false,
        message: {title:null, content:null},
        closeDialogVisible:false,
        closeInfo:{note:null,id:null},
        markOrderDialogVisible:false,
        markInfo:{note:null},
        logisticsDialogVisible:false
      }
    },
    created() {
      this.id = this.list = this.$route.query.id;
      console.log('orderDetail,id='+this.id)
      getDetail(this.id).then(response => {
        this.order = response.data;
        console.log(response.data)
      });
    },
    filters: {
      formatNull(value) {
        if(value===undefined||value===null||value===''){
          return '暂无';
        }else{
          return value;
        }
      },
      formatLongText(value) {
        if(value===undefined||value===null||value===''){
          return '暂无';
        }else if(value.length>8){
          return value.substr(0, 8) + '...';
        }else{
          return value;
        }
      },
      formatPayType(value) {
        if (value === 1) {
          return '支付宝';
        } else if (value === 2) {
          return '微信';
        } else {
          return '未支付';
        }
      },
      formatSourceType(value) {
        if (value === 1) {
          return 'APP订单';
        } else {
          return 'PC订单';
        }
      },
      formatOrderType(value) {
        if (value === 1) {
          return '秒杀订单';
        } else {
          return '正常订单';
        }
      },
      formatAddress(order) {
        let str = order.receiverProvince;
        if (order.receiverCity != null) {
          str += "  " + order.receiverCity;
        }
        str += "  " + order.receiverRegion;
        str += "  " + order.receiverDetailAddress;
        return str;
      },
      formatStatus(value) {
        if (value === 1) {
          return '待发货';
        } else if (value === 2) {
          return '已发货';
        } else if (value === 3) {
          return '已完成';
        } else if (value === 4) {
          return '已关闭';
        } else if (value === 5) {
          return '无效订单';
        } else {
          return '待付款';
        }
      },
      formatPayStatus(value) {
        if (value === 0) {
          return '未支付';
        } else if(value===4){
          return '已退款';
        }else{
          return '已支付';
        }
      },
      formatDeliverStatus(value) {
        if (value === 0||value === 1) {
          return '未发货';
        } else {
          return '已发货';
        }
      },
      formatProductAttr(value){
        if(value==null){
          return '';
        }else{
          let attr = JSON.parse(value);
          let result='';
          for(let i=0;i<attr.length;i++){
            result+=attr[i].key;
            result+=":";
            result+=attr[i].value;
            result+=";";
          }
          return result;
        }
      }
    },
    methods: {
      onSelectRegion(data){
        this.receiverInfo.receiverProvince=data.province.value;
        this.receiverInfo.receiverCity=data.city.value;
        this.receiverInfo.receiverRegion=data.area.value;
      },
      formatTime(time) {
        if (time == null || time === '') {
          return '';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatStepStatus(value) {
        if (value === 1) {
          //待发货
          return 2;
        } else if (value === 2) {
          //已发货
          return 3;
        } else if (value === 3) {
          //已完成
          return 4;
        }else {
          //待付款、已关闭、无限订单
          return 1;
        }
      },
      showUpdateReceiverDialog(){
        this.receiverDialogVisible=true;
        this.receiverInfo={
          orderId:this.order.id,
          receiverName:this.order.receiverName,
          receiverPhone:this.order.receiverPhone,
          receiverPostCode:this.order.receiverPostCode,
          receiverDetailAddress:this.order.receiverDetailAddress,
          receiverProvince:this.order.receiverProvince,
          receiverCity:this.order.receiverCity,
          receiverRegion:this.order.receiverRegion,
          status:this.order.status
        }
      },
      handleUpdateReceiverInfo(){
        this.$confirm('是否要修改收货信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateReceiverInfo(this.receiverInfo).then(response=>{
            this.receiverDialogVisible=false;
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            getOrderDetail(this.id).then(response => {
              this.order = response.data;
            });
          });
        });
      },
      showUpdateMoneyDialog(){
        this.moneyDialogVisible=true;
        this.moneyInfo.orderId=this.order.id;
        this.moneyInfo.freightAmount=this.order.freightAmount;
        this.moneyInfo.discountAmount=this.order.discountAmount;
        this.moneyInfo.status=this.order.status;
      },
      handleUpdateMoneyInfo(){
        this.$confirm('是否要修改费用信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateMoneyInfo(this.moneyInfo).then(response=>{
            this.moneyDialogVisible=false;
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            getOrderDetail(this.id).then(response => {
              this.order = response.data;
            });
          });
        });
      },
      showMessageDialog(){
        this.messageDialogVisible=true;
        this.message.title=null;
        this.message.content=null;
      },
      handleSendMessage(){
        this.$confirm('是否要发送站内信?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.messageDialogVisible=false;
          this.$message({
            type: 'success',
            message: '发送成功!'
          });
        });
      },
      showCloseOrderDialog(){
        this.closeDialogVisible=true;
        this.closeInfo.note=null;
        this.closeInfo.id=this.id;
      },
      handleCloseOrder(){
        this.$confirm('是否要关闭?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          params.append("ids",[this.closeInfo.id]);
          params.append("note",this.closeInfo.note);
          closeOrder(params).then(response=>{
            this.closeDialogVisible=false;
            this.$message({
              type: 'success',
              message: '订单关闭成功!'
            });
            getOrderDetail(this.id).then(response => {
              this.order = response.data;
            });
          });
        });
      },
      showMarkOrderDialog(){
        this.markOrderDialogVisible=true;
        this.markInfo.id=this.id;
        this.closeOrder.note=null;
      },
      handleMarkOrder(){
        this.$confirm('是否要备注订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          params.append("id",this.markInfo.id);
          params.append("note",this.markInfo.note);
          params.append("status",this.order.status);
          updateOrderNote(params).then(response=>{
            this.markOrderDialogVisible=false;
            this.$message({
              type: 'success',
              message: '订单备注成功!'
            });
            getOrderDetail(this.id).then(response => {
              this.order = response.data;
            });
          });
        });
      },
      handleDeleteOrder(){
        this.$confirm('是否要进行该删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          params.append("ids",[this.id]);
          deleteOrder(params).then(response=>{
            this.$message({
              message: '删除成功！',
              type: 'success',
              duration: 1000
            });
            this.$router.back();
          });
        })
      },
      showLogisticsDialog(){
        this.logisticsDialogVisible=true;
      }
    }
  }
</script>
<style scoped>
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


