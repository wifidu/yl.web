<template> 
  <div class="app-container">
    <!--    <el-card class="filter-container" shadow="never">-->
    <!--      <div>-->
    <!--        <i class="el-icon-search"></i>-->
    <!--        <span>搜索</span>-->
    <!--        <el-button-->
    <!--          style="float:right"-->
    <!--          type="primary"-->
    <!--          @click="handleSearchList()"-->
    <!--          size="small">-->
    <!--          查询搜索-->
    <!--        </el-button>-->
    <!--        <el-button-->
    <!--          style="float:right;margin-right: 15px"-->
    <!--          @click="handleResetSearch()"-->
    <!--          size="small">-->
    <!--          重置列表-->
    <!--        </el-button>-->
    <!--      </div>-->
    <!--      <div style="margin-top: 15px">-->
    <!--        <el-form :inline="true" :model="searchList" size="small" label-width="140px">-->
    <!--          <el-form-item label="输入搜索：">-->
    <!--            <el-input v-model="searchList.phone_number" class="input-width" placeholder="电话号码"></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="会员名称：">-->
    <!--            <el-input v-model="searchList.member_name" class="input-width" placeholder="会员名称"></el-input>-->
    <!--          </el-form-item>-->
    <!--        </el-form>-->
    <!--      </div>-->
    <!--    </el-card>-->
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>食谱列表</span>
      <el-button
        style="float:right"
        type="primary"
        @click="handleAdd()"
        size="small">
        新增食谱
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
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="周次" width="180" align="center">
          <template slot-scope="scope">{{scope.row.weekly}}</template>
        </el-table-column>
        <el-table-column label="套餐名称" width="180" align="center">
          <template slot-scope="scope">{{scope.row.package_name}}</template>
        </el-table-column>
<!--        <el-table-column label="预定人数" width="" align="center">-->
<!--          <template slot-scope="scope" >{{scope.row.reserve_number}}</template>-->

<!--        </el-table-column>-->
<!--        <el-table-column label="套餐描述" width="180" align="center">-->
<!--          <template slot-scope="scope">{{scope.row.package_describe}}</template>-->
<!--        </el-table-column>-->
        <el-table-column label="操作"  align="center">
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
        logisticsDialogVisible:false
      }
    },
    created() {
      this.getList();
      this.list.package_detail = JSON.parse(this.list.package_detail)
      console.log(this.list.package_detail)
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
          console.log('通过用户名搜索：'+this.search_name.member_name)
          console.log('data为：')
          console.log(this.search_name)
          getList(this.search_name,"/diet-manage/recipes-manage/search/").then(response => {
            this.listLoading = false;
            this.list = response.data;
            console.log(response)
          });
        }else {
          this.search_phone.phone_number=this.searchList.phone_number
          console.log('通过电话号码搜索:'+this.searchList.phone_number)
          console.log('data为：')
          console.log(this.search_phone)
          getList(this.search_phone,"/diet-manage/recipes-manage/search").then(response => {
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
        this.$router.push({path:'/food/recipe_new',query:{id:0,edit:false}})
      },
      handleChangeOrder(index, row){
        this.$router.push({path:'/food/recipe_edit',query:{id:row.id,edit:false}})
      },
      handleViewOrder(index, row){
        this.$router.push({path:'/food/recipe_view',query:{id:row.id,edit:true}})
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
            deleteOrder('/diet-manage/recipes-manage/',ids[i]).then(response=>{
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
        getList(this.dataList,"/diet-manage/recipes-manage/list").then(response => {
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
          deleteOrder('/diet-manage/recipes-manage/',ids).then(response=>{
            this.$message({
              message: '删除成功！',
              type: 'success',
              duration: 1000
            })
          })
          this.getList()
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


