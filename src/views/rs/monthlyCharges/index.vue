<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
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
          <el-form-item label="输入搜索：">
            <el-input v-model="searchList.phone_number" class="input-width" placeholder="电话号码"></el-input>
          </el-form-item>
<!--          <el-form-item label="会员名称：">-->
<!--            <el-input v-model="searchList.member_name" class="input-width" placeholder="会员名称"></el-input>-->
<!--          </el-form-item>-->
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>岗位列表</span>
      <el-button
        style="float:right"
        type="primary"
        @click="handleAdd()"
        size="small">
        新增
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

        <el-table-column label="岗位名称" align="center">
          <template slot-scope="scope">{{scope.row.position_name}}</template>
        </el-table-column>
        <el-table-column label="岗位类型" width="180" align="center">
          <template slot-scope="scope">{{scope.row.position_type === 0 ?"行政岗": scope.row.position_type === 1 ?"财务岗":scope.row.position_type === 0 ?"护理岗":"管理岗"}}</template>
        </el-table-column>
        <el-table-column label="岗位薪水" width="180" align="center">
          <template slot-scope="scope">{{scope.row.position_salary+'元/每单'}}</template>
        </el-table-column>
        <el-table-column label="职级名称" width="180" align="center">
          <template slot-scope="scope">{{scope.row.rank_name}}</template>
        </el-table-column>

        <el-table-column label="操作" width="280" align="center">
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
          <!--删除按钮-->
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteOrder(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="danger"
        size="small">
        批量删除
      </el-button>
    </div>
<!--    <div class="pagination-container">-->
<!--      <el-pagination-->
<!--        background-->
<!--        @size-change="handleSizeChange"-->
<!--        @current-change="handleCurrentChange"-->
<!--        layout="total, sizes,prev, pager, next,jumper"-->
<!--        :current-page.sync="listQuery.pageNum"-->
<!--        :page-size="listQuery.pageSize"-->
<!--        :page-sizes="[5,10,15]"-->
<!--        :total="total">-->
<!--      </el-pagination>-->
<!--    </div>-->
<!--    <el-dialog-->
<!--      title="关闭"-->
<!--      :visible.sync="closeOrder.dialogVisible" width="30%">-->
<!--      <span style="vertical-align: top">操作备注：</span>-->
<!--      <el-input-->
<!--        style="width: 80%"-->
<!--        type="textarea"-->
<!--        :rows="5"-->
<!--        placeholder="请输入内容"-->
<!--        v-model="closeOrder.content">-->
<!--      </el-input>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="closeOrder.dialogVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="handleCloseOrderConfirm">确 定</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->
<!--    <logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>-->
  </div>
</template>

<script>
  import {fetchList,closeOrder,deleteOrder,getList,deleteMulOrder} from '@/api/order'
  import {formatDate} from '@/utils/date';
  import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';
  import axios from 'axios';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    orderSn: null,
    receiverKeyword: null,
    status: null,
    orderType: null,
    sourceType: null,
    createTime: null,
  };
  export default {
    name: "orderList",
    components:{LogisticsDialog},
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        searchList:{
          'phone_number':'',
          'member_name':''
        },
        search_phone:{'phone_number':'',},
        search_name:{'member_name':''},
        dataList:{page: 1,size: 10},
        listLoading: true,
        list: null,
        total: null,
        operateType: null,
        multipleSelection: [],
        closeOrder:{
          dialogVisible:false,
          content:null,
          orderIds:[]
        },
        //各种标签和对应的值
        statusOptions: [
          {
            label: '待付款',
            value: 0
          },
          {
            label: '待发货',
            value: 1
          },
          {
            label: '已发货',
            value: 2
          },
          {
            label: '已完成',
            value: 3
          },
          {
            label: '已关闭',
            value: 4
          }
        ],
        orderTypeOptions: [
          {
            label: '正常订单',
            value: 0
          },
          {
            label: '秒杀订单',
            value: 1
          }
        ],
        sourceTypeOptions: [
          {
            label: 'PC',
            value: 0
          },
          {
            label: 'APP',
            value: 1
          }
        ],
        operateOptions: [
          {
            label: "发送信息",
            value: 1
          },
          {
            label: "取消会员",
            value: 2
          },
          {
            label: "删除",
            value: 3
          }
        ],
        logisticsDialogVisible:false
      }
    },
    created() {
      this.getList();
    },
    filters: {
      formatCreateTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
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
    },
    methods: {
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
        this.getList()
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.listLoading = true;
        console.log('handleSearchList')
        if(this.searchList.member_name === '' && this.searchList.phone_number === ''){
          this.getList()
        } else if(this.searchList.phone_number === ''){
          this.search_name.member_name=this.searchList.member_name
          getList(this.search_name,"/personnel-management/position-manage/search/").then(response => {
            this.listLoading = false;
            this.list = response.data;
            console.log(response)
          });
        }else {
          this.search_phone.phone_number=this.searchList.phone_number
          console.log('通过电话号码搜索:'+this.searchList.phone_number)
          console.log('data为：')
          console.log(this.search_phone)
          getList(this.search_phone,"/personnel-management/position-manage/search").then(response => {
            this.listLoading = false;
            this.list = response.data;
            console.log(response)
          });
        }
      },

      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleAdd(){
        this.$router.push({path:'/sms/employee_in',query:{id:0,edit:false}})
      },
      handleChangeOrder(index, row){
        this.$router.push({path:'/sms/employee_edit',query:{id:row.id,edit:false}})
      },
      handleViewOrder(index, row){
        this.$router.push({path:'/sms/employee_view',query:{id:row.id,edit:true}})
      },
      handleCloseOrder(index, row){
        this.closeOrder.dialogVisible=true;
        this.closeOrder.orderIds=[row.id];
      },
      handleViewLogistics(index, row){
        this.logisticsDialogVisible=true;
      },
      handleDeleteOrder(index, row){
        let ids=[];
        ids.push(row.id);
        this.deleteOrder(row.id);
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
            deleteOrder('/personnel-management/position-manage/',ids[i]).then(response=>{
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
      handleCloseOrderConfirm() {
        if (this.closeOrder.content == null || this.closeOrder.content === '') {
          this.$message({
            message: '操作备注不能为空',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        let params = new URLSearchParams();
        params.append('ids', this.closeOrder.orderIds);
        params.append('note', this.closeOrder.content);
        closeOrder(params).then(response=>{
          this.closeOrder.orderIds=[];
          this.closeOrder.dialogVisible=false;
          this.getList();
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      getList() {
        this.listLoading = true;
        getList(this.dataList,"/personnel-management/position-manage/list").then(response => {
          this.listLoading = false;
          this.list = response.data.data;
          console.log(this.list)
        });
      },
      deleteOrder(ids){
        this.$confirm('是否要进行该删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          params.append("ids",ids);
          deleteOrder('/personnel-management/position-manage/',ids).then(response=>{
            this.$message({
              message: '删除成功！',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        })
      },
      covertOrder(order){
        let address=order.receiverProvince+order.receiverCity+order.receiverRegion+order.receiverDetailAddress;
        let listItem={
          orderId:order.id,
          orderSn:order.orderSn,
          receiverName:order.receiverName,
          receiverPhone:order.receiverPhone,
          receiverPostCode:order.receiverPostCode,
          address:address,
          deliveryCompany:null,
          deliverySn:null
        };
        return listItem;
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


